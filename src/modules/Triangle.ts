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
		ctx.moveTo(this.drawParam.left, this.drawParam.top)
		ctx.lineTo(this.vertexArray[4][0], this.vertexArray[4][1])
		ctx.lineTo(this.vertexArray[6][0], this.vertexArray[6][1])
		ctx.closePath()
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
		const rotateX: number = this.drawParam.rotateX
		const rotateY: number = this.drawParam.rotateY
		const scaleWidth: number = this.drawParam.scaleWidth as number
		const scaleHeight: number = this.drawParam.scaleHeight as number
		const width: number = this.drawParam.width
		const height: number = this.drawParam.height

		this.marginVertexArray = [
			[rotateX - width / 2 * scaleWidth, rotateY - height / 2 * scaleHeight],
			[rotateX + width / 2 * scaleWidth, rotateY - height / 2 * scaleHeight],
			[rotateX + width / 2 * scaleWidth, rotateY + height / 2 * scaleHeight],
			[rotateX - width / 2 * scaleWidth, rotateY + height / 2 * scaleHeight]
		]

		this.marginParam()
	}

	scale(selectorMode: string, moveX: number, moveY: number) {
		const scaleWidth: number = this.drawParam.scaleWidth as number
		const scaleHeight: number = this.drawParam.scaleHeight as number

		// 是否正比例 positiveScaling 放大缩小
		// moveX、moveY 一正一负时（即右上角和左下角）需处理
		const ratio: number = (this.drawParam.height * scaleHeight) / (this.drawParam.width * scaleWidth)
		moveY = this.drawParam.positiveScaling ? moveX * moveY <= 0 ? -moveX * ratio : moveX * ratio : moveY

		switch (selectorMode) {
			case "LEFTUPPERCORNER":
				this.drawParam.left += moveX / 2				
				this.drawParam.top += moveY / 2 + moveY / scaleHeight / 2
				this.drawParam.width -= moveX / scaleWidth
				this.drawParam.height -= moveY / scaleHeight
				break

			case "UPPEREDGEOFFIGURE":
				this.drawParam.top += moveY / 2 + moveY / scaleHeight / 2
				this.drawParam.height -= moveY / scaleHeight
				break

			case "UPPERRIGHTCORNER":
				this.drawParam.left += moveX / 2
				this.drawParam.top += moveY / 2 + moveY / scaleHeight / 2
				this.drawParam.width += moveX / scaleWidth
				this.drawParam.height -= moveY / scaleHeight
				break

			case "FIGURERIGHT":
				this.drawParam.left += moveX / 2
				this.drawParam.width += moveX / scaleWidth
				break

			case "LOWERRIGHTCORNER":
				this.drawParam.left += moveX / 2
				this.drawParam.top += moveY / 2 - moveY / scaleHeight / 2
				this.drawParam.width += moveX / scaleWidth
				this.drawParam.height += moveY / scaleHeight
				break

			case "LOWEREDGEOFFIGURE":
				this.drawParam.top += moveY / 2 - moveY / scaleHeight / 2
				this.drawParam.height += moveY / scaleHeight
				break

			case "LOWERLEFTQUARTER":
				this.drawParam.left += moveX / 2
				this.drawParam.top += moveY / 2 - moveY / scaleHeight / 2
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