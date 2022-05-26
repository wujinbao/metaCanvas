/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import DrawCommon from "./DrawCommon"
import { PartialDrawParam } from "./Type"

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
			ctx.ellipse(this.drawParam.left - this.drawParam.rotateX, this.drawParam.top - this.drawParam.rotateY, rX, rY, 0, drawParam.sAngle as number * Math.PI,
			drawParam.eAngle as number * Math.PI,
			drawParam.counterclockwise)
		} else {
    		ctx.scale(rX / r, rY / r)
    		ctx.arc(this.drawParam.left, this.drawParam.top, r, 0, 2 * Math.PI, false)
		}

		this.vertex()
		this.marginVertex()
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
			[left - rX, top],
			[left, top - rY - this.vertexMargin * 2]
		]
	}

	marginVertex() {
		const left: number = this.drawParam.left as number
		const top: number = this.drawParam.top as number
		// 保证图形放大、缩小后获取的坐标正确值
		const scaleWidth: number = this.drawParam.scaleWidth as number
		const scaleHeight: number = this.drawParam.scaleHeight as number
		const rX: number = this.drawParam.rX as number
		const rY: number = this.drawParam.rY as number

		this.marginVertexArray = [
			[left - rX - rX * (scaleWidth - 1), top - rY - rY * (scaleHeight - 1)],
			[left + rX + rX * (scaleWidth - 1), top - rY - rY * (scaleHeight - 1)],
			[left + rX + rX * (scaleWidth - 1), top + rY + rY * (scaleHeight - 1)],
			[left - rX - rX * (scaleWidth - 1), top + rY + rY * (scaleHeight - 1)],
		]

		this.marginParam()
	}

	scale(selectorMode: string, moveX: number, moveY: number) {
		const scaleWidth: number = this.drawParam.scaleWidth as number
		const scaleHeight: number = this.drawParam.scaleHeight as number

		switch (selectorMode) {
			case "LEFTUPPERCORNER":
				this.drawParam.left += moveX / scaleWidth
				this.drawParam.top += moveY / scaleHeight
				this.drawParam.rX -= moveX / scaleWidth
				this.drawParam.rY -= moveY / scaleHeight
			break

			case "UPPEREDGEOFFIGURE":
				this.drawParam.top += moveY / scaleHeight
				this.drawParam.rY -= moveY / scaleHeight
			break

			case "UPPERRIGHTCORNER":
				this.drawParam.left += moveX / scaleWidth
				this.drawParam.top += moveY / scaleHeight
				this.drawParam.rX += moveX / scaleWidth
				this.drawParam.rY -= moveY / scaleHeight
			break

			case "FIGURERIGHT":
				this.drawParam.left += moveX / scaleWidth
				this.drawParam.rX += moveX / scaleWidth
			break

			case "LOWERRIGHTCORNER":
				this.drawParam.left += moveX / scaleWidth
				this.drawParam.top += moveY / scaleHeight
				this.drawParam.rX += moveX / scaleWidth
				this.drawParam.rY += moveY / scaleHeight
			break

			case "LOWEREDGEOFFIGURE":
				this.drawParam.top += moveY / scaleHeight
				this.drawParam.rY += moveY / scaleHeight
			break

			case "LOWERLEFTQUARTER":
				this.drawParam.left += moveX / scaleWidth
				this.drawParam.top += moveY / scaleHeight
				this.drawParam.rX -= moveX / scaleWidth
				this.drawParam.rY += moveY / scaleHeight
			break

			case "FIGURELEFT":
				this.drawParam.left += moveX / scaleWidth
				this.drawParam.rX -= moveX / scaleWidth
			break
		}
	}
}

export default Ellipse