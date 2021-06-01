import { Plugin } from '@geislabs/runner-plugin'
import { worker, AnyWorkerConfig } from '@geislabs/runner-worker'
import { Execution } from './execution/executionTypes'
import { CreateExecutorAttrs } from './executorAttrs'
import { buildContext } from './context/contextFactory'
import { Executor } from './executorTypes'

export function buildExecutor<TPlugin extends Plugin>({
    plugins = [],
    ...attrs
}: CreateExecutorAttrs<TPlugin>): Executor<TPlugin> {
    return function <TValue>(
        config: AnyWorkerConfig<TValue, TPlugin>
    ): Execution<TValue> {
        const instance = worker(config)
        return {
            stats: () => ({ count: 0, elapsedMs: 0 }),
            [Symbol.asyncIterator]: async function* () {
                const source = instance.source()
                for await (const iteraton of source) {
                    const context = await buildContext(plugins)
                    const mapped = instance.input(context)
                    try {
                        yield* instance.output(mapped)
                    } finally {
                        await context.dispose()
                    }
                }
            },
        }
    }
}
