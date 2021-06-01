import { of } from 'ix/asynciterable'
import { Sink } from './sink'
import { Source } from './source'

export const NOOP_SOURCE: Source<any> = () => of(null)
export const NOOP_SINK: Sink<any> = (input) => input
