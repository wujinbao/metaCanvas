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

// 圆形类
class Circle extends DrawCommon {
	constructor(drawParam?: PartialDrawParam) {
		super(drawParam)
	}

	privateDraw(ctx: CanvasRenderingContext2D) {
		ctx.arc(
			0, 
			0, 
			this.drawParam.radius!, 
			this.drawParam.sAngle! * Math.PI,
			this.drawParam.eAngle! * Math.PI,
			this.drawParam.counterclockwise!
		)

		this.vertex()
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
			[left - radius, top]
		]
	}

	onmousemove(vertexIndex: number, moveX: number, moveY: number) {
		const radius: number = this.drawParam.radius as number

		switch (vertexIndex) {
			case 0:
				this.drawParam.left! += moveX
				this.drawParam.top!+= moveY
				this.drawParam.scaleWidth! -= moveX / radius
				this.drawParam.scaleHeight! -= moveY / radius
				break

			case 1:
				this.drawParam.top! += moveY
				this.drawParam.scaleHeigh! -= moveY / radius
				break

			case 2:
				this.drawParam.left! += moveX
				this.drawParam.top! += moveY
				this.drawParam.scaleWidth! += moveX / radius
				this.drawParam.scaleHeight! -= moveY / radius
				break

			case 3:
				this.drawParam.left! += moveX
				this.drawParam.scaleWidth! += moveX / radius
				break

			case 4:
				this.drawParam.left! += moveX
				this.drawParam.top! += moveY
				this.drawParam.scaleWidth! += moveX / radius
				this.drawParam.scaleHeight! += moveY / radius
				break

			case 5:
				this.drawParam.top! += moveY
				this.drawParam.scaleHeight! += moveY / radius
				break

			case 6:
				this.drawParam.left! += moveX
				this.drawParam.top! += moveY
				this.drawParam.scaleWidth! -= moveX / radius
				this.drawParam.scaleHeight! += moveY / radius
				break

			case 7:
				this.drawParam.left! += moveX
				this.drawParam.scaleWidth! -= moveX / radius
				break
		}
	}
}

export default Circle