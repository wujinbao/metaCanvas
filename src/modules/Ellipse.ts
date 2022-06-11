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
			ctx.ellipse(this.drawParam.left, this.drawParam.top, rX, rY, 0, drawParam.sAngle as number * Math.PI,
			drawParam.eAngle as number * Math.PI,
			drawParam.counterclockwise)
		} else {
    		ctx.scale(rX / r, rY / r)
    		ctx.arc(this.drawParam.left, this.drawParam.top, r, 0, 2 * Math.PI, false)
		}
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
		const rotateX: number = this.drawParam.rotateX
		const rotateY: number = this.drawParam.rotateY
		const scaleWidth: number = this.drawParam.scaleWidth as number
		const scaleHeight: number = this.drawParam.scaleHeight as number
		const rX: number = this.drawParam.rX as number
		const rY: number = this.drawParam.rY as number

		this.marginVertexArray = [
			[rotateX - rX * scaleWidth, rotateY - rY * scaleHeight],
			[rotateX + rX * scaleWidth, rotateY - rY * scaleHeight],
			[rotateX + rX * scaleWidth, rotateY + rY * scaleHeight],
			[rotateX - rX * scaleWidth, rotateY + rY * scaleHeight],
		]

		this.marginParam()
	}

	scale(selectorMode: string, moveX: number, moveY: number) {
		const scaleWidth: number = this.drawParam.scaleWidth as number
		const scaleHeight: number = this.drawParam.scaleHeight as number

		// 是否正比例 positiveScaling 放大缩小
		// moveX、moveY 一正一负时（即右上角和左下角）需处理
		const ratio: number = (this.drawParam.rY * scaleHeight) / (this.drawParam.rX * scaleWidth)
		moveY = this.drawParam.positiveScaling ? moveX * moveY <= 0 ? -moveX * ratio : moveX * ratio : moveY

		switch (selectorMode) {
			case "LEFTUPPERCORNER":
				this.drawParam.left += moveX / 2
				this.drawParam.rX -= moveX / scaleWidth / 2
				this.drawParam.top += moveY / 2
				this.drawParam.rY -= moveY / scaleHeight / 2
			break

			case "UPPEREDGEOFFIGURE":
				this.drawParam.top += moveY / 2
				this.drawParam.rY -= moveY / scaleHeight / 2
			break

			case "UPPERRIGHTCORNER":
				this.drawParam.left += moveX / 2
				this.drawParam.rX += moveX / scaleWidth / 2
				this.drawParam.top += moveY / 2
				this.drawParam.rY -= moveY / scaleHeight / 2
			break

			case "FIGURERIGHT":
				this.drawParam.left += moveX / 2
				this.drawParam.rX += moveX / scaleWidth / 2
			break

			case "LOWERRIGHTCORNER":
				this.drawParam.left += moveX / 2
				this.drawParam.rX += moveX / scaleWidth / 2
				this.drawParam.top += moveY / 2
				this.drawParam.rY += moveY / scaleHeight / 2
			break

			case "LOWEREDGEOFFIGURE":
				this.drawParam.top += moveY / 2
				this.drawParam.rY += moveY / scaleHeight / 2
			break

			case "LOWERLEFTQUARTER":
				this.drawParam.left += moveX / 2
				this.drawParam.rX -= moveX / scaleWidth / 2
				this.drawParam.top += moveY / 2
				this.drawParam.rY += moveY / scaleHeight / 2
			break

			case "FIGURELEFT":
				this.drawParam.left += moveX / 2
				this.drawParam.rX -= moveX / scaleWidth / 2
			break
		}
	}
}

export default Ellipse