import { Plugin } from '@geislabs/runtime'
import { ExecutorConfig } from './executorConfig'
import { Executor } from './executorFacade'
import { IExecutor } from './executorTypes'

export function config<TPlugin extends Plugin<any>>(
    config: ExecutorConfig<TPlugin> = {}
): IExecutor<TPlugin> {
    const executor = new Executor<TPlugin>(config)
    return {
        run: executor.run.bind(executor),
        watch: executor.watch.bind(executor),
        pipe: executor.pipe.bind(executor),
    }
}
