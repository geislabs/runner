import { RunIteratorCallbackAsyncGeneratorFn } from '../topologyTypes'

export interface Worker<TIn, TOut, TContext> {
    fn: RunIteratorCallbackAsyncGeneratorFn<TIn, TOut, TContext>
}
