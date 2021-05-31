import { Config } from './configTypes'

export interface CreateConfigAttrs<TValue>
    extends Pick<Config<TValue>, 'input' | 'output'> {}
