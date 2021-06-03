import { toArray } from 'ix/asynciterable'
import { worker } from '../lib'

describe('worker', () => {
    test('simple', async () => {
        await expect(
            toArray(
                worker<number>(function* (value) {
                    yield 1 * value
                    yield 2 * value
                    yield 3 * value
                }).fn(2, 0, {})
            )
        ).resolves.toStrictEqual([2, 4, 6])
    })
})
