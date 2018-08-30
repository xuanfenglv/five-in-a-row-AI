let map = new Map();
map.set(1,100000);
map.set(2,10000);
map.set(3,1500);
map.set(4,1000);
map.set(5,150);
map.set(6,100);
map.set(7,15);
map.set(8,0);

var red = 255;
var green = 87;
var blue = 34;

class ScoreInfo {
	constructor(row, column, score) {
		this.row = row;
		this.column = column;
		this.score = score;
	}

}
class Pair {
	constructor(half1, half2, type,
		half1Continue, half2Continue) {
		this.half1 = half1;
		this.half2 = half2;
		this.type = type;
		this.half1Continue = half1Continue;
		this.half2Continue = half2Continue;
		this.continue =
			half1Continue + half2Continue + 1;
	}
	isHalf1ValEmpty(index) {
		return this.getHalf1Val(index) == 0;
	}
	isHalf2ValEmpty(index) {
		return this.getHalf2Val(index) == 0;
	}
	
	isHalf1ValEquals(index) {
		return this.getHalf1Val(index) == this.type;
	}
	isHalf2ValEquals(index) {
		return this.getHalf2Val(index) == this.type;
	}
	
	getHalf1Val(index) {
		return(index + this.half1Continue > 4) ? 3 : this.half1[index + this.half1Continue-1];
	}
	getHalf2Val(index) {
		return(index + this.half2Continue > 4) ? 3 : this.half2[index + this.half2Continue-1];
	}
}

function getScore(pair) {
	var type = 0;
	if(pair.continue >= 5) {
		type = 1;
	} else if(pair.continue == 4) {
		if(pair.isHalf1ValEmpty(1) && pair.isHalf2ValEmpty(1)) {
			type = 2;
		} else if(!pair.isHalf1ValEmpty(1) && !pair.isHalf2ValEmpty(1)) {
			type = 8;
		} else {
			type = 3;
		}
	} else if(pair.continue == 3) {
		// 两侧有空
		if(pair.isHalf1ValEmpty(1) && pair.isHalf2ValEmpty(1)) {
			if(pair.isHalf1ValEmpty(2) || pair.isHalf2ValEmpty(2)) {
				type = 4;
			} else {
				type = 5;
			}
		
		} else if(!pair.isHalf1ValEmpty(1) && !pair.isHalf2ValEmpty(2)) {// 两侧无空
			type = 8;
		} else { // 两侧有一侧为空
			if(pair.isHalf1ValEmpty(1)) { //1侧有空
				if(pair.isHalf1ValEmpty(2)) {
					type = 5;
				} else if(pair.isHalf1ValEquals(2)) {
					type = 3;
				} else {
					type = 8;
				}
			} else { //2侧有空
				if(pair.isHalf2ValEmpty(2)) {
					type = 5;
				} else if(pair.isHalf2ValEquals(2)) {
					type = 3;
				} else {
					type = 8;
				}
			}
		}
	} else if(pair.continue == 2) {
		type = 6;
	} else if(pair.continue == 1) {
		type = 7;
	}
	var val = map.get(type);
	return val;
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
	return getPair(half1, half2, type);
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

	return getPair(half1, half2, type);
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
	return getPair(half1, half2, type);
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
	return getPair(half1, half2, type);
}

function calContinue(half, type) {
	var sum = 0;
	for(var i of half) {
		if(i == type) {
			sum++
		} else {
			break;
		}
	}

	return sum;
}

function getPair(half1, half2, type) {
	let half1Continue = calContinue(half1, type);
	let half2Continue = calContinue(half2, type);

	let pair = new Pair(half1, half2, type,
		half1Continue, half2Continue);
		if(pair.continue==4) {
			debugger;
		}
	return pair;
}

let enemyMax = 0;
let mineMax = 0;

function calEnemy(scoreInfos) {
	let max = 0;
	
	for(var i = 0; i < 15; i++) {
		for(var j = 0; j < 15; j++) {
			if(qipan[i][j] == 0) {
				var pair1 = getRowPair(i, j, 1);
				var pair2 = getColumnPair(i, j, 1);
				var pair3 = getX1Pair(i, j, 1);
				var pair4 = getX2Pair(i, j, 1);
				
				var rowScore = getScore(pair1);
				var columnScore = getScore(pair2);
				var x1Score = getScore(pair3);
				var x2Score = getScore(pair4);
				
				var sum =  rowScore+columnScore+x1Score+x2Score;
				scoreInfos[i][j].enemy = sum;
				
				var enemyTd= $("#calBoardEnemy tr:eq("+i+") td:eq("+j+")");
				enemyTd.html(sum+'<br>'+rowScore+','+columnScore+'<br>'+x1Score+','+x2Score);
				var ratio = sum/10000+0.1;
				var color = "rgb("+parseInt(red*ratio)+","+parseInt(green*ratio)+","+parseInt(blue*ratio)+")";
				enemyTd.css("background-color",color)
				if(sum > max) {
					max = sum;
				}
			}

		}
	}
	enemyMax = max;
}

function calMine(scoreInfos) {
	let max = 0;
	
	for(var i = 0; i < 15; i++) {
		for(var j = 0; j < 15; j++) {
			if(qipan[i][j] == 0) {
				var pair1 = getRowPair(i, j, 2);
				var pair2 = getColumnPair(i, j, 2);
				var pair3 = getX1Pair(i, j, 2);
				var pair4 = getX2Pair(i, j, 2);
				
				var rowScore = getScore(pair1);
				var columnScore = getScore(pair2);
				var x1Score = getScore(pair3);
				var x2Score = getScore(pair4);
				
				var sum =  rowScore+columnScore+x1Score+x2Score;
				scoreInfos[i][j]={};
				scoreInfos[i][j].mine = sum;
				var mineTd= $("#calBoardMine tr:eq("+i+") td:eq("+j+")");
				mineTd.html(sum+'<br>'+rowScore+','+columnScore+'<br>'+x1Score+','+x2Score);
				var ratio = sum/10000+0.1;
				var color = "rgb("+parseInt(red*ratio)+","+parseInt(green*ratio)+","+parseInt(blue*ratio)+")";
				mineTd.css("background-color",color)
				if(sum > max) {
					max = sum;
				}
			}

		}
	}
	mineMax = max;
}

function getEnemyHighList(scoreInfos) {
	let list = [];

	for(var i = 0; i < 15; i++) {
		for(var j = 0; j < 15; j++) {
			var score = scoreInfos[i][j];
			if(score&&enemyMax == score.enemy) {
				list.push(new ScoreInfo(i,j,scoreInfos[i][j].mine));
			}
		}
	}
	return list;
}

function getMineHighList(scoreInfos) {
	let list = [];

	for(var i = 0; i < 15; i++) {
		for(var j = 0; j < 15; j++) {
			var score = scoreInfos[i][j];
			if(score&&mineMax == score.mine) {
				list.push(new ScoreInfo(i,j,scoreInfos[i][j].enemy));
			}
		}
	}
	return list;
}

function getHigh(list) {
	var i = 0;
	var max = list[0].score;

	for(var j = 1; j < list.length; j++) {
		if(list[j].score > max) {
			i = j;
			max = list[j].score;
		}
	}
	return list[i];
}

function getMineHigh(list) {
	let list = [];

	for(var i = 0; i < 15; i++) {
		for(var j = 0; j < 15; j++) {
			if(mineMax == scoreInfos[i][j].mine) {
				list.add(scoreInfos[i][j].mine);
			}
		}
	}
	return list;
}

function cal() {
	console.log("开始计算...")
	reSetAnalyze();
	var scoreInfos = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
	console.log("分析我方局势...")
	calMine(scoreInfos);
	console.log("分析敌方局势...")
	calEnemy(scoreInfos);
	
	var info;
	if(mineMax >= enemyMax) {
		console.log("进攻...")
		let mineList = getMineHighList(scoreInfos);
		var info = getHigh(mineList);
	} else {
		console.log("防御...")
		let enemyList = getEnemyHighList(scoreInfos);
		var info = getHigh(enemyList);
	}
	console.log("着子...")
	drown(info.row,info.column);
}