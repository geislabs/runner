import { Plugin } from '@geislabs/runner-plugin'
import { AnyWorkerConfig } from './api/apiAttrs'
import { buildAttrs } from './api/apiFactory'
import { buildWorker } from './workerFactory'
import { Worker } from './workerTypes'

export function create<TValue, TPlugin extends Plugin>(
    config: AnyWorkerConfig<TValue, TPlugin>
): Worker<TValue, TPlugin> {
    const attrs = buildAttrs(config)
    const worker = buildWorker(attrs)
    return worker
}
