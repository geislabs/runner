import { toArray } from 'ix/asynciterable'
import { config, RunCallackFn } from '../lib'

describe('source', () => {
    test('sync', async () => {
        const { run } = config()
        await expect(
            toArray(run([1, 2, 3], (value) => value * 2))
        ).resolves.toStrictEqual([2, 4, 6])
    })
    test('async', async () => {
        const { run } = config()
        await expect(
            toArray(run([1, 2, 3], async (value) => value * 2))
        ).resolves.toStrictEqual([2, 4, 6])
    })
    test('generator', async () => {
        const { run } = config()
        await expect(
            toArray(
                run([1, 2, 3], function* (value) {
                    yield value * 2
                })
            )
        ).resolves.toStrictEqual([2, 4, 6])
    })
    test('async generator', async () => {
        const { run } = config()
        await expect(
            toArray(
                run([1, 2, 3], async function* (value) {
                    yield value * 2
                })
            )
        ).resolves.toStrictEqual([2, 4, 6])
    })
})
