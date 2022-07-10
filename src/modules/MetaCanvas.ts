/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import DrawCommon from "./DrawCommon"
import { PartialCanvasParam } from "./Type"
import { SelectorMode } from "./Enum"
import computeMethod from "@/utils/computeMethod"
import frame from "@/utils/frame"

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
    startX: number = 0
	startY: number = 0
	delay: number = 1000 / 60
	selectAllState: boolean = false
	selectAllDrawArray: Array<DrawCommon> = []
	selectAllMarginParamArray: Array<number> = []
	selectAllMarginRotateX: number = 0
	selectAllMarginRotateY: number = 0
	selectAllMarginAngle: number = 0
	selectAllVertexArray: Array<[number, number]> = []
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
		this.startX = e.offsetX
		this.startY = e.offsetY

		if (this.selectAllState) {
			const angle: number = this.selectAllMarginAngle as number
			const point: Array<number> = computeMethod.rotationPoint(this.selectAllMarginRotateX, this.selectAllMarginRotateY, this.startX, this.startY, -angle)

			for (let i = 0; i < this.selectAllVertexArray.length; i++) {
				if (frame.vertexWithin(point[0], point[1], this.selectAllVertexArray[i])) {
					this.canvas.onmousemove = this.selectAllOnmousemove.bind(this, SelectorMode[i])
					return
				}
			}

			if (frame.rectWithin(point[0], point[1], this.selectAllMarginParamArray)) {
				this.canvas.onmousemove = this.selectAllOnmousemove.bind(this, SelectorMode[9])
				return
			}
		}

		this.drawTargetArray.map((drawTargetItem) => {
			const drawParam = drawTargetItem.drawParam
			const vertexMargin: number = drawTargetItem.vertexMargin
			const vertexArray = drawTargetItem.vertexArray

			// 保证图形放大、缩小后获取的坐标正确值
			const scaleWidth: number = drawParam.scaleWidth as number
			const scaleHeight: number = drawParam.scaleHeight as number
			const rotateX: number = drawParam.rotateX as number
			const rotateY: number = drawParam.rotateY as number

			// 处理图像旋转后的坐标正确值
			const angle: number = drawParam.angle as number
			const point: Array<number> = computeMethod.rotationPoint(rotateX, rotateY, this.startX, this.startY, -angle)
			const resultX: number = (point[0] - rotateX) / scaleWidth + rotateX
			const resultY: number = (point[1] - rotateY) / scaleHeight + rotateY

			if (drawTargetItem.drawParam.selectable) {
				drawTargetItem.drawParam.selectable = false
			}

			// 需注意一下，map 遍历数组无法通过 return 退出循环
			for (let i = 0; i < vertexArray.length; i++) {
				if (!drawParam.positiveScaling || i % 2 == 0) {
					if (resultX >= vertexArray[i][0] - vertexMargin / 2 && resultX <= vertexArray[i][0] + vertexMargin / 2 && resultY >= vertexArray[i][1] - vertexMargin / 2 && resultY <= vertexArray[i][1] + vertexMargin / 2) {
						drawTargetItem.drawParam.selectable = true
						this.renderAll()
						this.canvas.onmousemove = this.onmousemove.bind(this, drawTargetItem, SelectorMode[i])
						return drawTargetItem
					}
				}
			}

			if (resultX >= vertexArray[0][0] && resultX <= vertexArray[4][0] && resultY >= vertexArray[0][1] && resultY <= vertexArray[4][1]) {
				drawTargetItem.drawParam.selectable = true
				this.renderAll()
				this.canvas.onmousemove = this.onmousemove.bind(this, drawTargetItem, SelectorMode[9])
				return drawTargetItem
			}

			if (this.selectAllState) {
				this.selectAllState = false
				this.selectAllMarginParamArray = []
				this.selectAllDrawArray = []
			}

			this.renderAll()
		})
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onmouseup(e: any) {
		this.canvas.onmousemove = null
		
		if (this.selectAllState) return
		const endX: number = e.offsetX
		const endY: number = e.offsetY

		if (this.startX == endX && this.startY == endY) return

		let minX: number = 0
		let minY: number = 0
		let maxX: number = 0
		let maxY: number = 0

		if (this.startX > endX) {
			minX = endX
			maxX = this.startX
		} else {
			minX = this.startX
			maxX = endX
		}

		if (this.startY > endY) {
			minY = endY
			maxY = this.startY
		} else {
			minY = this.startY
			maxY = endY
		}

		let marginParamArray: Array<number> = []
		marginParamArray = [minX, minY, maxX, maxY]

		this.drawTargetArray.map((drawTargetItem) => {
			if (marginParamArray[0] < drawTargetItem.marginParamArray[2] && marginParamArray[2] > drawTargetItem.marginParamArray[0] && marginParamArray[1] < drawTargetItem.marginParamArray[3] && marginParamArray[3] > drawTargetItem.marginParamArray[1]) {
				this.selectAllDrawArray.push(drawTargetItem)
				if (!this.selectAllState) {
					this.selectAllMarginParamArray = drawTargetItem.marginParamArray

					this.selectAllState = true
				} else {
					this.selectAllMarginParamArray[0] = drawTargetItem.marginParamArray[0] < this.selectAllMarginParamArray[0] ? drawTargetItem.marginParamArray[0] : this.selectAllMarginParamArray[0]
					this.selectAllMarginParamArray[1] = drawTargetItem.marginParamArray[1] < this.selectAllMarginParamArray[1] ? drawTargetItem.marginParamArray[1] : this.selectAllMarginParamArray[1]
					this.selectAllMarginParamArray[2] = drawTargetItem.marginParamArray[2] > this.selectAllMarginParamArray[2] ? drawTargetItem.marginParamArray[2] : this.selectAllMarginParamArray[2]
					this.selectAllMarginParamArray[3] = drawTargetItem.marginParamArray[3] > this.selectAllMarginParamArray[3] ? drawTargetItem.marginParamArray[3] : this.selectAllMarginParamArray[3]
				}
			}
		})

		this.selectAllVertexArray = frame.vertex(this.selectAllMarginParamArray[0], this.selectAllMarginParamArray[1], this.selectAllMarginParamArray[2], this.selectAllMarginParamArray[3])
		this.selectAllMarginRotateX = (this.selectAllMarginParamArray[2] + this.selectAllMarginParamArray[0]) / 2
		this.selectAllMarginRotateY = (this.selectAllMarginParamArray[3] + this.selectAllMarginParamArray[1]) / 2
		frame.marginRectDraw(this.ctx, this.selectAllMarginParamArray, this.selectAllVertexArray, this.selectAllMarginRotateX, this.selectAllMarginRotateY, this.selectAllMarginAngle)
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onmousemove(drawTargetItem: DrawCommon, selectorMode: string, e: any) {
		const currentX: number = e.offsetX
		const currentY: number = e.offsetY
		const moveX: number = currentX - this.startX
		const moveY: number = currentY - this.startY

		if (selectorMode == "WITHINGRAPHICS") {
			drawTargetItem.translation(moveX, moveY)
		} else if (selectorMode == "ROTATIONPOSITION") {
			drawTargetItem.rotate(this.startX, this.startY, currentX, currentY)
		} else {
			drawTargetItem.scale(selectorMode, moveX, moveY)
		}

		this.renderAll()

		this.startX = currentX
		this.startY = currentY
	}

	selectAllOnmousemove(selectorMode: string, e: any) {
		const currentX: number = e.offsetX
		const currentY: number = e.offsetY
		const moveX: number = currentX - this.startX
		const moveY: number = currentY - this.startY
		const selectAllDrawArray: Array<DrawCommon> = this.selectAllDrawArray
		const scaleX = moveX / (this.selectAllMarginParamArray[2] - this.selectAllMarginParamArray[0])
		const scaleY = moveY / (this.selectAllMarginParamArray[3] - this.selectAllMarginParamArray[1])

		if (selectorMode == "WITHINGRAPHICS") {
			for (let i = 0; i < selectAllDrawArray.length; i++) {
				selectAllDrawArray[i].translation(moveX, moveY)
			}
			frame.marginTranslation(moveX, moveY, this.selectAllMarginParamArray)
		} else if (selectorMode == "ROTATIONPOSITION") {
			const rotationAngle: number = frame.marginRotate(this.selectAllMarginRotateX, this.selectAllMarginRotateY, this.startX, this.startY, currentX, currentY)
			for (let i = 0; i < selectAllDrawArray.length; i++) {
				selectAllDrawArray[i].drawParam.angle -= rotationAngle
				selectAllDrawArray[i].drawParam.rotateX = this.selectAllMarginRotateX
				selectAllDrawArray[i].drawParam.rotateY = this.selectAllMarginRotateY
			}
			
			this.selectAllMarginAngle -= rotationAngle
		} else {
			for (let i = 0; i < selectAllDrawArray.length; i++) {
				switch (selectorMode) {
					case "LEFTUPPERCORNER":
						selectAllDrawArray[i].translation(scaleX * (this.selectAllMarginParamArray[2] - selectAllDrawArray[i].marginParamArray[2]), scaleY * (this.selectAllMarginParamArray[3] - selectAllDrawArray[i].marginParamArray[3]))
						break
		
					case "UPPEREDGEOFFIGURE":
						selectAllDrawArray[i].translation(0, scaleY * (this.selectAllMarginParamArray[3] - selectAllDrawArray[i].marginParamArray[3]))
						break
		
					case "UPPERRIGHTCORNER":
						selectAllDrawArray[i].translation(scaleX * (selectAllDrawArray[i].marginParamArray[0] - this.selectAllMarginParamArray[0]), scaleY * (this.selectAllMarginParamArray[3] - selectAllDrawArray[i].marginParamArray[3]))
						break
		
					case "FIGURERIGHT":
						selectAllDrawArray[i].translation(scaleX * (selectAllDrawArray[i].marginParamArray[0] - this.selectAllMarginParamArray[0]), 0)
						break
		
					case "LOWERRIGHTCORNER":
						selectAllDrawArray[i].translation(scaleX * (selectAllDrawArray[i].marginParamArray[0] - this.selectAllMarginParamArray[0]), scaleY * (selectAllDrawArray[i].marginParamArray[1] - this.selectAllMarginParamArray[1]))
						break
		
					case "LOWEREDGEOFFIGURE":
						selectAllDrawArray[i].translation(0, scaleY * (selectAllDrawArray[i].marginParamArray[1] - this.selectAllMarginParamArray[1]))
						break
		
					case "LOWERLEFTQUARTER":
						selectAllDrawArray[i].translation(scaleX * (this.selectAllMarginParamArray[2] - selectAllDrawArray[i].marginParamArray[2]), scaleY * (selectAllDrawArray[i].marginParamArray[1] - this.selectAllMarginParamArray[1]))
						break
		
					case "FIGURELEFT":
						selectAllDrawArray[i].translation(scaleX * (this.selectAllMarginParamArray[2] - selectAllDrawArray[i].marginParamArray[2]), 0)
						break
				}
				selectAllDrawArray[i].scale(selectorMode, scaleX * (selectAllDrawArray[i].marginParamArray[2] - selectAllDrawArray[i].marginParamArray[0]), scaleY * (selectAllDrawArray[i].marginParamArray[3] - selectAllDrawArray[i].marginParamArray[1]))
			}
			frame.marginScale(selectorMode, moveX, moveY, this.selectAllMarginParamArray)
		}

		this.renderAll()

		this.selectAllVertexArray = frame.vertex(this.selectAllMarginParamArray[0], this.selectAllMarginParamArray[1], this.selectAllMarginParamArray[2], this.selectAllMarginParamArray[3])
		this.selectAllMarginRotateX = (this.selectAllMarginParamArray[2] + this.selectAllMarginParamArray[0]) / 2
		this.selectAllMarginRotateY = (this.selectAllMarginParamArray[3] + this.selectAllMarginParamArray[1]) / 2
		frame.marginRectDraw(this.ctx, this.selectAllMarginParamArray, this.selectAllVertexArray, this.selectAllMarginRotateX, this.selectAllMarginRotateY, this.selectAllMarginAngle)

		this.startX = currentX
		this.startY = currentY
	}
}

export default Canvas