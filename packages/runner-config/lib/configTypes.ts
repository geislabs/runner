export interface SimpleConfig<TValue> {
    input: () => Generator<TValue>
    output: any
}

export type Config<TValue> = SimpleConfig<TValue>
