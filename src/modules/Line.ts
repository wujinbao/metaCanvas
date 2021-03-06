/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import DrawCommon from "./DrawCommon"
import { PartialDrawParam } from "./Type"

// 线型类
class Line extends DrawCommon {
	constructor(drawParam?: PartialDrawParam) {
		super(drawParam)
	}

	privateDraw(ctx: CanvasRenderingContext2D) {
		ctx.moveTo(this.drawParam.left - this.drawParam.rotateX, this.drawParam.top - this.drawParam.rotateY)
		this.drawParam.dotArray.map((item) => {
			ctx.lineTo(item[0], item[1])
		})
	}
}

export default Line