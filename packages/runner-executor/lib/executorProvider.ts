import { Plugin } from '@geislabs/runner-plugin'
import { CreateExecutorAttrs } from './executorAttrs'
import { buildExecutor } from './executorFactory'
import { Executor } from './executorTypes'

export function config<TPlugin extends Plugin>(
    config: CreateExecutorAttrs<TPlugin> = {}
): Executor<TPlugin> {
    const executor = buildExecutor(config)
    return executor
}
