import { from } from 'ix/asynciterable'
import { AnyCreateSourceAttrs } from './sourceAttrs'
import { isIterable } from './sourceGuards'
import { Source } from './sourceTypes'

export function source<TValue, TContext>(
    config: AnyCreateSourceAttrs<TValue, TContext>
): Source<TValue, TContext> {
    if (isIterable(config)) {
        return {
            fn: async function* (context) {
                yield* config
            },
        }
    }
    if (typeof config === 'object' && typeof config.fn === 'function') {
        return config
    }
    return {
        // @ts-expect-error
        fn: async function* (context) {
            // @ts-expect-error
            const created = config(context)
            yield* from(created)
        },
    }
}
