import { Plugin } from '@geislabs/runner-plugin'
import { Sink } from '../sink'
import { AnyWorkerInputFn } from '../workerTypes'

export interface WorkerObjectConfig<TValue, TPlugin extends Plugin> {
    input: AnyWorkerInputFn<TValue, TPlugin>
    output?: Sink<TValue>
}
export type WorkerLiteralConfig<TValue, TPlugin extends Plugin> =
    AnyWorkerInputFn<TValue, TPlugin>

export type AnyWorkerConfig<TValue, TPlugin extends Plugin = any> =
    | WorkerObjectConfig<TValue, TPlugin>
    | WorkerLiteralConfig<TValue, TPlugin>
