import { CreateConfigAttrs } from './configAttrs'
import { Config } from './configTypes'

export function buildConfig<TValue>({
    ...attrs
}: CreateConfigAttrs<TValue>): Config<TValue> {
    return { ...attrs }
}
