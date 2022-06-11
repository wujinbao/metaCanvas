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
			this.drawParam.left, 
			this.drawParam.top,
			this.drawParam.width,
			this.drawParam.height
		)
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

		/* 
		* 分析宽度高度变化后，使旋转中心移动之后 left、top 的变化值
		* moveX / scaleWidth 是增加的宽度，实际扩大 moveX / scaleWidth * scaleWidth 即 moveX，那么旋转中心 rotateX 增加 moveX / 2。
		* moveY / scaleHeight 是增加的宽度，实际扩大 moveY / scaleHeight * scaleHeight 即 moveY，那么旋转中心 rotateY 增加 moveY / 2。
		* left 与 旋转中心 rotateX 之间隔 1 / scaleWidth 的距离。
		* top 与 旋转中心 rotateY 之间隔 1 / scaleHeight 的距离。
		*/

		switch (selectorMode) {
			case "LEFTUPPERCORNER":
				this.drawParam.left += moveX / 2 + moveX / scaleWidth / 2				
				this.drawParam.top += moveY / 2 + moveY / scaleHeight / 2
				this.drawParam.width -= moveX / scaleWidth
				this.drawParam.height -= moveY / scaleHeight
				break

			case "UPPEREDGEOFFIGURE":
				this.drawParam.top += moveY / 2 + moveY / scaleHeight / 2
				this.drawParam.height -= moveY / scaleHeight
				break

			case "UPPERRIGHTCORNER":
				this.drawParam.left += moveX / 2 - moveX / scaleWidth / 2				
				this.drawParam.top += moveY / 2 + moveY / scaleHeight / 2
				this.drawParam.width += moveX / scaleWidth
				this.drawParam.height -= moveY / scaleHeight
				break

			case "FIGURERIGHT":
				// this.drawParam.left += moveX / 2 - moveX / scaleWidth / 2				
				this.drawParam.width += moveX / scaleWidth
				break

			case "LOWERRIGHTCORNER":
				this.drawParam.left += moveX / 2 - moveX / scaleWidth / 2				
				this.drawParam.top += moveY / 2 - moveY / scaleHeight / 2
				this.drawParam.width += moveX / scaleWidth
				this.drawParam.height += moveY / scaleHeight
				break

			case "LOWEREDGEOFFIGURE":
				this.drawParam.top += moveY / 2 - moveY / scaleHeight / 2
				this.drawParam.height += moveY / scaleHeight
				break

			case "LOWERLEFTQUARTER":
				this.drawParam.left += moveX / 2 + moveX / scaleWidth / 2				
				this.drawParam.top += moveY / 2 - moveY / scaleHeight / 2
				this.drawParam.width -= moveX / scaleWidth
				this.drawParam.height += moveY / scaleHeight
				break

			case "FIGURELEFT":
				this.drawParam.left += moveX / 2 + moveX / scaleWidth / 2				
				this.drawParam.width -= moveX / scaleWidth
				break
		}
	}
}

export default Rect