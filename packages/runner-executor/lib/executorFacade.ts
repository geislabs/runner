import { Config, Plugin } from '@geislabs/runner-config'
import { buildContext } from './context/contextFactory'

export async function* run<TValue, TPlugin extends Plugin>(
    config: Config<TValue, TPlugin>
) {
    const context = await buildContext(config.plugins)
    try {
        const source = config.input(context)
        const iterator = source[Symbol.iterator]()
        yield* config.output(iterator)
    } finally {
        await context.dispose()
    }
}
