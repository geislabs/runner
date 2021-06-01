export type Sink<TValue, TOut = TValue> = (
    input: AsyncIterable<TValue>
) => AsyncIterable<TOut>
