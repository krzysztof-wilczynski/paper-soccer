import Soccer from './classes/Soccer.ts';

const canvas  = <HTMLCanvasElement> document.getElementById("gameCanvas");
const ctx = <CanvasRenderingContext2D> canvas.getContext("2d");

const CELL_SIZE = 50;
const CANVAS_WIDTH = 16;
const CANVAS_HEIGHT = 14;
const FIELD_WIDTH = 8;
const FIELD_HEIGHT = 10;
const GOAL_WIDTH = 2;
const GOAL_HEIGHT = 1;

const FIELD_LEFT_MARGIN = (CANVAS_WIDTH - FIELD_WIDTH) / 2
const FIELD_TOP_MARGIN = (CANVAS_HEIGHT - FIELD_HEIGHT) / 2

let currentX = 8;
let currentY = 7;
let lines = [];

function drawCanvasGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#bbb";

    for (let i = 0; i <= CANVAS_WIDTH; i++) {
        for (let j = 0; j <= CANVAS_HEIGHT; j++) {
            ctx.fillRect(i * CELL_SIZE, j * CELL_SIZE, 1, 1)
        }
    }
}

function drawLineByDirection(xPos, yPos, direction = 0, length = 1) {
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 3;
    ctx.lineCap = 'round'

    const angle = direction * Math.PI / 4;
    const deltaX = Math.round(Math.sin(angle))
    const deltaY = -Math.round(Math.cos(angle))

    const newX = xPos + deltaX * length
    const newY = yPos + deltaY * length

    ctx.beginPath()
    ctx.moveTo(xPos * CELL_SIZE, yPos * CELL_SIZE);
    ctx.lineTo(newX * CELL_SIZE, newY * CELL_SIZE);
    ctx.stroke();

    lines.push([xPos, yPos, newX, newY])

    return [newX, newY]
}

const Direction = {
    UP: 0,
    UP_RIGHT: 1,
    RIGHT: 2,
    DOWN_RIGHT: 3,
    DOWN: 4,
    DOWN_LEFT: 5,
    LEFT: 6,
    UP_LEFT: 7
}

const fieldBorderLines = [
    [4, 2, 5, 2], [5, 2, 6, 2], [6, 2, 7, 2], // góra
    [7, 2, 7, 1], [7, 1, 8, 1], [8, 1, 9, 1], [9, 1, 9, 2],
    [9, 2, 10, 2], [10, 2, 11, 2], [11, 2, 12, 2],
    [12, 2, 12, 3], [12, 3, 12, 4], [12, 4, 12, 5], [12, 5, 12, 6], [12, 6, 12, 7], // prawo
    [12, 7, 12, 8], [12, 8, 12, 9], [12, 9, 12, 10], [12, 10, 12, 11], [12, 11, 12, 12],
    [12, 12, 11, 12], [11, 12, 10, 12], [10, 12, 9, 12], // dół
    [9, 12, 9, 13], [9, 13, 8, 13], [8, 13, 7, 13], [7, 13, 7, 12],
    [7, 12, 6, 12], [6, 12, 5, 12], [5, 12, 4, 12], // lewo
    [4, 12, 4, 11], [4, 11, 4, 10], [4, 10, 4, 9], [4, 9, 4, 8], [4, 8, 4, 7],
    [4, 7, 4, 6], [4, 6, 4, 5], [4, 5, 4, 4], [4, 4, 4, 3], [4, 3, 4, 2]
]

function drawLine(xa, ya, xb, yb) {
    ctx.beginPath()
    ctx.moveTo(xa * CELL_SIZE, ya * CELL_SIZE);
    ctx.lineTo(xb * CELL_SIZE, yb * CELL_SIZE);
    ctx.stroke();
}


function drawFieldBorders() {
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 3;
    ctx.lineCap = 'round'

    fieldBorderLines.forEach(line => {
        drawLine(...line)
    })
}

function drawFieldBordersByDirection() {
    let currentPosition = [FIELD_LEFT_MARGIN, FIELD_TOP_MARGIN]

    const steps = [
        [Direction.RIGHT, (FIELD_WIDTH - GOAL_WIDTH) / Direction.RIGHT],
        [Direction.UP, GOAL_HEIGHT], [Direction.RIGHT, GOAL_WIDTH],
        [Direction.DOWN, GOAL_HEIGHT], [Direction.RIGHT, (FIELD_WIDTH - GOAL_WIDTH) / Direction.RIGHT], // góra
        [Direction.DOWN, FIELD_HEIGHT], // prawo
        [Direction.LEFT, (FIELD_WIDTH - GOAL_WIDTH) / Direction.RIGHT],
        [Direction.DOWN, GOAL_HEIGHT], [Direction.LEFT, GOAL_WIDTH],
        [Direction.UP, GOAL_HEIGHT], [Direction.LEFT, (FIELD_WIDTH - GOAL_WIDTH) / Direction.RIGHT], // lewo
        [Direction.UP, FIELD_HEIGHT] // lewa strona
    ]

    steps.forEach(step => {
        currentPosition = drawLineByDirection(currentPosition[0], currentPosition[1], step[0], step[1])
    })
}

function drawLines() {
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;

    lines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line[0] * CELL_SIZE, line[1] * CELL_SIZE);
        ctx.lineTo(line[2] * CELL_SIZE, line[3] * CELL_SIZE);
        ctx.stroke();
    });
}

function drawBall() {
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(currentX * CELL_SIZE, currentY * CELL_SIZE, 4, 0, Math.PI * 2);
    ctx.fill();
}

function isValidMove(newX, newY) {
    // if (x < FIELD_LEFT_MARGIN ||
    //     y < (FIELD_TOP_MARGIN - GOAL_HEIGHT) ||
    //     x > (FIELD_LEFT_MARGIN + FIELD_WIDTH) ||
    //     y > (FIELD_TOP_MARGIN + FIELD_HEIGHT + GOAL_HEIGHT)) {
    //     return false;
    // }

    const deltaX = Math.abs(currentX - newX)
    const deltaY = Math.abs(currentY - newY)

    const isOneFieldApart = ((deltaX === 0 || deltaX === 1) &&
        (deltaY === 0 || deltaY === 1) &&
        (deltaX === 1 || deltaY === 1))

    // czy linie się przypadkiem nie będą pokrywać
    for (let line of [...lines, ...fieldBorderLines]) {
        if ((line[0] === currentX && line[1] === currentY && line[2] === newX && line[3] === newY) ||
            (line[0] === newX && line[1] === newY && line[2] === currentX && line[3] === currentY)) {
            return false
        }
    }

    return isOneFieldApart

    //
    // for (let line of lines) {
    //     if (
    //         (line.startX === currentX && line.startY === currentY && line.endX === x && line.endY === y) ||
    //         (line.startX === x && line.startY === y && line.endX === currentX && line.endY === currentY)
    //     ) {
    //         return false;
    //     }
    // }

    // return true;
}

function moveBall(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newX = Math.round(x / CELL_SIZE);
    const newY = Math.round(y / CELL_SIZE)

    if (isValidMove(newX, newY)) {
        lines.push([currentX, currentY, newX, newY]);
        currentX = newX
        currentY = newY

        render()
    }


    //
    // console.log(FIELD_LEFT_MARGIN,
    //     (FIELD_TOP_MARGIN - GOAL_HEIGHT),
    //     (FIELD_LEFT_MARGIN + FIELD_WIDTH),
    //     (FIELD_TOP_MARGIN + FIELD_HEIGHT + GOAL_HEIGHT))
    //
    // console.log(isValidMove(newX, newY))
    // //
    // if (isValidMove(newX, newY)) {
    //     lines.push({
    //         startX: currentX,
    //         startY: currentY,
    //         endX: newX,
    //         endY: newY,
    //     });
    //
    //     currentX = newX;
    //     currentY = newY;
    //
    //     if (currentX === 0 || currentY === 0 || currentX === (COLS - 1) * CELL_SIZE || currentY === (ROWS - 1) * CELL_SIZE) {
    //         alert("Odbicie!");
    //     }
    //
    //     draw();
    // }
}

function render() {
    console.log(lines)
    drawCanvasGrid();
    drawFieldBorders();
    drawBall();
    drawLines();
}

canvas.addEventListener("click", moveBall);
// render();

let soccer = new Soccer(ctx)
