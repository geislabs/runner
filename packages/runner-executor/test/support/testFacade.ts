import { plugin } from '@geislabs/runtime-plugin'

export const http = plugin({
    name: 'http',
    register() {
        return {
            get: async function (request: { url: string }) {
                return { status: 200, request }
            },
        }
    },
})
