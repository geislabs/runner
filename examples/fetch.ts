import { Plugin, config } from '..' // const config = require('@geislabs/geis')

const plugin = (): Plugin<{ fetch: (url: string) => any }> => ({
    init: async () => ({
        fetch: async (url: string) => ({}),
    }),
})

export default plugin
