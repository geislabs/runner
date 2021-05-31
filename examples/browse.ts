import { Plugin, config } from '..' // const config = require('@geislabs/geis')

export interface BrowseFn {
    /**
     * Browse stuff
     * @param url
     * @returns
     */
    (url: string): any
    /**
     * Browse stuff with actions
     * @param url
     * @returns
     */
    (url: string, actions: any): any
}

const plugin = (): Plugin<{
    browse: BrowseFn
}> => ({
    init: () => ({
        browse: async (url: string) => ({}),
    }),
})

export default plugin
