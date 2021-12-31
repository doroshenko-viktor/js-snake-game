export enum OccupationType {
    None,
    Snake,
    Target,
}

export interface ICell {
    readonly x: number;
    readonly y: number;
}

export interface IShape {
    getCells(): ICell[]
}