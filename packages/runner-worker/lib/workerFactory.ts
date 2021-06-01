import { Plugin } from '@geislabs/runner-plugin'
import { CreateWorkerAttrs } from './workerAttrs'
import { NOOP_SINK, NOOP_SOURCE } from './workerConstants'
import { Worker } from './workerTypes'
import { Context } from './context'

export function buildWorker<TValue, TPlugin extends Plugin>({
    source = NOOP_SOURCE,
    output = NOOP_SINK,
    ...attrs
}: CreateWorkerAttrs<TValue, TPlugin>): Worker<TValue, TPlugin> {
    return {
        source,
        output,
        input: async function* (context: Context<TPlugin>) {
            const source = attrs.input(context)
            yield* source
        },
    }
}
