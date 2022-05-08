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
		ctx.moveTo(0, 0)
		ctx.lineTo(this.drawParam.width! / 2, this.drawParam.height!)
		ctx.lineTo(-this.drawParam.width! / 2, this.drawParam.height!)
		ctx.closePath()

		this.vertex()
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
			[left - width / 2, top + height / 2]
		]
	}

	onmousemove(vertexIndex: number, moveX: number, moveY: number) {
		const scaleWidth: number = this.drawParam.scaleWidth as number
		const scaleHeight: number = this.drawParam.scaleHeight as number

		switch (vertexIndex) {
			case 0:
				this.drawParam.left! += moveX / 2
				this.drawParam.top! += moveY
				this.drawParam.width! -= moveX / scaleWidth
				this.drawParam.height! -= moveY / scaleHeight
				break

			case 1:
				this.drawParam.top! += moveY
				this.drawParam.height! -= moveY / scaleHeight
				break

			case 2:
				this.drawParam.left! += moveX / 2
				this.drawParam.top! += moveY
				this.drawParam.width! += moveX / scaleWidth
				this.drawParam.height! -= moveY / scaleHeight
				break

			case 3:
				this.drawParam.left! += moveX / 2
				this.drawParam.width! += moveX / scaleWidth
				break

			case 4:
				this.drawParam.left! += moveX / 2
				this.drawParam.width! += moveX / scaleWidth
				this.drawParam.height! += moveY / scaleHeight
				break

			case 5:
				this.drawParam.height! += moveY / scaleHeight
				break

			case 6:
				this.drawParam.left! += moveX / 2
				this.drawParam.width! -= moveX / scaleWidth
				this.drawParam.height! += moveY / scaleHeight
				break

			case 7:
				this.drawParam.left! += moveX / 2
				this.drawParam.width! -= moveX / scaleWidth
				break
		}
	}
}

export default Triangle