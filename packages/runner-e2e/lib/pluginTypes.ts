export interface Plugin<TExports extends ExportMap = ExportMap> {
    init: () => TExports | Promise<TExports>
    dispose?: () => Promise<void>
}

export interface ExportMap {
    [key: string]: any
}

export interface Disposable {}
