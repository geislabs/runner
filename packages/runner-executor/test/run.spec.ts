import { toArray } from 'ix/asynciterable'
import { run } from '../lib'

describe('run', () => {
    test('simple', async () => {
        await expect(
            toArray(
                run({
                    plugins: [],
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
