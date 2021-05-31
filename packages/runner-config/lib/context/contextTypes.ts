import { Plugin } from '@geislabs/runner-plugin'

export type GetExports<TPlugin extends Plugin> = UnionToIntersection<
    TPlugin['init'] extends () => Promise<infer U>
        ? U & object
        : TPlugin['init'] extends () => infer U
        ? U & object
        : never
>

export type Context<TPlugin extends Plugin> = GetExports<TPlugin> & {
    dispose: () => Promise<null>
}

type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (
    x: infer R
) => any
    ? R
    : never
