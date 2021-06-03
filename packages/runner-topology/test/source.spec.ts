import { toArray } from 'ix/asynciterable'
import { source } from '../lib'

describe('source', () => {
    test('simple', async () => {
        await expect(
            toArray(
                source(function* () {
                    yield 1
                    yield 2
                    yield 3
                }).fn({})
            )
        ).resolves.toStrictEqual([1, 2, 3])
    })
})
