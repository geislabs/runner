import { toArray } from 'ix/asynciterable'
import { config } from '../lib'

describe('plugins', () => {
    test('simple', async () => {
        const { run } = config({
            plugins: [{ init: () => ({ values: () => [1, 2, 3] }) }],
        })
        await expect(
            toArray(
                run(function* ({ values }) {
                    yield* values()
                })
            )
        ).resolves.toStrictEqual([1, 2, 3])
    })
    test('async', async () => {
        const { run } = config({
            plugins: [{ init: async () => ({ values: () => [1, 2, 3] }) }],
        })
        await expect(
            toArray(
                run(function* ({ values }) {
                    yield* values()
                })
            )
        ).resolves.toStrictEqual([1, 2, 3])
    })
})
