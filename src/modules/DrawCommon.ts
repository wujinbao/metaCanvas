/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import Canvas from "./MetaCanvas"
import { GlobalCompositeOperation, Direction } from "./Enum"
import { PartialDrawParam, PartialAnimationOption } from "./Type"
import computeMethod from "@/utils/computeMethod"

class DrawCommon {
    drawParam: PartialDrawParam = {
        left: 0,
        top: 0,
        dotArray: [[10, 10]],
        width: 50,
        height: 50,
		shearX: 0,
		shearY: 0,
		shearWidth: 0,
		shearHeight: 0,
		imgSrc: '',
        radius: 50,
        rX: 40,
        rY: 20,
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
		rotateX: 0,
		rotateY: 0,
        scaleWidth: 1,
        scaleHeight: 1,
        globalAlpha: 1,
        globalCompositeOperation: GlobalCompositeOperation.SOURCEOVER,
        selectable: false,
		positiveScaling: false
    }
    canvas: Canvas
    vertexArray: Array<[number, number]> = []
	marginVertexArray: Array<[number, number]> = []
	marginParamArray: Array<number> = []
	vertexMargin: number = 10
	requestID: number
	animationOption: PartialAnimationOption = {
		vX: 0, vY: 0, sX: 0, sY: 0
	}
    
    constructor(drawParam?: PartialDrawParam) {
        if (drawParam) {
            let key: (keyof PartialDrawParam)
            for (key in drawParam) {
				if (key in this.drawParam) {
					this.drawParam[key] = drawParam[key]
				}
            }
			this.vertex()
			this.rotationPoint()
			this.marginVertex()
			this.marginParam()
        }
    }

    get(attr: string) {
		return this.drawParam[attr]
	}

	set(attr: PartialDrawParam) {
        let key: (keyof PartialDrawParam)
		for (key in attr) {
			if (key in this.drawParam) {
				this.drawParam[key] = attr[key]
			}
		}

		return this
	}

    draw(canvas: Canvas) {
		this.canvas = canvas
		const ctx: CanvasRenderingContext2D = canvas.ctx

		ctx.save()
		ctx.beginPath()
		
		this.initAttr(ctx)

		if (this.drawParam.angle) {
			ctx.translate(this.drawParam.rotateX, this.drawParam.rotateY)
			ctx.rotate(this.drawParam.angle * Math.PI / 180)
			ctx.translate(-this.drawParam.rotateX, -this.drawParam.rotateY)
		}

		if (this.drawParam.scaleWidth !== 1 || this.drawParam.scaleHeight !== 1) {
			ctx.translate(this.drawParam.rotateX, this.drawParam.rotateY)
			ctx.scale(this.drawParam.scaleWidth, this.drawParam.scaleHeight)
			ctx.translate(-this.drawParam.rotateX, -this.drawParam.rotateY)
		}

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
			ctx.strokeStyle = this.drawParam.stroke
			ctx.stroke()
		}
		
		ctx.closePath()

		if (this.drawParam.selectable) {
			this.vertexDraw(ctx)
		}

		ctx.restore()

		if (this.drawParam.selectable) {
			this.marginDraw(ctx)
		}
	}

	initAttr(ctx: CanvasRenderingContext2D) {
		ctx.shadowColor = this.drawParam.shadowColor as string
		ctx.shadowBlur = this.drawParam.shadowBlur as number
		ctx.shadowOffsetX = this.drawParam.shadowOffsetX as number
		ctx.shadowOffsetY = this.drawParam.shadowOffsetY as number
		ctx.lineCap = this.drawParam.lineCap as CanvasLineCap
		ctx.lineJoin = this.drawParam.lineJoin as CanvasLineJoin
		ctx.lineWidth = this.drawParam.lineWidth as number
		ctx.miterLimit = this.drawParam.miterLimit as number
		ctx.globalAlpha = this.drawParam.globalAlpha as number
		ctx.globalCompositeOperation = this.drawParam.globalCompositeOperation as GlobalCompositeOperation
	}

    // ??????????????? - ??????????????????
	vertexDraw(ctx: CanvasRenderingContext2D) {
		const vertexArray: Array<[number, number]> = this.vertexArray
		const vertexMargin: number = this.vertexMargin
		const scaleWidth: number = this.drawParam.scaleWidth
		const scaleHeight: number = this.drawParam.scaleHeight
		ctx.save()
		ctx.lineCap = 'butt'
		ctx.lineJoin = 'miter'
		ctx.lineWidth = 1
		ctx.miterLimit = 10
		ctx.globalAlpha = 0.2
		ctx.globalCompositeOperation = 'source-over'
		ctx.strokeStyle = '#00a7d0'
		ctx.fillStyle = '#00a7d0'
		ctx.beginPath()
		ctx.moveTo(vertexArray[1][0], vertexArray[1][1])
		ctx.lineTo(vertexArray[8][0], vertexArray[8][1] + vertexMargin / scaleWidth / 2)
		ctx.strokeRect(vertexArray[0][0], vertexArray[0][1], vertexArray[2][0] - vertexArray[0][0], vertexArray[4][1] - vertexArray[0][1])
		vertexArray.map((item, index) => {
			if (!this.drawParam.positiveScaling || index % 2 == 0) {
				ctx.fillRect(item[0] - vertexMargin / scaleWidth / 2, item[1] - vertexMargin / scaleHeight / 2, vertexMargin / scaleWidth, vertexMargin / scaleHeight)
			}
		})
		ctx.closePath()
		ctx.stroke()
		ctx.restore()
	}

	// ??????????????????
	rotationPoint() {
		this.drawParam.rotateX = this.vertexArray[1][0]
		this.drawParam.rotateY = this.vertexArray[3][1]
	}

	marginParam() {
		let minX: number = 0
		let minY: number = 0
		let maxX: number = 0
		let maxY: number = 0
		this.marginVertexArray.map((item, index) => {
			const point: Array<number> = computeMethod.rotationPoint(this.drawParam.rotateX, this.drawParam.rotateY, item[0], item[1], this.drawParam.angle)
			if (index == 0) {
				minX = point[0]
				minY = point[1]
				maxX = point[0]
				maxY = point[1]
			} else {
				if (point[0] > maxX) {
					maxX = point[0]
				} else if (point[0] < minX) {
					minX = point[0]
				}
				if (point[1] > maxY) {
					maxY = point[1]
				} else if (point[1] < minY) {
					minY = point[1]
				}
			}
		})

		this.marginParamArray = [minX, minY, maxX, maxY]
	}

	marginDraw(ctx: CanvasRenderingContext2D) {
		ctx.strokeStyle = "blue"
		ctx.strokeRect(this.marginParamArray[0], this.marginParamArray[1], this.marginParamArray[2] - this.marginParamArray[0], this.marginParamArray[3] - this.marginParamArray[1])
	}

    animation(direction: string, distance: number | string, animationOption?: PartialAnimationOption) {
		// ???????????????????????????????????????
		if (this.canvas.drawTargetArray.indexOf(this) == -1) {
			this.canvas.drawTargetArray.push(this)
		}

		if (animationOption) {
            let key: (keyof PartialDrawParam)
			for(key in animationOption){
        		this.animationOption[key] = animationOption[key]
  			}
		}

		this.requestID = requestAnimationFrame(this.animation.bind(this, direction, distance, this.animationOption))

		if (typeof distance == 'number') {
			if (direction == Direction.LEFT && this.drawParam.left >= distance) {
				this.drawParam.left -= this.animationOption.vX
				this.drawParam.top += this.animationOption.vY
				this.drawParam.rotateX -= this.animationOption.vX
				this.drawParam.rotateY += this.animationOption.vY
			} else if (direction == Direction.RIGHT && this.drawParam.left <= distance) {
				this.drawParam.left += this.animationOption.vX
				this.drawParam.top += this.animationOption.vY
				this.drawParam.rotateX += this.animationOption.vX
				this.drawParam.rotateY += this.animationOption.vY
			} else if (direction == Direction.TOP && this.drawParam.top >= distance) {
				this.drawParam.left += this.animationOption.vX
				this.drawParam.top -= this.animationOption.vY
				this.drawParam.rotateX += this.animationOption.vX
				this.drawParam.rotateY -= this.animationOption.vY
			} else if (direction == Direction.DOWN && this.drawParam.top <= distance) {
				this.drawParam.left += this.animationOption.vX
				this.drawParam.top += this.animationOption.vY
				this.drawParam.rotateX += this.animationOption.vX
				this.drawParam.rotateY += this.animationOption.vY
			} else {
				cancelAnimationFrame(this.requestID)
			}
		}

		this.animationOption.vX += this.animationOption.sX
		this.animationOption.vY += this.animationOption.sY
		this.canvas.renderAll()
	}

	translation(moveX: number, moveY: number) {
		this.drawParam.left += moveX
		this.drawParam.top += moveY

		this.vertex()
		this.rotationPoint()
		this.marginVertex()
	}

	rotate(startX: number, startY: number, endX: number, endY: number) {
		const rotationAngle: number = computeMethod.rotationAngle(this.drawParam.rotateX, this.drawParam.rotateY, startX, startY, endX, endY)
		this.drawParam.angle -= rotationAngle

		this.marginVertex()
	}

    // ??????????????????????????????
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    privateDraw(ctx: CanvasRenderingContext2D) {} // ???????????????????????????
    scale(selectorMode: string, moveX: number, moveY: number) {}
	vertex() {} // ????????????????????????????????????
	marginVertex() {} // ?????????????????????????????????
}

export default DrawCommon