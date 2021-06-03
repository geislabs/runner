import { AnyCreateSourceAttrs, CreateIterableSourceAttrs } from './sourceAttrs'

export function isIterable<TValue, TContext>(
    attrs: AnyCreateSourceAttrs<TValue, TContext>
): attrs is CreateIterableSourceAttrs<TValue> {
    return (
        typeof attrs === 'object' &&
        // @ts-expect-error
        !!attrs[Symbol.iterator]
    )
}
