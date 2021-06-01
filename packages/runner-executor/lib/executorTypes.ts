import { Plugin } from '@geislabs/runner-plugin'
import { AnyWorkerConfig } from '@geislabs/runner-worker'
import { Execution } from './execution/executionTypes'

export interface Executor<TPlugin extends Plugin> {
    <TValue>(worker: AnyWorkerConfig<TValue, TPlugin>): Execution<TValue>
}
