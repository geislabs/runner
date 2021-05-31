import { CreateConfigAttrs } from './configAttrs'
import { buildConfig } from './configFactory'

/**
 * Create a new config
 * @param attrs
 * @returns
 */
export function config<TValue>(attrs: CreateConfigAttrs<TValue>) {
    return buildConfig(attrs)
}
