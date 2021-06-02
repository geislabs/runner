import { Plugin } from '@geislabs/runner-plugin'

export interface ExecutorConfig<TPlugin extends Plugin> {
    plugins?: TPlugin[]
}
