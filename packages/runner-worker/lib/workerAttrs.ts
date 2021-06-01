import { Plugin } from '@geislabs/runner-plugin'
import { Context } from './context'
import { Sink } from './sink'
import { Source } from './source'

export interface CreateWorkerAttrs<TValue, TPlugin extends Plugin> {
    source?: Source<TValue>
    input: (context: Context<TPlugin>) => AsyncGenerator<TValue>
    output?: Sink<TValue>
}
