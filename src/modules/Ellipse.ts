/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import DrawCommon from "./DrawCommon"

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
	selectable: boolean
}

// Partial 变为可选参数
type PartialDrawParam = Partial<DrawParam>

// 椭圆类
class Ellipse extends DrawCommon {
	constructor(drawParam?: PartialDrawParam) {
		super(drawParam)
	}

	privateDraw(ctx: CanvasRenderingContext2D) {
		const drawParam = this.drawParam
		const rX = drawParam.rX as number
		const rY = drawParam.rY as number
		const r = (rX > rY) ? rX : rY

		if (ctx.ellipse) {
			ctx.ellipse(0, 0, rX, rY, 0, drawParam.sAngle as number * Math.PI,
			drawParam.eAngle as number * Math.PI,
			drawParam.counterclockwise)
		} else {
    		ctx.scale(rX / r, rY / r)
    		ctx.arc(0, 0, r, 0, 2 * Math.PI, false)
		}

		this.vertex()
	}

	vertex() {
		const left: number = this.drawParam.left as number
		const top: number = this.drawParam.top as number
		const rX: number = this.drawParam.rX as number
		const rY: number = this.drawParam.rY as number

		this.vertexArray = [
			[left - rX, top - rY],
			[left, top - rY],
			[left + rX, top - rY],
			[left + rX, top],
			[left + rX, top + rY],
			[left, top + rY],
			[left - rX, top + rY],
			[left - rX, top]
		]
	}

	onmousemove(vertexIndex: number, moveX: number, moveY: number) {
		const scaleWidth: number = this.drawParam.scaleWidth as number
		const scaleHeight: number = this.drawParam.scaleHeight as number

		switch (vertexIndex) {
			case 0:
				this.drawParam.left! += moveX
				this.drawParam.top! += moveY
				this.drawParam.rX! -= moveX / scaleWidth
				this.drawParam.rY! -= moveY / scaleHeight
			break

			case 1:
				this.drawParam.top! += moveY
				this.drawParam.rY! -= moveY / scaleHeight
			break

			case 2:
				this.drawParam.left! += moveX
				this.drawParam.top! += moveY
				this.drawParam.rX! += moveX / scaleWidth
				this.drawParam.rY! -= moveY / scaleHeight
			break

			case 3:
				this.drawParam.left! += moveX
				this.drawParam.rX! += moveX / scaleWidth
			break

			case 4:
				this.drawParam.left! += moveX
				this.drawParam.top! += moveY
				this.drawParam.rX! += moveX / scaleWidth
				this.drawParam.rY! += moveY / scaleHeight
			break

			case 5:
				this.drawParam.top! += moveY
				this.drawParam.rY! += moveY / scaleHeight
			break

			case 6:
				this.drawParam.left! += moveX
				this.drawParam.top! += moveY
				this.drawParam.rX! -= moveX / scaleWidth
				this.drawParam.rY! += moveY / scaleHeight
			break

			case 7:
				this.drawParam.left! += moveX
				this.drawParam.rX! -= moveX / scaleWidth
			break
		}
	}
}

export default Ellipse