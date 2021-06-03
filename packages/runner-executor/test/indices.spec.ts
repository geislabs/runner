import { toArray } from 'ix/asynciterable'
import { config } from '../lib'

describe.skip('indices', () => {
    test('simple', async () => {
        const { run } = config()
        await expect(
            toArray(run([5, 5, 5], (value, index) => index))
        ).resolves.toStrictEqual([0, 1, 2])
    })
})
