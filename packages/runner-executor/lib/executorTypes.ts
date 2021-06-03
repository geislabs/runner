import * as topology from '@geislabs/runner-topology'
import { Context, Plugin } from '@geislabs/runtime'
import { Execution } from './execution/executionTypes'

export interface Runner<TContext = unknown> {
    /**
     * Run
     */
    <TValue>(
        callback: topology.AnyCreateSourceAttrs<TValue, TContext>
    ): Execution<TValue>
    /**
     * Partition input source
     */
    <TValue>(
        source: topology.AnyCreateSourceAttrs<TValue, TContext>,
        callback: RunIteratorCallackFn<TValue, TContext>
    ): Execution<TValue>
}

export interface Pipe<TContext = unknown> {
    <T1, T2>(
        source1: topology.AnyCreateSourceAttrs<T1, TContext>,
        worker: topology.AnyCreateWorkerAttrs<T1, T2, TContext>
    ): AsyncIterable<T2>
    <T1, T2, T3>(
        source1: topology.AnyCreateSourceAttrs<T1, TContext>,
        worker1: topology.AnyCreateWorkerAttrs<T1, T2, TContext>,
        worker2: topology.AnyCreateWorkerAttrs<T2, T3, TContext>
    ): AsyncIterable<T3>
    <T1, T2, T3, T4>(
        source1: topology.AnyCreateSourceAttrs<T1, TContext>,
        worker1: topology.AnyCreateWorkerAttrs<T1, T2, TContext>,
        worker2: topology.AnyCreateWorkerAttrs<T2, T3, TContext>,
        worker3: topology.AnyCreateWorkerAttrs<T3, T4, TContext>
    ): AsyncIterable<T4>
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
    /**
     * Pipe
     */
    pipe: Pipe<Context<TPlugin, any>>
}

export type RunCallbackSyncFn<TValue, TContext> = (context: TContext) => TValue
export type RunCallbackAsyncFn<TValue, TContext> = (
    context: TContext
) => Promise<TValue>
export type RunCallbackGeneratorFn<TValue, TContext> = (
    context: TContext
) => Generator<TValue>
export type RunCallbackAsyncGeneratorFn<TValue, TContext> = (
    context: TContext
) => AsyncGenerator<TValue>

export type RunCallackFn<TValue, TContext = unknown> =
    | RunCallbackSyncFn<TValue, TContext>
    | RunCallbackAsyncFn<TValue, TContext>
    | RunCallbackGeneratorFn<TValue, TContext>
    | RunCallbackAsyncGeneratorFn<TValue, TContext>

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
