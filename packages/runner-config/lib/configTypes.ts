import { Plugin } from '@geislabs/runner-plugin'
import { Context } from './context/contextTypes'
import { Sink } from './sink'

export interface SimpleConfig<TValue, TPlugin extends Plugin> {
    input: (context: Context<TPlugin>) => Generator<TValue>
    output: Sink<TValue>
    plugins: Array<TPlugin | TPlugin>
}

export type Config<TValue, TPlugin extends Plugin> = SimpleConfig<
    TValue,
    TPlugin
>
