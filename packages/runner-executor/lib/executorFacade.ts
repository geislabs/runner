import { Plugin } from '@geislabs/runner-plugin'
import { Context, worker } from '@geislabs/runner-worker'
import { buildContext } from './context/contextFactory'
import { Execution } from './execution/executionTypes'
import { ExecutorConfig } from './executorConfig'
import { IExecutor, RunCallackFn, RunIteratorCallackFn } from './executorTypes'

function getIterator<TValue>(
    result: ReturnType<RunIteratorCallackFn<TValue>>
): AsyncGenerator<TValue> | Generator<TValue> | null {
    return (
        // @ts-expect-error
        result[Symbol.iterator]?.() ?? result[Symbol.asyncIterator]?.() ?? null
    )
}

export class Executor<TPlugin extends Plugin> implements IExecutor<TPlugin> {
    #config: ExecutorConfig<TPlugin>

    constructor(config: ExecutorConfig<TPlugin>) {
        this.#config = config
    }

    run<TValue>(
        callback: RunCallackFn<TValue, Context<TPlugin>>
    ): Execution<TValue>
    run<TValue>(
        source: Iterable<TValue>,
        callback: RunIteratorCallackFn<TValue, Context<TPlugin>>
    ): Execution<TValue>
    run<TValue>(
        arg1: Iterable<TValue> | RunCallackFn<TValue, Context<TPlugin>>,
        arg2?: RunIteratorCallackFn<TValue, Context<TPlugin>>
    ) {
        const self = this
        const generator = async function* () {
            let index = 0

            if (!arg2 && typeof arg1 === 'function') {
                const context = await buildContext(self.#config.plugins ?? [])
                const callback = arg1
                const mapped = callback(context)
                try {
                    const iterator = getIterator(mapped)
                    if (iterator) {
                        yield* iterator
                    } else {
                        yield mapped
                    }
                } finally {
                    await context.dispose?.()
                }
            } else {
                const source = arg1 as Iterable<TValue>
                const callback = arg2 as RunIteratorCallackFn<TValue>
                for await (const value of source) {
                    const context = await buildContext(
                        self.#config.plugins ?? []
                    )
                    const mapped = callback(value, index++, context)
                    try {
                        const iterator = getIterator(mapped)
                        if (iterator) {
                            yield* iterator
                        } else {
                            yield mapped
                        }
                    } finally {
                        await context.dispose?.()
                    }
                }
            }
        }
        const context = {
            stats: () => ({ count: 0, elapsedMs: 0 }),
        }

        return Object.assign(generator(), context)
    }
    watch<TValue>(
        source: Iterable<TValue>,
        callback: RunIteratorCallackFn<TValue, Context<TPlugin>>
    ): Execution<TValue> {
        return {} as any
        //     const self = this
        //     const generator = async function* () {
        //         // @ts-expect-error
        //         const instance = worker<TValue>({ input: callback })
        //         const source = instance.source()
        //         for await (const value of source) {
        //             const context = await buildContext(self.#config.plugins ?? [])
        //             const mapped = callback(value, 0, context)
        //             try {
        //                 yield* instance.output(mapped)
        //             } finally {
        //                 await context.dispose?.()
        //             }
        //         }
        //     }
        //     const context = {
        //         stats: () => ({ count: 0, elapsedMs: 0 }),
        //     }
        //     return Object.assign(generator(), context)
    }
}
