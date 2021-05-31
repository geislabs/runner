export type Sink<TValue, TOut = TValue> = (
    input: AsyncIterable<TValue>
) => AsyncGenerator<TOut>
