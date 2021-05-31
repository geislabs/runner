import { toArray } from 'ix/asynciterable'
import { run } from '../lib'

describe('plugins', () => {
    test('simple', async () => {
        await expect(
            toArray(
                run({
                    plugins: [{ init: () => ({ values: () => [1, 2, 3] }) }],
                    input: function* ({ values }) {
                        yield* values()
                    },
                }).output
            )
        ).resolves.toStrictEqual([1, 2, 3])
    })
    test('async', async () => {
        await expect(
            toArray(
                run({
                    plugins: [
                        { init: async () => ({ values: () => [1, 2, 3] }) },
                    ],
                    input: function* ({ values }) {
                        yield* values()
                    },
                }).output
            )
        ).resolves.toStrictEqual([1, 2, 3])
    })
})
