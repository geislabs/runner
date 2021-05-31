import { Config } from '@geislabs/runner-config'
import { Plugin } from '@geislabs/runner-plugin'
import { Stats } from '../stats/statTypes'

export interface Execution<TValue, TPlugin extends Plugin> {
    config: Config<TValue, TPlugin>
    output: AsyncIterable<TValue>
    stats: () => Stats
}
