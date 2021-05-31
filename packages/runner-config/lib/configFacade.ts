import { Plugin } from '@geislabs/runner-plugin'
import { CreateConfigAttrs } from './configAttrs'
import { buildConfig } from './configFactory'

/**
 * Create a new config
 * @param attrs
 * @returns
 */
export function config<TValue, TPlugin extends Plugin>(
    attrs: CreateConfigAttrs<TValue, TPlugin>
) {
    return buildConfig(attrs)
}
