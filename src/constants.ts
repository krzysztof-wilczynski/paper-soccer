import {Line, Position} from './types.ts';

export const CELL_SIZE = 50;
export const CANVAS_WIDTH = 16;
export const CANVAS_HEIGHT = 14;
export const FIELD_WIDTH = 8;
export const FIELD_HEIGHT = 10;
export const GOAL_WIDTH = 2;
export const GOAL_HEIGHT = 1;

export const FIELD_LEFT_MARGIN = (CANVAS_WIDTH - FIELD_WIDTH) / 2
export const FIELD_TOP_MARGIN = (CANVAS_HEIGHT - FIELD_HEIGHT) / 2

export enum Direction {
    UP,
    UP_RIGHT,
    RIGHT,
    DOWN_RIGHT,
    DOWN,
    DOWN_LEFT,
    LEFT,
    UP_LEFT
}

export const goalPoints: Position[] = [
    {x: 7, y: 1}, {x: 8, y: 1}, {x: 9, y: 1},
    {x: 7, y: 13}, {x: 8, y: 13}, {x: 9, y: 13}
]

export const fieldBorderLines: Line[] = [
    {xa: 4, ya: 2, xb: 5, yb: 2}, {xa: 5, ya: 2, xb: 6, yb: 2}, {xa: 6, ya: 2, xb: 7, yb: 2}, // góra
    {xa: 7, ya: 2, xb: 7, yb: 1}, {xa: 7, ya: 1, xb: 8, yb: 1}, {xa: 8, ya: 1, xb: 9, yb: 1}, {
        xa: 9,
        ya: 1,
        xb: 9,
        yb: 2
    },
    {xa: 9, ya: 2, xb: 10, yb: 2}, {xa: 10, ya: 2, xb: 11, yb: 2}, {xa: 11, ya: 2, xb: 12, yb: 2},
    {xa: 12, ya: 2, xb: 12, yb: 3}, {xa: 12, ya: 3, xb: 12, yb: 4}, {xa: 12, ya: 4, xb: 12, yb: 5}, {
        xa: 12,
        ya: 5,
        xb: 12,
        yb: 6
    }, {xa: 12, ya: 6, xb: 12, yb: 7}, // prawo
    {xa: 12, ya: 7, xb: 12, yb: 8}, {xa: 12, ya: 8, xb: 12, yb: 9}, {xa: 12, ya: 9, xb: 12, yb: 10}, {
        xa: 12,
        ya: 10,
        xb: 12,
        yb: 11
    }, {xa: 12, ya: 11, xb: 12, yb: 12},
    {xa: 12, ya: 12, xb: 11, yb: 12}, {xa: 11, ya: 12, xb: 10, yb: 12}, {xa: 10, ya: 12, xb: 9, yb: 12}, // dół
    {xa: 9, ya: 12, xb: 9, yb: 13}, {xa: 9, ya: 13, xb: 8, yb: 13}, {xa: 8, ya: 13, xb: 7, yb: 13}, {
        xa: 7,
        ya: 13,
        xb: 7,
        yb: 12
    },
    {xa: 7, ya: 12, xb: 6, yb: 12}, {xa: 6, ya: 12, xb: 5, yb: 12}, {xa: 5, ya: 12, xb: 4, yb: 12}, // lewo
    {xa: 4, ya: 12, xb: 4, yb: 11}, {xa: 4, ya: 11, xb: 4, yb: 10}, {xa: 4, ya: 10, xb: 4, yb: 9}, {
        xa: 4,
        ya: 9,
        xb: 4,
        yb: 8
    }, {xa: 4, ya: 8, xb: 4, yb: 7},
    {xa: 4, ya: 7, xb: 4, yb: 6}, {xa: 4, ya: 6, xb: 4, yb: 5}, {xa: 4, ya: 5, xb: 4, yb: 4}, {
        xa: 4,
        ya: 4,
        xb: 4,
        yb: 3
    }, {xa: 4, ya: 3, xb: 4, yb: 2}
]
