import { Config } from './configTypes'
import { Plugin } from './plugin/pluginTypes'

export interface CreateConfigAttrs<TValue, TPlugin extends Plugin>
    extends Pick<Config<TValue, TPlugin>, 'input'>,
        Partial<Omit<Config<TValue, TPlugin>, 'input'>> {}
