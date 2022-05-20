/* eslint-disable prettier/prettier */
/*
* 计算一个点旋转后的坐标位置
* centerX、centerY 旋转中心
* startX、startY 开始点位置
* angle 旋转角度
*/
function rotationPoint(centerX: number, centerY: number, startX: number, startY: number, angle: number) {
    const endX: number = Math.round(centerX + (startX - centerX) * Math.cos(angle * Math.PI / 180) + (centerY - startY) * Math.sin(angle * Math.PI / 180))
    const endY: number = Math.round(centerY + (startX - centerX) * Math.sin(angle * Math.PI / 180) - (centerY - startY) * Math.cos(angle * Math.PI / 180))
    const point: Array<number> = [endX, endY]

    return point
}

/*
* 计算两点之间旋转角度的变化值
* rotateX、rotateY 旋转中心
* startX、startY 开始点位置
* endX、endY 结束点位置
*/
function rotationAngle(rotateX: number, rotateY: number, startX: number, startY: number, endX: number, endY: number) {
    const startAngle: number = Math.atan2(startX - rotateX, startY - rotateY) * 180 / Math.PI
    const endAngle: number = Math.atan2(endX - rotateX, endY - rotateY) * 180 / Math.PI

    return endAngle - startAngle
}

export default {
    rotationPoint,
    rotationAngle
}

export {
    rotationPoint,
    rotationAngle
}
