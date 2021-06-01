import { toArray } from 'ix/asynciterable'
import { Worker, run } from '@geislabs/runner'

const processor: Worker<number> = function* () {
    yield 1
    yield 2
    yield 3
}

describe('index', () => {
    test('simple', async () => {
        const execution = run(processor)
        const actual = toArray(execution)
        await expect(actual).resolves.toStrictEqual([1, 2, 3])
    })
})
