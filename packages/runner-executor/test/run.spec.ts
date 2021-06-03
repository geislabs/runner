import { toArray } from 'ix/asynciterable'
import { config } from '../lib'

const { run } = config()

describe('run', () => {
    test('iterable', async () => {
        await expect(toArray(run([1, 2, 3]))).resolves.toStrictEqual([1, 2, 3])
    })
    test('generator', async () => {
        await expect(
            toArray(
                run(function* () {
                    yield 1
                    yield 2
                    yield 3
                })
            )
        ).resolves.toStrictEqual([1, 2, 3])
    })
    test('async generator', async () => {
        await expect(
            toArray(
                run(async function* () {
                    yield 1
                    yield 2
                    yield 3
                })
            )
        ).resolves.toStrictEqual([1, 2, 3])
    })
})
