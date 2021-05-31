import { Config } from '@geislabs/runner-config'

export function run<TValue>(config: Config<TValue>) {
    return config.input()
}
