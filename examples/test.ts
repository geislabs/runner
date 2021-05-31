type Partitionable<T> =
    | [Partitionable<T>, (value: T) => boolean]
    | T[]
    | Map<string, T>
    | Set<T>

interface Config<TPar> {
    partition?: Partitionable<TPar>
}

interface Context<TPar = any> {}

export function geis<T extends Config<any>>(
    config: T,
    callback: (
        context: T extends { partition: Partitionable<infer U> }
            ? Context & { partition: U }
            : Context
    ) => any
): any
export function geis<T>(
    config: Config<T>,
    callback: (context: Context<T>) => any
) {
    // @ts-expect-error
    callback()
}

interface Project {
    name: string
    status: 'active' | 'paused'
}
const projects1 = new Map<string, Project>()
const projects2 = new Set<Project>()

const value0 = geis({}, ({}) => {})
const value1 = geis({ partition: [1, 2, 3] }, ({ partition }) => {})
const value2 = geis({ partition: projects1 }, ({ partition }) => {})
const value3 = geis({ partition: projects2 }, ({ partition }) => {})
const value4 = geis(
    { partition: [projects2, (value) => value] },
    ({ partition }) => {}
)
