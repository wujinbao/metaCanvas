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
		// this.rotationPoint()
		this.marginVertex()
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
			[left + width / 2, top - this.vertexMargin * 2]
		]
	}

	marginVertex() {
		const left: number = this.drawParam.left as number
		const top: number = this.drawParam.top as number
		const rotateX: number = this.drawParam.rotateX
		const rotateY: number = this.drawParam.rotateY
		const scaleWidth: number = this.drawParam.scaleWidth as number
		const scaleHeight: number = this.drawParam.scaleHeight as number
		const width: number = this.drawParam.width
		const height:number = this.drawParam.height

		this.marginVertexArray = [
			[rotateX - (rotateX - left) * scaleWidth, rotateY - (rotateY - top) * scaleHeight],
			[width * scaleWidth + rotateX - (rotateX - left) * scaleWidth, rotateY - (rotateY - top) * scaleHeight],
			[width * scaleWidth + rotateX - (rotateX - left) * scaleWidth, height * scaleHeight + rotateY - (rotateY - top) * scaleHeight],
			[rotateX - (rotateX - left) * scaleWidth, height * scaleHeight + rotateY - (rotateY - top) * scaleHeight]
		]

		this.marginParam()
	}

	scale(selectorMode: string, moveX: number, moveY: number) {
		const scaleWidth: number = this.drawParam.scaleWidth as number
		const scaleHeight: number = this.drawParam.scaleHeight as number

		/* 
		* 处理旋转中心移动后 left、top 的变化值
		* moveX / scaleWidth / 2 是旋转中心的横向变量值，除以 scaleWidth 即为一份变量值，那么 left 移动的变量值为一份变量值乘以 scaleWidth - 1
		* moveY / scaleHeight / 2 是旋转中心的纵向变量值，除以 scaleHeight 即为一份变量值，那么 top 移动的变量值为一份变量值乘以 scaleHeight - 1
		*/
		const variableX: number = moveX / scaleWidth / 2 / scaleWidth * (scaleWidth - 1)
		const variableY: number = moveY / scaleHeight / 2 / scaleHeight * (scaleHeight - 1)

		switch (selectorMode) {
			case "LEFTUPPERCORNER":
				this.drawParam.left += moveX / scaleWidth + variableX
				this.drawParam.rotateX += moveX / scaleWidth / 2
				this.drawParam.top += moveY / scaleHeight + variableY
				this.drawParam.rotateY += moveY / scaleHeight / 2
				this.drawParam.width -= moveX / scaleWidth
				this.drawParam.height -= moveY / scaleHeight
				break

			case "UPPEREDGEOFFIGURE":
				this.drawParam.top += moveY / scaleHeight + variableY
				this.drawParam.rotateY += moveY / scaleHeight / 2
				this.drawParam.height -= moveY / scaleHeight
				break

			case "UPPERRIGHTCORNER":
				this.drawParam.top += moveY / scaleHeight + variableY
				this.drawParam.rotateY += moveY / scaleHeight / 2
				this.drawParam.width += moveX / scaleWidth
				this.drawParam.height -= moveY / scaleHeight
				break

			case "FIGURERIGHT":
				this.drawParam.left += variableX
				this.drawParam.rotateX += moveX / scaleWidth / 2
				this.drawParam.width += moveX / scaleWidth
				break

			case "LOWERRIGHTCORNER":
				this.drawParam.left += variableX
				this.drawParam.rotateX += moveX / scaleWidth / 2
				this.drawParam.top += variableY
				this.drawParam.rotateY += moveY / scaleHeight / 2
				this.drawParam.width += moveX / scaleWidth
				this.drawParam.height += moveY / scaleHeight
				break

			case "LOWEREDGEOFFIGURE":
				this.drawParam.top += variableY
				this.drawParam.rotateY += moveY / scaleHeight / 2
				this.drawParam.height += moveY / scaleHeight
				break

			case "LOWERLEFTQUARTER":
				this.drawParam.left += moveX / scaleWidth + variableX
				this.drawParam.rotateX += moveX / scaleWidth / 2
				this.drawParam.width -= moveX / scaleWidth
				this.drawParam.height += moveY / scaleHeight
				break

			case "FIGURELEFT":
				this.drawParam.left += moveX / scaleWidth + variableX
				this.drawParam.rotateX += moveX / scaleWidth / 2
				this.drawParam.width -= moveX / scaleWidth
				break
		}
	}
}

export default Rect