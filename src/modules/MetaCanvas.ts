/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import DrawCommon from "./DrawCommon"
import { PartialCanvasParam } from "./Type"
import { SelectorMode } from "./Enum"
import computeMethod from "@/utils/computeMethod"

// 画布类
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Canvas {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    canvasParam: PartialCanvasParam = {
        width: 1000,
        height: 600,
		id: "",
		dom: "",
    }
    drawTargetArray: Array<DrawCommon> = []
    lastX: number = 0
	lastY: number = 0
	delay: number = 1000 / 60
    constructor(canvasParam?: PartialCanvasParam) {
        const canvas = document.createElement('canvas') as HTMLCanvasElement
        const ctx = canvas.getContext('2d')
        canvas.onmousedown = this.onmousedown.bind(this)
		canvas.onmouseup = this.onmouseup.bind(this)
        if (canvasParam) {
            if (!canvasParam.width) {
                canvas.width = this.canvasParam.width as number
            }
            if (!canvasParam.height) {
                canvas.height = this.canvasParam.height as number
            }

            let key: (keyof PartialCanvasParam) // keyof 是索引类型查询操作符
            for (key in canvasParam) {  
                if (key == "width") {                  
                    canvas[key] = canvasParam[key] as number
                } else if (key == "height") {
                    canvas[key] = canvasParam[key] as number
                } else {
					if (key in this.canvasParam) {
                    	this.canvasParam[key] = canvasParam[key]
					}
                }
            }
        } else {
            canvas.width = this.canvasParam.width as number
            canvas.height = this.canvasParam.height as number
        }

		const domNew = this.canvasParam.id ? document.getElementById(this.canvasParam.id) as HTMLElement : this.canvasParam.dom ? this.canvasParam.dom as HTMLElement : document.body as HTMLBodyElement
        domNew.appendChild(canvas)

        if (ctx) {
            this.ctx = ctx
        }
        this.canvas = canvas
    }

    add(drawTargetArray: Array<DrawCommon>) {
		drawTargetArray.map((item) => {
			if (this.drawTargetArray.indexOf(item) == -1) {
				item.draw(this)
				this.drawTargetArray.push(item)
			}
		})

		return this
	}

    remove(drawTargetArray: Array<DrawCommon>) {
		this.ctx.clearRect(0, 0, this.canvasParam.width as number, this.canvasParam.height as number)
		
		const newDrawTargetArray: Array<DrawCommon> = []
		this.drawTargetArray.map((item) => {
			if (drawTargetArray.indexOf(item) == -1) {
				item.draw(this)
				newDrawTargetArray.push(item)
			}
		})

		this.drawTargetArray = newDrawTargetArray

		return this
	}

	renderAll() {
		this.ctx.clearRect(0, 0, this.canvasParam.width as number, this.canvasParam.height as number)
		this.drawTargetArray.map((item) => {
			item.draw(this)
		})
	}

    // todo e 是什么类型
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onmousedown(e: any) {
		this.lastX = e.offsetX
		this.lastY = e.offsetY
		this.drawTargetArray.map((drawTargetItem) => {
			const drawParam = drawTargetItem.drawParam
			if (drawParam.selectable) {
				const vertexMargin: number = drawTargetItem.vertexMargin
				const vertexArray = drawTargetItem.vertexArray
				
				// 保证图形放大、缩小后获取的坐标正确值
				const scaleWidth: number = drawParam.scaleWidth as number
				const scaleHeight: number = drawParam.scaleHeight as number
                const rotateX: number = drawParam.rotateX as number
                const rotateY: number= drawParam.rotateY as number

				// 处理图像旋转后的坐标正确值
				const angle: number = drawParam.angle as number
				const point: Array<number> = computeMethod.rotationPoint(rotateX, rotateY, this.lastX, this.lastY, -angle)
				const resultX: number = (point[0] - rotateX) / scaleWidth + rotateX
				const resultY: number = (point[1] - rotateY) / scaleHeight + rotateY

				// 需注意一下，map 遍历数组无法通过 return 退出循环
				for (let i = 0; i < vertexArray.length; i++) {
					if (resultX >= vertexArray[i][0] - vertexMargin && resultX <= vertexArray[i][0] + vertexMargin && resultY >= vertexArray[i][1] - vertexMargin && resultY <= vertexArray[i][1] + vertexMargin) {
						this.canvas.onmousemove = this.onmousemove.bind(this, drawTargetItem, SelectorMode[i])

						return drawTargetItem
					}
				}

				if (resultX >= vertexArray[0][0] && resultX <= vertexArray[4][0] && resultY >= vertexArray[0][1] && resultY <= vertexArray[4][1]) {
					this.canvas.onmousemove = this.onmousemove.bind(this, drawTargetItem, SelectorMode[9])
				}
			}
		})
	}

	onmouseup() {
		this.canvas.onmousemove = null
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onmousemove(drawTargetItem: DrawCommon, selectorMode: string, e: any) {
		const currentX: number = e.offsetX
		const currentY: number = e.offsetY
		const moveX: number = currentX - this.lastX
		const moveY: number = currentY - this.lastY

		if (selectorMode == "WITHINGRAPHICS") {
			drawTargetItem.translation(moveX, moveY)
		} if (selectorMode == "ROTATIONPOSITION") {
			drawTargetItem.rotate(this.lastX, this.lastY, currentX, currentY)
		} else {
			drawTargetItem.scale(selectorMode, moveX, moveY)
		}

		this.renderAll()

		this.lastX = currentX
		this.lastY = currentY
	}
}

export default Canvas