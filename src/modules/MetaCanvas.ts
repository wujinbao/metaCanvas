/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import DrawCommon from "./DrawCommon"

// 画布配置选项类型描述
type CanvasParam = {
    width: number,
    height: number,
    id: string,
    [attr: string]: any
}

// Partial 变为可选参数
type PartialCanvasParam = Partial<CanvasParam>

// 画布类
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Canvas {
    canvas: HTMLCanvasElement
    ctx!: CanvasRenderingContext2D
    canvasParam: PartialCanvasParam = {
        width: 1000,
        height: 600,
        id: ""
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
                    this.canvasParam[key] = canvasParam[key]
                }
            }
        } else {
            canvas.width = this.canvasParam.width as number
            canvas.height = this.canvasParam.height as number
        }
        // todo id 获取元素问题待解决
        // if (this.canvasParam.id) {
        //     const dom = document.getElementById(this.canvasParam.id) as HTMLCanvasElement
        //     dom.appendChild(canvas)
        // } else {
        //     const body = document.body as HTMLCanvasElement
        //     body.appendChild(canvas)
        // }
        const body = document.body as HTMLCanvasElement
        body.appendChild(canvas)
        
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
				const vertexWidth: number = drawTargetItem.vertexWidth
				const vertexHeight: number = drawTargetItem.vertexHeight
				const vertexArray = drawTargetItem.vertexArray
				
				// 保证图形放大、缩小后获取的坐标正确值
				const scaleWidth: number = drawParam.scaleWidth as number
				const scaleHeight: number = drawParam.scaleHeight as number
                const left: number = drawParam.left as number
                const top: number= drawParam.top as number
				const resultX: number = (this.lastX - left) / scaleWidth + left
				const resultY: number = (this.lastY - top) / scaleHeight + top

				const angle: number = drawParam.angle as number * 180 / Math.PI
				// todo 旋转问题
				// let point: Array<number> = this.rotatePoint(drawParam.left, drawParam.top, resultX, resultY, -angle)

				// 需注意一下，map 遍历数组无法通过 return 退出循环
				for (let i = 0; i < vertexArray.length; i++) {
					if (resultX >= vertexArray[i][0] - vertexWidth && resultX <= vertexArray[i][0] + vertexWidth && resultY >= vertexArray[i][1] - vertexHeight && resultY <= vertexArray[i][1] + vertexHeight) {
						this.canvas.onmousemove = this.throttle(this.onmousemove.bind(this, drawTargetItem, i), this.delay)

						return drawTargetItem
					}
				}

				if (resultX >= vertexArray[0][0] && resultX <= vertexArray[4][0] && resultY >= vertexArray[0][1] && resultY <= vertexArray[4][1]) {
					this.canvas.onmousemove = this.throttle(this.onmousemove.bind(this, drawTargetItem, 9), this.delay)
				}
			}
		})
	}

	onmouseup() {
		this.canvas.onmousemove = null
	}

	onmousemove(drawTargetItem: DrawCommon, vertexIndex: number, e: any) {
		const currentX: number = e.offsetX
		const currentY: number = e.offsetY
		const moveX: number = currentX - this.lastX
		const moveY: number = currentY - this.lastY

		if (vertexIndex == 9) {
			drawTargetItem.drawParam.left! += moveX
			drawTargetItem.drawParam.top! += moveY
		} else {
			drawTargetItem.onmousemove(vertexIndex, moveX, moveY)
		}

		this.renderAll()

		this.lastX = currentX
		this.lastY = currentY
	}

	// 节流，在一定时间内只执行一次
	// eslint-disable-next-line @typescript-eslint/ban-types
	throttle(fn: Function, delay: number) {
		let flag: boolean = true
    	return function () {
        	if (!flag) return
        	flag = false
        	setTimeout(() => {
            	fn()
            	flag = true
        	}, delay)
    	}
	}

	rotatePoint(centerX: number, centerY: number, startX: number, startY: number, angle: number) {
		const endX: number = Math.round(centerX + (startX - centerX) * Math.cos(angle * Math.PI / 180) + (centerY - startY) * Math.sin(angle * Math.PI / 180))
		const endY: number = Math.round(centerY + (startX - centerX) * Math.sin(angle * Math.PI / 180) - (centerY - startY) * Math.cos(angle * Math.PI / 180))
		const point: Array<number> = [endX, endY]
		return point
	}
}

export default Canvas