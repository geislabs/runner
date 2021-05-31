import { from } from 'ix/asynciterable'
import {
    Plugin,
    CreateConfigAttrs,
    config as getConfig,
} from '@geislabs/runner-config'
import { buildContext } from './context/contextFactory'
import { Execution } from './execution/executionTypes'
import { Stats } from './stats/statTypes'

export function run<TValue, TPlugin extends Plugin>(
    config: CreateConfigAttrs<TValue, TPlugin>
): Execution<TValue, TPlugin> {
    const resolved = getConfig(config)
    const stats: Stats = { count: 0, elapsedMs: 0 }
    const output = async function* () {
        for await (const iteraton of resolved.source) {
            const context = await buildContext(resolved.plugins)
            try {
                const source = from(config.input(context))
                yield* resolved.output(source)
            } finally {
                await context.dispose()
            }
        }
    }
    return {
        config: resolved,
        output: output(),
        stats: () => stats,
    }
}
