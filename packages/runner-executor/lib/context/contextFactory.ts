import { Plugin } from '@geislabs/runner-plugin'
import { Context, GetExports } from '@geislabs/runner-worker'

export async function buildContext<TPlugin extends Plugin>(
    plugins: TPlugin[]
): Promise<Context<TPlugin>> {
    const allExports: GetExports<TPlugin> = await plugins.reduce(
        async (promiseAcc, plugin) => {
            const acc: GetExports<TPlugin> = await promiseAcc
            const pluginExports = await plugin.init()
            return {
                // @ts-expect-error
                ...acc,
                ...pluginExports,
            }
        },
        Promise.resolve({} as GetExports<TPlugin>)
    )
    // @ts-expect-error
    return { ...allExports, dispose: async () => undefined }
}
