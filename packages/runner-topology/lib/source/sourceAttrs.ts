import { RunCallackFn } from '../topologyTypes'
import { Source } from './sourceTypes'

export type CreateLiteralSourceAttrs<TValue, TContext> = RunCallackFn<
    TValue,
    TContext
>

export type CreateIterableSourceAttrs<TValue> = Iterable<TValue>

export type AnyCreateSourceAttrs<TValue, TContext> =
    | CreateLiteralSourceAttrs<TValue, TContext>
    | CreateIterableSourceAttrs<TValue>
    | Source<TValue, TContext>
