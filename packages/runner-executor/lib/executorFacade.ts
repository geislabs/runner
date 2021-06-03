import { config as createRuntime, Plugin, Context } from '@geislabs/runtime'
import * as topology from '@geislabs/runner-topology'
import { from } from 'ix/asynciterable'
import { flatMap, tap } from 'ix/asynciterable/operators'
import { Execution } from './execution/executionTypes'
import { ExecutorConfig } from './executorConfig'
import { IExecutor, RunCallackFn, RunIteratorCallackFn } from './executorTypes'
import { source, worker } from '@geislabs/runner-topology'

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

    pipe(
        source1: topology.AnyCreateSourceAttrs<any, Context<TPlugin, any>>,
        ...workers: topology.AnyCreateWorkerAttrs<any, any, any>[]
    ) {
        const self = this
        const generator = async function* () {
            const runtime = createRuntime({ plugins: self.#config.plugins })
            const context = await runtime.load()
            const source = topology.source(source1)
            yield* from(source.fn(context)).pipe(
                ...workers.map((worker) =>
                    flatMap((value, index) =>
                        topology.worker(worker).fn(value, index, context)
                    )
                )
            )
        }
        return generator()
    }

    run<TValue>(
        callback: topology.AnyCreateSourceAttrs<any, Context<TPlugin, any>>
    ): Execution<TValue>
    run<TValue>(
        source: Iterable<TValue>,
        callback: RunIteratorCallackFn<TValue, Context<TPlugin, any>>
    ): Execution<TValue>
    run<TValue>(
        arg1: Iterable<TValue> | RunCallackFn<TValue, Context<TPlugin, any>>,
        arg2?: RunIteratorCallackFn<TValue, Context<TPlugin, any>>
    ) {
        const self = this
        const generator = async function* () {
            if (!arg2) {
                yield* self.pipe(
                    source<TValue, Context<TPlugin, any>>(
                        // @ts-expect-error
                        arg1
                    )
                )
            } else {
                yield* self.pipe(
                    source<TValue, Context<TPlugin, any>>(
                        // @ts-expect-error
                        arg1
                    ),
                    // @ts-expect-error
                    worker<TValue, Context<TPlugin, any>>(arg2)
                )
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
