/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import Canvas from "./MetaCanvas"

// 图形参数类型描述
// 注意属性 lineCap、lineJoin类型
// 分别是：CanvasLineCap、CanvasLineJoin
// 而不是 string 类型
type DrawParam = {
	left: number,
	top: number,
	dotArray: Array<[number, number]>,
	width: number,
	height: number,
	radius: number,
	rX: number,
	rY: number,
	sAngle: number,
	eAngle: number,
	counterclockwise: boolean,
	fill: string,
	stroke: string,
	shadowColor: string,
	shadowBlur: number,
	shadowOffsetX: number,
	shadowOffsetY: number,
	lineCap: CanvasLineCap,
	lineJoin: CanvasLineJoin,
	lineWidth: number,
	miterLimit: number,
	angle: number,
	scaleWidth: number,
	scaleHeight: number,
	globalAlpha: number,
	// globalCompositeOperation: GlobalCompositeOperation,
	selectable: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [attr: string]: any
}

// Partial 变为可选参数
type PartialDrawParam = Partial<DrawParam>

enum Direction {
	Left = 'left',
	Right ='right',
	Top = 'top',
	Down = 'down'
}

type AnimateOption = {
	vX: number,
	vY: number,
	sX: number,
	sY: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [attr: string]: any
}

type PartialAnimateOption = Partial<AnimateOption>

class DrawCommon {
    drawParam: PartialDrawParam = {
        left: 0,
        top: 0,
        dotArray: [[10, 10]],
        width: 50,
        height: 50,
        radius: 50,
        rX: 20,
        rY: 10,
        sAngle: 0,
        eAngle: 2,
        counterclockwise: false,
        fill: '',
        stroke: '',
        shadowColor: '#000',
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        lineCap: 'butt',
        lineJoin: 'miter',
        lineWidth: 1,
        miterLimit: 10,
        angle: 0,
        scaleWidth: 1,
        scaleHeight: 1,
        globalAlpha: 1,
        // globalCompositeOperation: 'source-over',
        selectable: false
    }
    canvas!: Canvas
    vertexArray: Array<[number, number]> = []
	vertexWidth: number = 10
	vertexHeight: number = 10
	requestID!: number
	animateOption: PartialAnimateOption = {
		vX: 0, vY: 0, sX: 0, sY: 0
	}
    
    constructor(drawParam?: PartialDrawParam) {
        if (drawParam) {
            let key: (keyof PartialDrawParam)
            for (key in drawParam) {
                this.drawParam[key] = drawParam[key]
            }
        }
    }

    get(attr: string) {
		return this.drawParam[attr]
	}

	set(attr: PartialDrawParam) {
        let key: (keyof PartialDrawParam)
		for (key in attr) {
			this.drawParam[key] = attr[key]
		}

		return this
	}

    draw(canvas: Canvas) {
		this.canvas = canvas
		const ctx: CanvasRenderingContext2D = canvas.ctx
		ctx.save()
		ctx.beginPath()
		ctx.shadowColor = this.drawParam.shadowColor as string
		ctx.shadowBlur = this.drawParam.shadowBlur as number
		ctx.shadowOffsetX = this.drawParam.shadowOffsetX as number
		ctx.shadowOffsetY = this.drawParam.shadowOffsetY as number
		ctx.lineCap = this.drawParam.lineCap as CanvasLineCap
		ctx.lineJoin = this.drawParam.lineJoin as CanvasLineJoin
		ctx.lineWidth = this.drawParam.lineWidth as number
		ctx.miterLimit = this.drawParam.miterLimit as number
		ctx.globalAlpha = this.drawParam.globalAlpha as number
		// ctx.globalCompositeOperation = this.drawParam.globalCompositeOperation as GlobalCompositeOperation
		ctx.translate(this.drawParam.left as number, this.drawParam.top as number)
		ctx.rotate(this.drawParam.angle as number * Math.PI / 180)
		ctx.scale(this.drawParam.scaleWidth as number, this.drawParam.scaleHeight as number)
		this.privateDraw(ctx)
		if (this.drawParam.fill && this.drawParam.stroke) {
			ctx.fillStyle = this.drawParam.fill
			ctx.fill()

			ctx.strokeStyle = this.drawParam.stroke
			ctx.stroke()
		} else if (this.drawParam.fill) {
			ctx.fillStyle = this.drawParam.fill
			ctx.fill()
		} else {
			ctx.strokeStyle = this.drawParam.stroke as string
			ctx.stroke()
		}
		ctx.closePath()

		if (this.drawParam.selectable) {
			this.vertexDraw(ctx)
		}

		ctx.restore()
	}

    // 图形选择器 - 根据顶点绘制
	vertexDraw(ctx: CanvasRenderingContext2D) {
		const vertexArray: Array<[number, number]> = this.vertexArray
		const vertexWidth: number = this.vertexWidth
		const vertexHeight: number = this.vertexHeight
        const left: number = this.drawParam.left as number
        const top: number = this.drawParam.top as number
		ctx.save()
		ctx.translate(-left, -top)
		ctx.lineCap = 'butt'
		ctx.lineJoin = 'miter'
		ctx.lineWidth = 1
		ctx.miterLimit = 10
		ctx.globalAlpha = 0.2
		// ctx.globalCompositeOperation = 'source-over'
		ctx.strokeStyle = '#00a7d0'
		ctx.fillStyle = '#00a7d0'
		ctx.beginPath()
		vertexArray.map((item, index) => {
			if (index === 0) {
				ctx.moveTo(item[0], item[1])
			} else {
				ctx.lineTo(item[0], item[1])
			}
			
			ctx.fillRect(item[0] - vertexWidth / 2, item[1] - vertexHeight / 2, vertexWidth, vertexHeight)
		})
		ctx.fillRect(vertexArray[1][0] - vertexWidth / 2, vertexArray[1][1] - vertexHeight * 3.5, vertexWidth, vertexHeight)
		ctx.closePath()
		ctx.moveTo(vertexArray[1][0], vertexArray[1][1] - vertexHeight / 2)
		ctx.lineTo(vertexArray[1][0], vertexArray[1][1] - vertexHeight * 2.5)
		ctx.stroke()
		ctx.restore()
	}

    animate(direction: string, distance: number | string, animateOption?: PartialAnimateOption) {
		// 判断图形是否已添加到画布上
		if (this.canvas.drawTargetArray.indexOf(this) == -1) {
			this.canvas.drawTargetArray.push(this)
		}

		this.requestID = requestAnimationFrame(this.animate.bind(this, direction, distance, this.animateOption))

		if (animateOption) {
            let key: (keyof PartialDrawParam)
			for(key in animateOption){
        		this.animateOption[key] = animateOption[key]
  			}
		}

		if (typeof distance == 'number') {
			if (direction == Direction.Left && this.drawParam.left! >= distance) {
				this.drawParam.left! -= this.animateOption.vX!
				this.drawParam.top! += this.animateOption.vY!
			} else if (direction == Direction.Right && this.drawParam.left! <= distance) {
				this.drawParam.left! += this.animateOption.vX!
				this.drawParam.top! += this.animateOption.vY!
			} else if (direction == Direction.Top && this.drawParam.top! >= distance) {
				this.drawParam.left! += this.animateOption.vX!
				this.drawParam.top! -= this.animateOption.vY!
			} else if (direction == Direction.Down && this.drawParam.top! <= distance) {
				this.drawParam.left! += this.animateOption.vX!
				this.drawParam.top! += this.animateOption.vY!
			} else {
				cancelAnimationFrame(this.requestID)
			}
		}

		this.animateOption.vX! += this.animateOption.sX!
		this.animateOption.vY! += this.animateOption.sY!
		this.canvas.renderAll()
	}

    // 父类需子类重写的方法
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    privateDraw(ctx: CanvasRenderingContext2D) {}
    onmousemove(vertexIndex: number, moveX: number, moveY: number) {}
}

export default DrawCommon