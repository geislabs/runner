import { Plugin } from '@geislabs/runner-plugin'
import { of } from 'ix/asynciterable'
import { CreateConfigAttrs } from './configAttrs'
import { Config } from './configTypes'

export function buildConfig<TValue, TPlugin extends Plugin>({
    plugins = [],
    source = of(null as any),
    output = async function* (input: AsyncIterable<TValue>) {
        yield* input
    },
    ...attrs
}: CreateConfigAttrs<TValue, TPlugin>): Config<TValue, TPlugin> {
    return { source, output, plugins, ...attrs }
}
