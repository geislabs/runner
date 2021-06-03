import { source, worker } from '@geislabs/runner-topology'
import { toArray } from 'ix/asynciterable'
import { config } from '../lib'

const { pipe } = config()

describe('pipe', () => {
    test('simple', async () => {
        await expect(
            toArray(
                pipe(
                    source(function* () {
                        yield 1
                        yield 2
                        yield 3
                    }),
                    worker(function* (value) {
                        yield value * 2
                    }),
                    worker(function* (value) {
                        yield value * 2
                    })
                )
            )
        ).resolves.toStrictEqual([4, 8, 12])
    })
})
