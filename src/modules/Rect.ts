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