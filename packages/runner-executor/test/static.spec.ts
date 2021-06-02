import { toArray } from 'ix/asynciterable'
import { config, RunCallackFn } from '../lib'

describe('source', () => {
    test('sync', async () => {
        const { run } = config()
        await expect(toArray(run((_context) => 5))).resolves.toStrictEqual([5])
    })
    test('promise', async () => {
        const { run } = config()
        await expect(
            toArray(run(async (_context) => 5))
        ).resolves.toStrictEqual([5])
    })
    test('generator', async () => {
        const { run } = config()
        await expect(
            toArray(
                run(function* (_context) {
                    yield 1
                    yield 2
                    yield 3
                })
            )
        ).resolves.toStrictEqual([1, 2, 3])
    })
    test('async generator', async () => {
        const { run } = config()
        await expect(
            toArray(
                run(async function* (_context) {
                    yield 1
                    yield 2
                    yield 3
                })
            )
        ).resolves.toStrictEqual([1, 2, 3])
    })
})
