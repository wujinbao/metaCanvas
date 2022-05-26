/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import DrawCommon from "./DrawCommon"
import { PartialDrawParam } from "./Type"

// 三角形类
class Triangle extends DrawCommon {
	constructor(drawParam?: PartialDrawParam) {
		super(drawParam)
	}

	privateDraw(ctx: CanvasRenderingContext2D) {
		ctx.moveTo(this.drawParam.left - this.drawParam.rotateX, this.drawParam.top - this.drawParam.rotateY)
		ctx.lineTo(this.vertexArray[4][0] - this.drawParam.rotateX, this.vertexArray[4][1] - this.drawParam.rotateY)
		ctx.lineTo(this.vertexArray[6][0] - this.drawParam.rotateX, this.vertexArray[6][1] - this.drawParam.rotateY)
		ctx.closePath()

		this.vertex()
		this.marginVertex()
	}

	vertex() {
		const left: number = this.drawParam.left as number
		const top: number = this.drawParam.top as number
		const width: number = this.drawParam.width as number
		const height: number = this.drawParam.height as number

		this.vertexArray = [
			[left - width / 2, top],
			[left, top],
			[left + width / 2, top],
			[left + width / 2, top + height / 2],
			[left + width / 2, top + height],
			[left, top + height],
			[left - width / 2, top + height],
			[left - width / 2, top + height / 2],
			[left, top - this.vertexMargin * 2]
		]
	}

	marginVertex() {
		const left: number = this.drawParam.left as number
		const top: number = this.drawParam.top as number
		// 保证图形放大、缩小后获取的坐标正确值
		const scaleWidth: number = this.drawParam.scaleWidth as number
		const scaleHeight: number = this.drawParam.scaleHeight as number
		const width: number = this.drawParam.width as number
		const height: number = this.drawParam.height as number

		this.marginVertexArray = [
			[left - width / 2 - width / 2 * (scaleWidth - 1), top -  height / 2 * (scaleHeight - 1)],
			[left + width / 2 + width / 2 * (scaleWidth - 1), top - height / 2 * (scaleHeight - 1)],
			[left + width / 2 + width / 2 * (scaleWidth - 1), top + height + height / 2 * (scaleHeight - 1)],
			[left - width / 2 - width / 2 * (scaleWidth - 1), top + height + height / 2 * (scaleHeight - 1)]
		]

		this.marginParam()
	}

	scale(selectorMode: string, moveX: number, moveY: number) {
		const scaleWidth: number = this.drawParam.scaleWidth as number
		const scaleHeight: number = this.drawParam.scaleHeight as number

		switch (selectorMode) {
			case "LEFTUPPERCORNER":
				this.drawParam.left += moveX / 2
				this.drawParam.top += moveY
				this.drawParam.width -= moveX / scaleWidth
				this.drawParam.height -= moveY / scaleHeight
				break

			case "UPPEREDGEOFFIGURE":
				this.drawParam.top += moveY
				this.drawParam.height -= moveY / scaleHeight
				break

			case "UPPERRIGHTCORNER":
				this.drawParam.left += moveX / 2
				this.drawParam.top += moveY
				this.drawParam.width += moveX / scaleWidth
				this.drawParam.height -= moveY / scaleHeight
				break

			case "FIGURERIGHT":
				this.drawParam.left += moveX / 2
				this.drawParam.width += moveX / scaleWidth
				break

			case "LOWERRIGHTCORNER":
				this.drawParam.left += moveX / 2
				this.drawParam.width += moveX / scaleWidth
				this.drawParam.height += moveY / scaleHeight
				break

			case "LOWEREDGEOFFIGURE":
				this.drawParam.height += moveY / scaleHeight
				break

			case "LOWERLEFTQUARTER":
				this.drawParam.left += moveX / 2
				this.drawParam.width -= moveX / scaleWidth
				this.drawParam.height += moveY / scaleHeight
				break

			case "FIGURELEFT":
				this.drawParam.left += moveX / 2
				this.drawParam.width -= moveX / scaleWidth
				break
		}
	}
}

export default Triangle