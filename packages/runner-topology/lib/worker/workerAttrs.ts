import { RunIteratorCallackFn } from '../topologyTypes'
import { Worker } from './workerTypes'

export type CreateLiteralWorkerAttrs<TIn, TOut, TContext> =
    RunIteratorCallackFn<TIn, TOut, TContext>

export type AnyCreateWorkerAttrs<TIn, TOut, TContext> =
    | Worker<TIn, TOut, TContext>
    | CreateLiteralWorkerAttrs<TIn, TOut, TContext>
