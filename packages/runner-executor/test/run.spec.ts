import { toArray } from 'ix/asynciterable'
import { config } from '../lib'

describe('run', () => {
    test('simple', async () => {
        const run = config()
        await expect(
            toArray(
                run({
                    input: function* () {
                        yield 1
                        yield 2
                        yield 3
                    },
                    output: async function* (input) {
                        for await (const value of input) {
                            yield (value as number) * 2
                        }
                    },
                })
            )
        ).resolves.toStrictEqual([2, 4, 6])
    })
})
