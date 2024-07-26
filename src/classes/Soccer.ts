import * as settings from '../constants.ts'
import {Line, Position} from '../types.ts';
import Player from './Player.ts';

class Soccer {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    pos: Position = {x: 8, y: 7}
    lines: Line[] = []
    players: Player[] = [new Player('Marzenna'), new Player('Gąszcz')]
    activePlayer: Player = this.players[0]
    moveNumber: number = 1
    isGameOver: boolean = false

    constructor() {
        this.canvas = <HTMLCanvasElement>document.querySelector('canvas')
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d')

        this.canvas.addEventListener('click', this.moveBall)
        this.render()
    }

    drawFieldBorders = (): void => {
        this.ctx.strokeStyle = '#ddd'
        this.ctx.lineWidth = 3
        this.ctx.lineCap = 'round'

        settings.fieldBorderLines.forEach((line: Line) => {
            this.drawLine(line)
        })
    }

    /**
     * Clears canvas and draws white dots marking playable points
     */
    drawCanvasGrid = (): void => {
        this.ctx.clearRect(0, 0,
            settings.CANVAS_WIDTH * settings.CELL_SIZE,
            settings.CANVAS_HEIGHT * settings.CELL_SIZE)
        this.ctx.fillStyle = "#bbb"

        for (let i = 0; i <= settings.CANVAS_WIDTH; i++) {
            for (let j = 0; j <= settings.CANVAS_HEIGHT; j++) {
                this.ctx.fillRect(i * settings.CELL_SIZE, j * settings.CELL_SIZE, 1, 1)
            }
        }
    }

    drawLine = (line: Line): void => {
        this.ctx.strokeStyle = '#eee'
        this.ctx.lineWidth = 2
        this.ctx.lineCap = 'round'

        this.ctx.beginPath()
        this.ctx.moveTo(line.xa * settings.CELL_SIZE,
            line.ya * settings.CELL_SIZE)
        this.ctx.lineTo(line.xb * settings.CELL_SIZE,
            line.yb * settings.CELL_SIZE)
        this.ctx.stroke()
    }

    drawBall = (): void => {
        this.ctx.fillStyle = "#ffffff"
        this.ctx.beginPath()
        this.ctx.arc(this.pos.x * settings.CELL_SIZE,
            this.pos.y * settings.CELL_SIZE,
            3, 0, Math.PI * 2)
        this.ctx.fill()
    }

    moveBall = (e: MouseEvent): void => {
        const rect: DOMRect = this.canvas.getBoundingClientRect()

        const xb = Math.round((e.clientX - rect.left) / settings.CELL_SIZE)
        const yb = Math.round((e.clientY - rect.top) / settings.CELL_SIZE)

        if (!this.checkIfMoveIsValid(xb, yb)) {
            return
        }

        this.lines.push({
            xa: this.pos.x,
            ya: this.pos.y,
            xb,
            yb
        })

        this.pos = {x: xb, y: yb}
        this.render()

        if (!this.checkIfBallBounces()) {
            this.moveNumber += 1
            this.togglePlayers()
        }
    }

    checkIfBallBounces = (): boolean => {
        for (let line of [...this.lines, ...settings.fieldBorderLines]) {
            if (this.pos.x === line.xa && this.pos.y === line.ya) {
                return true
            }
        }
        return false
    }

    checkIfMoveIsValid = (xb: number, yb: number): boolean => {
        const deltaX = Math.abs(this.pos.x - xb)
        const deltaY = Math.abs(this.pos.y - yb)

        const isOneFieldApart = (deltaX === 0 || deltaX === 1) &&
            (deltaY === 0 || deltaY === 1) &&
            (deltaX === 1 || deltaY === 1)

        // check if lines will cover existing lines or field borders
        for (let line of [...this.lines, ...settings.fieldBorderLines]) {
            if ((line.xa === this.pos.x && line.ya === this.pos.y && line.xb === xb && line.yb === yb) ||
                (line.xa === xb && line.ya === yb && line.xb === this.pos.x && line.yb === this.pos.y)) {
                return false
            }
        }

        return isOneFieldApart
    }

    checkIfGameIsOver = (): boolean => {
        for (let point of settings.goalPoints) {
            if (this.pos.x === point.x && this.pos.y === point.y) {
                this.isGameOver = true
                this.canvas.removeEventListener('click', this.moveBall)
                return true;
            }
        }
        return false
    }

    togglePlayers = (): void => {
        if (this.activePlayer === this.players[0]) {
            this.activePlayer = this.players[1]
        } else {
            this.activePlayer = this.players[0]
        }
    }

    render = (): void => {
        console.log(this.moveNumber, this.activePlayer.name)
        this.drawCanvasGrid()
        this.drawFieldBorders()
        this.lines.forEach(line => {
            this.drawLine(line)
        })
        this.drawBall()
        this.togglePlayers()
        this.checkIfGameIsOver()
    }
}

export default Soccer
