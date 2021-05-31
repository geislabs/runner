import { Plugin } from '@geislabs/runner-plugin'
import { Config } from './configTypes'

export interface CreateConfigAttrs<TValue, TPlugin extends Plugin>
    extends Pick<Config<TValue, TPlugin>, 'input'>,
        Partial<Omit<Config<TValue, TPlugin>, 'input'>> {}
