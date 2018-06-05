let check = {
	isLian5: (row, column) => isWin(row, column),
	isHuo4: (row, column) => {

	},
	isDead4: (row, column) => {

	},
	isHuo3: (row, column) => {

	},
	isMian3: (row, column) => {

	},
	isHuo2: (row, column) => {

	},
	isMian2: (row, column) => {

	}
}
class Pair {
	constructor(half1, half2,type,
		half1Continue,half2Continue) {
		this.half1 = half1;
		this.half2 = half2;
		this.type = type;
		this.half1Continue = half1Continue;
		this.half2Continue = half2Continue;
		this.continue =
			half1Continue+half2Continue+1;
	}
	isHalf1ValEmpty(index) {
		return getHalf1Val(index)==0;
	}
	getHalf1Val(index) {
		return (index+this.half2Continue>4)?3:this.half1[index+this.half1Continue];
	}
	getHalf2Val(index) {
		return (index+this.half2Continue>4)?3:this.half2[index+this.half2Continue];
	}
}

function getScore(pair) {
	
	if(pair.continue>= 5) {
		return 100000;
	} else if( pair.continue == 4) {
		if(pair.isHalf1ValEmpty(1)&&pair.isHalf2ValEmpty(1)) {
			return 10000;
		} else if(!pair.isHalf1ValEmpty(1)&&!pair.isHalf2ValEmpty(1)) {
			return 0;
		} else {
			return 1500;
		}
	} else if( pair.continue == 3) {
		if(pair.isHalf1ValEmpty(1)&&pair.isHalf2ValEmpty(1)) {
			if(pair.isHalf1ValEmpty(2)||pair.isHalf2ValEmpty(2)) {
				return 1000;
			} else {
				return 150;
			}
		} else if(!pair.isHalf1ValEmpty(1)&&!pair.isHalf2ValEmpty(2)) {
			return 0;
		} else {
			if(pair.isHalf1ValEmpty(1)) {
				if(pair.isHalf1ValEmpty(2)) {
					return 150;
				} else {
					return 0;
				}
			} else {
				if(pair.isHalf2ValEmpty(2)) {
					return 150;
				} else {
					return 0;
				}
			}
		}
	} else if( pair.continue == 2) {
		return 100000;
	} else if( pair.continue == 1) {
		return 100000;
	}
}

function getRowPair(row, column, type) {
	let half1 = new Array();
	let half2 = new Array();

	for(var i = 1; i <= 4; i++) {
		var h1 = (column - i) >= 0 ? qipan[row][column - i] : 3;
		var h2 = (column + i) < 15 ? qipan[row][column + i] : 3;
		half1.push(h1);
		half2.push(h2);
	}
	return getPair(half1,half2,type);
}

function getColumnPair(row, column, type) {
	let half1 = new Array();
	let half2 = new Array();

	for(var i = 1; i <= 4; i++) {
		var h1 = (row - i) >= 0 ? qipan[row - i][column] : 3;
		var h2 = (row + i) < 15 ? qipan[row + i][column] : 3;
		half1.push(h1);
		half2.push(h2);
	}

	return getPair(half1,half2,type);
}

function getX1Pair(row, column, type) {
	let half1 = new Array();
	let half2 = new Array();

	for(var i = 1; i <= 4; i++) {
		var h1 = ((row - i) >= 0 && (column - i) >= 0) ? qipan[row - i][column - i] : 3;
		var h2 = ((row + i) < 15 && (column + i) < 15) ? qipan[row + i][column + i] : 3;
		half1.push(h1);
		half2.push(h2);
	}
	return getPair(half1,half2,type);
}

function getX2Pair(row, column, type) {
	let half1 = new Array();
	let half2 = new Array();

	for(var i = 1; i <= 4; i++) {
		var h1 = ((row + i) < 15 && (column - i) >= 0) ? qipan[row + i][column - i] : 3;
		var h2 = ((row - i) >= 0 && (column + i) < 15) ? qipan[row - i][column + i] : 3;
		half1.push(h1);
		half2.push(h2);
	}
	return getPair(half1,half2,type);
}

function calContinue(half, type) {
	var sum = 1;
	for(var i of half) {
		if(i == type) {
			sum++
		} else {
			break;
		}
	}
	
	return sum;
}

function getPair(half1,half2,type) {
	let half1Continue = calContinue(half1, type);
	let half2Continue = calContinue(half2, type);

	let pair = new Pair(half1, half2,type,
		half1Continue,half2Continue);
	return pair;
}
