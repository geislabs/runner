import { Plugin } from '@geislabs/runner-plugin'
import { ExecutorConfig } from './executorConfig'
import { Executor } from './executorFacade'
import { IExecutor } from './executorTypes'

export function config<TPlugin extends Plugin>(
    config: ExecutorConfig<TPlugin> = {}
): IExecutor<TPlugin> {
    const executor = new Executor<TPlugin>(config)
    return {
        run: executor.run.bind(executor),
        watch: executor.watch.bind(executor),
    }
}
