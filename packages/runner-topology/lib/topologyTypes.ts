// export type RunCallbackSyncFn<TValue, TContext> = (context: TContext) => TValue
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
    // | RunCallbackSyncFn<TValue, TContext>
    | RunCallbackAsyncGeneratorFn<TValue, TContext>
    | RunCallbackGeneratorFn<TValue, TContext>
    | RunCallbackAsyncFn<TValue, TContext>

export type RunIteratorCallbackSyncFn<TIn, TOut, TContext> = (
    value: TIn,
    index: number,
    context: TContext
) => TOut

export type RunIteratorCallbackAsyncFn<TIn, TOut, TContext> = (
    value: TIn,
    index: number,
    context: TContext
) => Promise<TOut>

export type RunIteratorCallbackGeneratorFn<TIn, TOut, TContext> = (
    value: TIn,
    index: number,
    context: TContext
) => Generator<TOut>

export type RunIteratorCallbackAsyncGeneratorFn<TIn, TOut, TContext> = (
    value: TIn,
    index: number,
    context: TContext
) => AsyncGenerator<TOut>

export type RunIteratorCallackFn<TIn, TOut = TIn, TContext = unknown> =
    // | RunIteratorCallbackSyncFn<TIn, TOut, TContext>
    | RunIteratorCallbackAsyncFn<TIn, TOut, TContext>
    | RunIteratorCallbackGeneratorFn<TIn, TOut, TContext>
    | RunIteratorCallbackAsyncGeneratorFn<TIn, TOut, TContext>

export interface RunFn<TValue, TContext = unknown> {
    /**
     * Run
     */
    (
        source: Iterable<TValue>,
        callback: RunIteratorCallackFn<TValue, TContext>
    ): AsyncGenerator<TValue>
}
