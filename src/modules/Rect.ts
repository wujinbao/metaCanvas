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

// 矩形类
class Rect extends DrawCommon {
	constructor(drawParam?: PartialDrawParam) {
		super(drawParam)
	}

	privateDraw(ctx: CanvasRenderingContext2D) {
		ctx.rect(
			0, 
			0, 
			this.drawParam.width as number, 
			this.drawParam.height as number
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
			[left, top + height / 2]
		]
	}

	onmousemove(vertexIndex: number, moveX: number, moveY: number) {
		const scaleWidth: number = this.drawParam.scaleWidth as number
		const scaleHeight: number = this.drawParam.scaleHeight as number

		switch (vertexIndex) {
			case 0:
				this.drawParam.left! += moveX
				this.drawParam.top! += moveY
				this.drawParam.width! -= moveX / scaleWidth
				this.drawParam.height! -= moveY / scaleHeight
				break

			case 1:
				this.drawParam.top! += moveY
				this.drawParam.height! -= moveY / scaleHeight
				break

			case 2:
				this.drawParam.top! += moveY
				this.drawParam.width! += moveX / scaleWidth
				this.drawParam.height! -= moveY / scaleHeight
				break

			case 3:
				this.drawParam.width! += moveX / scaleWidth
				break

			case 4:
				this.drawParam.width! += moveX / scaleWidth
				this.drawParam.height! += moveY / scaleHeight
				break

			case 5:
				this.drawParam.height! += moveY / scaleHeight
				break

			case 6:
				this.drawParam.left! += moveX
				this.drawParam.width! -= moveX / scaleWidth
				this.drawParam.height! += moveY / scaleHeight
				break

			case 7:
				this.drawParam.left! += moveX
				this.drawParam.width! -= moveX / scaleWidth
				break
		}
	}
}

export default Rect