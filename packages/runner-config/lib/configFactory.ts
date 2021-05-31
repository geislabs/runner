import { Plugin } from '@geislabs/runner-plugin'
import { CreateConfigAttrs } from './configAttrs'
import { Config } from './configTypes'

export function buildConfig<TValue, TPlugin extends Plugin>({
    plugins = [],
    output = async function* (input: AsyncIterable<TValue>) {
        yield* input
    },
    ...attrs
}: CreateConfigAttrs<TValue, TPlugin>): Config<TValue, TPlugin> {
    return { plugins, output, ...attrs }
}
