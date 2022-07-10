/* eslint-disable prettier/prettier */
import computeMethod from "@/utils/computeMethod"
const vertexMargin = 10
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function vertex(minX: number, minY: number, maxX: number, maxY: number) {
    let vertexArray: Array<[number, number]> = []
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return vertexArray = [
        [minX, minY],
        [(minX + maxX) / 2, minY],
        [maxX, minY],
        [maxX, (minY + maxY) / 2],
        [maxX, maxY],
        [(minX + maxX) / 2, maxY],
        [minX, maxY],
        [minX, (minY + maxY) / 2],
        [(minX + maxX) / 2, minY - vertexMargin * 2]
    ]
}

// 图形选择器 - 根据顶点绘制
function vertexDraw(ctx: CanvasRenderingContext2D, vertexArray: Array<[number, number]>) {
    ctx.save()
    ctx.lineCap = 'butt'
    ctx.lineJoin = 'miter'
    ctx.lineWidth = 1
    ctx.miterLimit = 10
    ctx.globalAlpha = 0.5
    ctx.globalCompositeOperation = 'source-over'
    ctx.strokeStyle = '#00a7d0'
    ctx.fillStyle = '#00a7d0'
    ctx.beginPath()
    ctx.moveTo(vertexArray[1][0], vertexArray[1][1])
	ctx.lineTo(vertexArray[8][0], vertexArray[8][1] + vertexMargin / 2)
    ctx.strokeRect(vertexArray[0][0], vertexArray[0][1], vertexArray[2][0] - vertexArray[0][0], vertexArray[4][1] - vertexArray[0][1])
    vertexArray.map((item) => {
        ctx.fillRect(item[0] - vertexMargin / 2, item[1] - vertexMargin / 2, vertexMargin, vertexMargin)
    })
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
}

function vertexWithin(pointX: number, pointY: number, selectAllVertex: Array<number>) {
    if (pointX >= selectAllVertex[0] - vertexMargin / 2 && pointX <= selectAllVertex[0] + vertexMargin / 2 && pointY >= selectAllVertex[1] - vertexMargin / 2 && pointY <= selectAllVertex[1] + vertexMargin / 2) {
        return true
    }
}

function rectWithin(pointX: number, pointY: number, rectVertex: Array<number>) {
    if (pointX >= rectVertex[0] && pointX >= rectVertex[1] && pointY <= rectVertex[2] && pointY <= rectVertex[3]) {
        return true
    }
}

function marginRectDraw(ctx: CanvasRenderingContext2D, marginParamArray: Array<number>, vertexArray: Array<[number, number]>, marginRotateX: number, marginRotateY: number, marginAngle: number) {
    // console.log(marginParamArray, marginRotateX, marginRotateY, marginAngle)
    ctx.save()
    if (marginAngle !== 0) {
        ctx.translate(marginRotateX, marginRotateY)
        ctx.rotate(marginAngle * Math.PI / 180)
        ctx.translate(-marginRotateX, -marginRotateY)
    }
    ctx.strokeStyle = "blue"
	ctx.strokeRect(marginParamArray[0], marginParamArray[1], marginParamArray[2] - marginParamArray[0], marginParamArray[3] - marginParamArray[1])
    
    this.vertexDraw(ctx, vertexArray)
    
    ctx.restore()
}

function marginTranslation(moveX: number, moveY: number, marginParamArray: Array<number>) {
    marginParamArray[0] += moveX
    marginParamArray[1] += moveY
	marginParamArray[2] += moveX
    marginParamArray[3] += moveY
}

function rotateCoordinates(marginRotateX: number, marginRotateY: number, marginParamArray: Array<number>) {
    marginRotateX = (marginParamArray[2] - marginParamArray[0]) / 2
	marginRotateY = (marginParamArray[3] - marginParamArray[1]) / 2
}

function marginRotate(selectAllMarginRotateX: number, selectAllMarginRotateY: number, startX: number, startY: number, endX: number, endY: number) {
    const rotationAngle: number = computeMethod.rotationAngle(selectAllMarginRotateX, selectAllMarginRotateY, startX, startY, endX, endY)
    return rotationAngle
}

function marginScale(selectorMode: string, moveX: number, moveY: number, marginParamArray: Array<number>) {
    switch (selectorMode) {
        case "LEFTUPPERCORNER":
            marginParamArray[0] += moveX
            marginParamArray[1] += moveY
            break

        case "UPPEREDGEOFFIGURE":
            marginParamArray[1] += moveY
            break

        case "UPPERRIGHTCORNER":
            marginParamArray[2] += moveX
            marginParamArray[1] += moveY
            break

        case "FIGURERIGHT":
            marginParamArray[2] += moveX
            break

        case "LOWERRIGHTCORNER":
            marginParamArray[2] += moveX
            marginParamArray[3] += moveY
            break

        case "LOWEREDGEOFFIGURE":
            marginParamArray[3] += moveY
            break

        case "LOWERLEFTQUARTER":
            marginParamArray[0] += moveX
            marginParamArray[3] += moveY
            break

        case "FIGURELEFT":
            marginParamArray[0] += moveX
            break
    }
}

export default {
    vertexMargin,
    vertex,
    vertexDraw,
    vertexWithin,
    rectWithin,
    marginTranslation,
    rotateCoordinates,
    marginRotate,
    marginScale,
    marginRectDraw
}

export {
    vertexMargin,
    vertex,
    vertexDraw,
    vertexWithin,
    rectWithin,
    marginTranslation,
    rotateCoordinates,
    marginRotate,
    marginScale,
    marginRectDraw
}