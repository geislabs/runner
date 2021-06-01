export interface Source<TValue> {
    (): AsyncIterable<TValue>
}
