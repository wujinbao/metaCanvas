/* eslint-disable prettier/prettier */

import { GlobalCompositeOperation } from "./Enum"

// 画布配置选项类型描述
type CanvasParam = {
    width: number,
    height: number,
    id: string,
	dom: unknown,
    [attr: string]: any
}

// Partial 变为可选参数
type PartialCanvasParam = Partial<CanvasParam>

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
	rotateX: number,
	rotateY: number,
	scaleWidth: number,
	scaleHeight: number,
	globalAlpha: number,
	globalCompositeOperation: GlobalCompositeOperation,
	selectable: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [attr: string]: any
}

// Partial 变为可选参数
type PartialDrawParam = Partial<DrawParam>

type AnimationOption = {
	vX: number,
	vY: number,
	sX: number,
	sY: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [attr: string]: any
}

type PartialAnimationOption = Partial<AnimationOption>

export { 
    PartialCanvasParam,
    PartialDrawParam,
    PartialAnimationOption
}