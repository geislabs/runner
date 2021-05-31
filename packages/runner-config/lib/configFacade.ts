import { CreateConfigAttrs } from './configAttrs'
import { buildConfig } from './configFactory'
import { Plugin } from './plugin/pluginTypes'

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
