import { from } from 'ix/asynciterable'
import {
    Config,
    Plugin,
    CreateConfigAttrs,
    config as getConfig,
} from '@geislabs/runner-config'
import { buildContext } from './context/contextFactory'

export async function* run<TValue, TPlugin extends Plugin>(
    config: CreateConfigAttrs<TValue, TPlugin>
) {
    const resolved = getConfig(config)
    const context = await buildContext(resolved.plugins)
    try {
        const source = from(config.input(context))
        yield* resolved.output(source)
    } finally {
        await context.dispose()
    }
}
