import { Plugin } from '@geislabs/runner-plugin'
import { Context } from './context'
import { Sink } from './sink'
import { Source } from './source'

export type SyncWorkerInputFn<TValue, TPlugin extends Plugin> = (
    context: Context<TPlugin>
) => Generator<TValue>

export type AsyncWorkerInputFn<TValue, TPlugin extends Plugin> = (
    context: Context<TPlugin>
) => AsyncGenerator<TValue>

export type AnyWorkerInputFn<TValue, TPlugin extends Plugin> =
    | SyncWorkerInputFn<TValue, TPlugin>
    | AsyncWorkerInputFn<TValue, TPlugin>

export interface Worker<TValue, TPlugin extends Plugin> {
    source: Source<TValue>
    input: AsyncWorkerInputFn<TValue, TPlugin>
    output: Sink<TValue>
}
