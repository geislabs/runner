import { Plugin } from '@geislabs/runtime'

export interface ExecutorConfig<TPlugin extends Plugin<any>> {
    plugins?: TPlugin[]
}
