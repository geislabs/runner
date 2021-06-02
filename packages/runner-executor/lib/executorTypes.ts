import { Context, Plugin } from '@geislabs/runtime'
import { Execution } from './execution/executionTypes'

export interface Runner<TContext = unknown> {
    /**
     * Run
     */
    <TValue>(callback: RunCallackFn<TValue, TContext>): Execution<TValue>
    /**
     * Partition input source
     */
    <TValue>(
        source: Iterable<TValue>,
        callback: RunIteratorCallackFn<TValue, TContext>
    ): Execution<TValue>
}

export interface IExecutor<TPlugin extends Plugin<any>> {
    /**
     * Stuff
     */
    run: Runner<Context<TPlugin, any>>
    /**
     * Watch
     */
    watch: <TValue>(
        source: Iterable<TValue>,
        callback: RunIteratorCallackFn<TValue, Context<TPlugin, any>>
    ) => Execution<TValue>
}

export type RunCallbackSyncFn<TValue, TContext> = (context: TContext) => TValue

export type RunCallackFn<TValue, TContext = unknown> = RunCallbackSyncFn<
    TValue,
    TContext
>

export type RunIteratorCallbackSyncFn<TValue, TContext> = (
    value: TValue,
    index: number,
    context: TContext
) => TValue

export type RunIteratorCallbackAsyncFn<TValue, TContext> = (
    value: TValue,
    index: number,
    context: TContext
) => Promise<TValue>

export type RunIteratorCallbackGeneratorFn<TValue, TContext> = (
    value: TValue,
    index: number,
    context: TContext
) => Generator<TValue>

export type RunIteratorCallbackAsyncGeneratorFn<TValue, TContext> = (
    value: TValue,
    index: number,
    context: TContext
) => AsyncGenerator<TValue>

export type RunIteratorCallackFn<TValue, TContext = unknown> =
    | RunIteratorCallbackSyncFn<TValue, TContext>
    | RunIteratorCallbackAsyncFn<TValue, TContext>
    | RunIteratorCallbackGeneratorFn<TValue, TContext>
    | RunIteratorCallbackAsyncGeneratorFn<TValue, TContext>

export interface RunFn<TValue, TContext = unknown> {
    /**
     * Run
     */
    (
        source: Iterable<TValue>,
        callback: RunIteratorCallackFn<TValue, TContext>
    ): AsyncGenerator<TValue>
}
