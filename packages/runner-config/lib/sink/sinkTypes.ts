export type Sink<TValue, TOut = TValue> = (
    input: AsyncIterable<unknown> | Iterable<unknown>
) => AsyncGenerator<TOut>
