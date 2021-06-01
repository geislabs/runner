import { Plugin } from '@geislabs/runner-plugin'
import { Stats } from '../stats/statTypes'

export interface Execution<TValue> extends AsyncIterable<TValue> {
    stats: () => Stats
}
