import { Plugin } from '@geislabs/runner-plugin'
import { CreateWorkerAttrs } from '../workerAttrs'
import { AnyWorkerConfig } from './apiAttrs'
import { isLiteral } from './apiGuards'

export function buildAttrs<TValue, TPlugin extends Plugin>(
    config: AnyWorkerConfig<TValue, TPlugin>
): CreateWorkerAttrs<TValue, TPlugin> {
    if (isLiteral(config)) {
        return {
            input: async function* (context) {
                yield* config(context)
            },
        }
    }
    return {
        ...config,
        input: async function* (context) {
            yield* config.input(context)
        },
    }
}
