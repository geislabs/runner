import { from } from 'ix/asynciterable'
import { AnyCreateWorkerAttrs } from './workerAttrs'
import { Worker } from './workerTypes'

export function worker<TIn, TOut = TIn, TContext = unknown>(
    config: AnyCreateWorkerAttrs<TIn, TOut, TContext>
): Worker<TIn, TOut, TContext> {
    if (typeof config === 'object' && typeof config.fn === 'function') {
        return config
    }
    return {
        fn: async function* (value, index, context) {
            const created = config(value, index, context)
            yield* from(created)
        },
    }
}
