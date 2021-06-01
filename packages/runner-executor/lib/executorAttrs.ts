import { Plugin } from '@geislabs/runner-plugin'

export interface CreateExecutorAttrs<TPlugin extends Plugin> {
    plugins?: TPlugin[]
}
