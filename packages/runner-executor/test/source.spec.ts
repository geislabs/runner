import { toArray } from 'ix/asynciterable'
import { config } from '../lib'

const { run } = config()

describe('source', () => {
    // test('sync', async () => {
    //     const { run } = config()
    //     await expect(
    //         toArray(run([1, 2, 3], (value) => value * 2))
    //     ).resolves.toStrictEqual([2, 4, 6])
    // })
    test('promise', async () => {
        await expect(
            toArray(
                run([1, 2, 3], async (value) => {
                    return value * 2
                })
            )
        ).resolves.toStrictEqual([2, 4, 6])
    })
    test('generator', async () => {
        await expect(
            toArray(
                run([1, 2, 3], function* (value) {
                    yield value * 2
                })
            )
        ).resolves.toStrictEqual([2, 4, 6])
    })
    test('async generator', async () => {
        await expect(
            toArray(
                run([1, 2, 3], async function* (value) {
                    yield value * 2
                })
            )
        ).resolves.toStrictEqual([2, 4, 6])
    })
})
