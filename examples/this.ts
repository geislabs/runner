type Handler<T = any> =
    | {
          run: (() => Generator<T>) | (() => Promise<T>) | (() => void)
      }
    | (() => Generator<T>)
    | (() => Promise<T>)
    | (() => void)

interface Mapping {
    [key: string]: Handler
}

async function run<T extends Mapping>(mapping: T) {
    return
}

const value = {
    processor1: function* () {
        yield 1
        yield 2
        yield 3
    },
    processor2() {
        for (const value of this.processor1()) {
            console.log(value)
        }
    },
}

const final = run({
    processor1: {
        run: function* () {
            yield 1
            yield 2
            yield 3
        },
    },
    processor2: function () {
        this.processor1
    },
})
