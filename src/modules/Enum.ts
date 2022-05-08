/* eslint-disable prettier/prettier */

enum GlobalCompositeOperation {
	SOURCEOVER = "source-over",
	SOURCEATOP = "source-atop",
	SOURCEIN = "source-in",
	SOURCEOUT = "source-out",
	DESTINATIONOVER = "destination-over",
	DESTINATIONATOP = "destination-atop",
	DESTINATIONIN = "destination-in",
	DESTINATIONOUT = "destination-out",
	LIGHTER = "lighter",
	COPY = "copy",
	XOR = "xor"
}

enum Direction {
	LEFT = 'left',
	RIGHT ='right',
	TOP = 'top',
	DOWN = 'down'
}

export { 
    GlobalCompositeOperation,
    Direction
}