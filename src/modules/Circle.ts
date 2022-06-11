/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import DrawCommon from "./DrawCommon"
import { PartialDrawParam } from "./Type"

// 圆形类
class Circle extends DrawCommon {
	constructor(drawParam?: PartialDrawParam) {
		super(drawParam)
	}

	privateDraw(ctx: CanvasRenderingContext2D) {
		ctx.arc(
			this.drawParam.left, 
			this.drawParam.top, 
			this.drawParam.radius, 
			this.drawParam.sAngle * Math.PI,
			this.drawParam.eAngle * Math.PI,
			this.drawParam.counterclockwise
		)

		this.vertex()
		this.marginVertex()
	}

	vertex() {
		const left: number = this.drawParam.left as number
		const top: number = this.drawParam.top as number
		const radius: number = this.drawParam.radius as number

		this.vertexArray = [
			[left - radius, top - radius],
			[left, top - radius],
			[left + radius, top - radius],
			[left + radius, top],
			[left + radius, top + radius],
			[left, top + radius],
			[left - radius, top + radius],
			[left - radius, top],
			[left, top - radius - this.vertexMargin * 2]
		]
	}

	marginVertex() {
		const rotateX: number = this.drawParam.rotateX
		const rotateY: number = this.drawParam.rotateY
		const scaleWidth: number = this.drawParam.scaleWidth as number
		const scaleHeight: number = this.drawParam.scaleHeight as number
		const radius: number = this.drawParam.radius as number

		this.marginVertexArray = [
			[rotateX - radius * scaleWidth, rotateY - radius * scaleHeight],
			[rotateX + radius * scaleWidth, rotateY - radius * scaleHeight],
			[rotateX + radius * scaleWidth, rotateY + radius * scaleHeight],
			[rotateX - radius * scaleWidth, rotateY + radius * scaleHeight],
		]

		this.marginParam()
	}

	scale(selectorMode: string, moveX: number, moveY: number) {
		const scaleWidth: number = this.drawParam.scaleWidth as number
		const scaleHeight: number = this.drawParam.scaleHeight as number
		const radius: number = this.drawParam.radius as number

		// 是否正比例 positiveScaling 放大缩小
		const ratio: number = scaleHeight / scaleWidth
		moveY = this.drawParam.positiveScaling ? moveX * moveY <= 0 ? -moveX * ratio : moveX * ratio : moveY

		switch (selectorMode) {
			case "LEFTUPPERCORNER":
				this.drawParam.left += moveX / 2
				this.drawParam.rotateX += moveX / 2
				this.drawParam.top += moveY / 2
				this.drawParam.rotateY += moveY / 2
				this.drawParam.scaleWidth -= moveX / 2 / radius
				this.drawParam.scaleHeight -= moveY / 2 / radius
				break

			case "UPPEREDGEOFFIGURE":
				this.drawParam.top += moveY / 2
				this.drawParam.rotateY += moveY / 2
				this.drawParam.scaleHeight -= moveY / 2 / radius
				break

			case "UPPERRIGHTCORNER":
				this.drawParam.left += moveX / 2
				this.drawParam.rotateX += moveX / 2
				this.drawParam.top += moveY / 2
				this.drawParam.rotateY += moveY / 2
				this.drawParam.scaleWidth += moveX / 2 / radius
				this.drawParam.scaleHeight -= moveY / 2 / radius
				break

			case "FIGURERIGHT":
				this.drawParam.left += moveX / 2
				this.drawParam.rotateX += moveX / 2
				this.drawParam.scaleWidth += moveX / 2 / radius
				break

			case "LOWERRIGHTCORNER":
				this.drawParam.left += moveX / 2
				this.drawParam.rotateX += moveX / 2
				this.drawParam.top += moveY / 2
				this.drawParam.rotateY += moveY / 2
				this.drawParam.scaleWidth += moveX / 2 / radius
				this.drawParam.scaleHeight += moveY / 2 / radius
				break

			case "LOWEREDGEOFFIGURE":
				this.drawParam.top += moveY / 2
				this.drawParam.rotateY += moveY / 2
				this.drawParam.scaleHeight += moveY / 2 / radius
				break

			case "LOWERLEFTQUARTER":
				this.drawParam.left += moveX / 2
				this.drawParam.rotateX += moveX / 2
				this.drawParam.top += moveY / 2
				this.drawParam.rotateY += moveY / 2
				this.drawParam.scaleWidth -= moveX / 2 / radius
				this.drawParam.scaleHeight += moveY / 2 / radius
				break

			case "FIGURELEFT":
				this.drawParam.left += moveX / 2
				this.drawParam.rotateX += moveX / 2
				this.drawParam.scaleWidth -= moveX / 2 / radius
				break
		}
	}
}

export default Circle