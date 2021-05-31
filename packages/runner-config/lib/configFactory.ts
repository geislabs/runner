import { CreateConfigAttrs } from './configAttrs'
import { Config } from './configTypes'
import { Plugin } from './plugin'

export function buildConfig<TValue, TPlugin extends Plugin>({
    plugins = [],
    output = async function* (input: AsyncIterable<TValue>) {
        for await (const value of input) {
            console.log(value)
        }
    },
    ...attrs
}: CreateConfigAttrs<TValue, TPlugin>): Config<TValue, TPlugin> {
    return { plugins, output, ...attrs }
}
