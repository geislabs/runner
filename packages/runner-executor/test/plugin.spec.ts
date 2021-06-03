import { toArray } from 'ix/asynciterable'
import { config } from '../lib'
import { http } from './support'

describe.skip('plugins', () => {
    test('simple', async () => {
        const { run } = config({
            plugins: [http],
        })
        await expect(
            toArray(
                run(async function* ({ http }) {
                    yield await http.get({ url: 'google.com' })
                })
            )
        ).resolves.toStrictEqual([
            {
                request: { url: 'google.com' },
                status: 200,
            },
        ])
    })
    test('async', async () => {
        const { run } = config({
            plugins: [http],
        })
        await expect(
            toArray(
                run(async function* ({ http }) {
                    yield await http.get({ url: 'google.com' })
                })
            )
        ).resolves.toStrictEqual([
            {
                request: { url: 'google.com' },
                status: 200,
            },
        ])
    })
})
