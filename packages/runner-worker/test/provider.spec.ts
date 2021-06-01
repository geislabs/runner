import { toArray } from 'ix/asynciterable'
import { worker } from '../lib'

describe('provider', () => {
    test('object', async () => {
        await expect(
            toArray(
                worker({
                    input: function* () {
                        yield 1
                        yield 2
                        yield 3
                    },
                }).input({})
            )
        ).resolves.toStrictEqual([1, 2, 3])
    })
    test('literal', async () => {
        await expect(
            toArray(
                worker(function* () {
                    yield 1
                    yield 2
                    yield 3
                }).input({})
            )
        ).resolves.toStrictEqual([1, 2, 3])
    })
})
