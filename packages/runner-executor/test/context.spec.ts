import { toArray } from 'ix/asynciterable'
import { config } from '../lib'

describe.skip('context', () => {
    test('simple', async () => {
        expect.hasAssertions()
        const { run } = config()
        await toArray(
            run([5], (value, index, context) => {
                expect(context).toBeDefined()
                return value
            })
        )
    })
})
