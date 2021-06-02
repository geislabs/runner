import { config as createRuntime, Plugin, Context } from '@geislabs/runtime'
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

export class Executor<TPlugin extends Plugin<any>>
    implements IExecutor<TPlugin>
{
    #config: ExecutorConfig<TPlugin>

    constructor(config: ExecutorConfig<TPlugin>) {
        this.#config = config
    }

    run<TValue>(
        callback: RunCallackFn<TValue, Context<TPlugin, any>>
    ): Execution<TValue>
    run<TValue>(
        source: Iterable<TValue>,
        callback: RunIteratorCallackFn<TValue, Context<TPlugin, any>>
    ): Execution<TValue>
    run<TValue>(
        arg1: Iterable<TValue> | RunCallackFn<TValue, Context<TPlugin, any>>,
        arg2?: RunIteratorCallackFn<TValue, Context<TPlugin, any>>
    ) {
        const runtime = createRuntime({ plugins: this.#config.plugins })
        const self = this
        const generator = async function* () {
            let index = 0

            if (!arg2 && typeof arg1 === 'function') {
                const context = await runtime.load()
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
                    // await context._dispose?.()
                }
            } else {
                const source = arg1 as Iterable<TValue>
                const callback = arg2 as RunIteratorCallackFn<TValue>
                for await (const value of source) {
                    const context = await runtime.load()
                    const mapped = callback(value, index++, context)
                    try {
                        const iterator = getIterator(mapped)
                        if (iterator) {
                            yield* iterator
                        } else {
                            yield mapped
                        }
                    } finally {
                        // await context.dispose?.()
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
        callback: RunIteratorCallackFn<TValue, Context<TPlugin, any>>
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
