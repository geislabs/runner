import { RunCallbackAsyncGeneratorFn } from '../topologyTypes'

export interface Source<TValue, TContext = undefined> {
    fn: RunCallbackAsyncGeneratorFn<TValue, TContext>
}
