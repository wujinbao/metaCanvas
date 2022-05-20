/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import DrawCommon from "./DrawCommon"
import { PartialDrawParam } from "./Type"

// 矩形类
class Rect extends DrawCommon {
	constructor(drawParam?: PartialDrawParam) {
		super(drawParam)
	}

	privateDraw(ctx: CanvasRenderingContext2D) {
		ctx.rect(
			this.drawParam.left - this.drawParam.rotateX, 
			this.drawParam.top - this.drawParam.rotateY,
			this.drawParam.width,
			this.drawParam.height
		)

		this.vertex()
	}

	vertex() {
		const left: number = this.drawParam.left as number
		const top: number = this.drawParam.top as number
		const width: number = this.drawParam.width as number
		const height: number = this.drawParam.height as number

		this.vertexArray = [
			[left, top],
			[left + width / 2, top],
			[left + width, top],
			[left + width, top + height / 2],
			[left + width, top + height],
			[left + width / 2, top + height],
			[left, top + height],
			[left, top + height / 2],
			[left + width / 2, top - this.vertexHeight * 3]
		]
	}

	marginVertex() {
		const left: number = this.drawParam.left as number
		const top: number = this.drawParam.top as number
		const width: number = this.drawParam.width as number
		const height: number = this.drawParam.height as number

		this.marginVertexArray = [
			[left, top],
			[left + width, top],
			[left + width, top + height],
			[left, top + height]
		]
	}

	scale(selectorMode: string, moveX: number, moveY: number) {
		const scaleWidth: number = this.drawParam.scaleWidth as number
		const scaleHeight: number = this.drawParam.scaleHeight as number

		switch (selectorMode) {
			case "LEFTUPPERCORNER":
				this.drawParam.left += moveX
				this.drawParam.top += moveY
				this.drawParam.width -= moveX / scaleWidth
				this.drawParam.height -= moveY / scaleHeight
				break

			case "UPPEREDGEOFFIGURE":
				this.drawParam.top += moveY
				this.drawParam.height -= moveY / scaleHeight
				break

			case "UPPERRIGHTCORNER":
				this.drawParam.top += moveY
				this.drawParam.width += moveX / scaleWidth
				this.drawParam.height -= moveY / scaleHeight
				break

			case "FIGURERIGHT":
				this.drawParam.width += moveX / scaleWidth
				break

			case "LOWERRIGHTCORNER":
				this.drawParam.width += moveX / scaleWidth
				this.drawParam.height += moveY / scaleHeight
				break

			case "LOWEREDGEOFFIGURE":
				this.drawParam.height += moveY / scaleHeight
				break

			case "LOWERLEFTQUARTER":
				this.drawParam.left += moveX
				this.drawParam.width -= moveX / scaleWidth
				this.drawParam.height += moveY / scaleHeight
				break

			case "FIGURELEFT":
				this.drawParam.left += moveX
				this.drawParam.width -= moveX / scaleWidth
				break
		}
	}
}

export default Rect