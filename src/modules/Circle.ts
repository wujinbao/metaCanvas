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
			this.drawParam.left - this.drawParam.rotateX, 
			this.drawParam.top - this.drawParam.rotateY, 
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
		const left: number = this.drawParam.left as number
		const top: number = this.drawParam.top as number
		// 保证图形放大、缩小后获取的坐标正确值
		const scaleWidth: number = this.drawParam.scaleWidth as number
		const scaleHeight: number = this.drawParam.scaleHeight as number
		const radius: number = this.drawParam.radius as number

		this.marginVertexArray = [
			[left - radius - radius* (scaleWidth - 1), top - radius - radius* (scaleHeight - 1)],
			[left + radius + radius* (scaleWidth - 1), top - radius - radius* (scaleHeight - 1)],
			[left + radius + radius* (scaleWidth - 1), top + radius + radius* (scaleHeight - 1)],
			[left - radius - radius* (scaleWidth - 1), top + radius + radius* (scaleHeight - 1)],
		]

		this.marginParam()
	}

	scale(selectorMode: string, moveX: number, moveY: number) {
		const radius: number = this.drawParam.radius as number

		switch (selectorMode) {
			case "LEFTUPPERCORNER":
				this.drawParam.left += moveX / radius
				this.drawParam.top += moveY / radius
				this.drawParam.scaleWidth -= moveX / radius
				this.drawParam.scaleHeight -= moveY / radius
				break

			case "UPPEREDGEOFFIGURE":
				this.drawParam.top += moveY / radius
				this.drawParam.scaleHeight -= moveY / radius
				break

			case "UPPERRIGHTCORNER":
				this.drawParam.left += moveX / radius
				this.drawParam.top += moveY / radius
				this.drawParam.scaleWidth += moveX / radius
				this.drawParam.scaleHeight -= moveY / radius
				break

			case "FIGURERIGHT":
				this.drawParam.left += moveX / radius
				this.drawParam.scaleWidth += moveX / radius
				break

			case "LOWERRIGHTCORNER":
				this.drawParam.left += moveX / radius
				this.drawParam.top += moveY / radius
				this.drawParam.scaleWidth += moveX / radius
				this.drawParam.scaleHeight += moveY / radius
				break

			case "LOWEREDGEOFFIGURE":
				this.drawParam.top += moveY / radius
				this.drawParam.scaleHeight += moveY / radius
				break

			case "LOWERLEFTQUARTER":
				this.drawParam.left += moveX / radius
				this.drawParam.top += moveY / radius
				this.drawParam.scaleWidth -= moveX / radius
				this.drawParam.scaleHeight += moveY / radius
				break

			case "FIGURELEFT":
				this.drawParam.left += moveX / radius
				this.drawParam.scaleWidth -= moveX / radius
				break
		}
	}
}

export default Circle