import { Plugin } from '@geislabs/runner-plugin'
import { AnyWorkerConfig, WorkerLiteralConfig } from './apiAttrs'

export function isLiteral<TValue, TPlugin extends Plugin>(
    config: AnyWorkerConfig<TValue, TPlugin>
): config is WorkerLiteralConfig<TValue, TPlugin> {
    return typeof config === 'function'
}

export function isObject<TValue, TPlugin extends Plugin>(
    config: AnyWorkerConfig<TValue, TPlugin>
): config is WorkerLiteralConfig<TValue, TPlugin> {
    return typeof config === 'function'
}
