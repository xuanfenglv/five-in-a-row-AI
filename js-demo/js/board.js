$(() => {
	initBoard();
	$("#board td").click(function() {
		var row = $(this).parent().index();
		var column = $(this).index();
		var isWin = drown(row,column);
		
		if(!isWin)
			cal();
	});
	$("#cz").click(function() {
		reSet();
		
	})
	$("#qh").click(function() {
		if($(this).html()=="人") {
			$("#calBoardEnemy").hide();
			$("#calBoardMine").show();
			$(this).html('AI');
		} else {
			$("#calBoardEnemy").show();
			$("#calBoardMine").hide();
			$(this).html('人');
		}
	})
	
});
var qipan = new Array();
function drown(row,column) {
	if(qipan[row][column] == 0) {
		var qs = parseInt($(".v1").html());
			if(qs % 2 == 0) {
				$("table tr:eq("+row+") td:eq("+column+")").css("background-image", "url(img/black.png)");
				qipan[row][column] = 1;
				$("#set").val("白方下");
			} else {
				$("table tr:eq("+row+") td:eq("+column+")").css("background-image", "url(img/white.png)");
				qipan[row][column] = 2;
				$("#set").val("黑方下");
			}
			qs += 1;
			$(".v1").html(qs);
			$(".v2").html(Math.ceil(qs / 2));
			if(isWin(row, column)) {
				if(qs % 2 == 0) {
					alert("白方胜");
				} else {
					alert("黑方胜");
				}
				reSet();
				return true;
			}
			return false;
		}
}
function initBoard() {
	var board = document.getElementById("board");

	for(var i = 0; i < board.rows.length; i++) {
		for(var j = 0; j < board.rows[i].cells.length; j++) {
			var cell = board.rows[i].cells[j].bgColor;
			if(i % 2 == 0) {
				if(j % 2 == 0) {
					board.rows[i].cells[j].bgColor = "#33ff33";
				} else {
					board.rows[i].cells[j].bgColor = "#00cc00";
				}
			} else {
				if(j % 2 == 0) {
					board.rows[i].cells[j].bgColor = "#00cc00";
				} else {
					board.rows[i].cells[j].bgColor = "#33ff33";
				}
			}
		}
	}

	
	for(var i = 0; i < 15; i++) {
		qipan[i] = new Array();
		for(var j = 0; j < 15; j++) {
			qipan[i][j] = 0;
		}
	}
}

function reSet() {
	var board = document.getElementById("board");

	for(var i = 0; i < 15; i++) {
		for(var j = 0; j < 15; j++) {
			qipan[i][j] = 0;
			board.rows[i].cells[j].style.background = "";
		}
	}
	$(".v1").html("0");
	$(".v2").html("0");
	$("#set").val("黑方下");
}

function isWin(row, column) {
	if(isRowWin(row, column) || isColWin(row, column) || isX1Win(row, column) || isX2Win(row, column)) {
		return true;
	} else {
		return false;
	}
}

function isRowWin(row, column) {
	var sum = 1;
	var c = qipan[row][column];
	for(var l = 1; l <= getMin2(4, column - 0); l++) {
		if(c == qipan[row][column - l]) {
			sum += 1;
		} else {
			break;
		}
	}
	if(sum == 5) {
		return true;
	}

	for(var r = 1; r <= getMin2(4, 14 - column); r++) {
		if(c == qipan[row][column + r]) {
			sum += 1;
		} else {
			break;
		}
	}
	if(sum > 4) {
		return true;

	} else {
		return false;
	}
}

function isColWin(row, column) {
	var sum = 1;
	var c = qipan[row][column];
	for(var t = 1; t <= getMin2(4, (row - 0)); t++) {
		if(c == qipan[row - t][column]) {
			sum += 1;
		} else {
			break;
		}
	}
	if(sum == 5) {
		return true;
	}

	for(var b = 1; b <= getMin2(4, 14 - row); b++) {
		if(c == qipan[row + b][column]) {
			sum += 1;
		} else {
			break;
		}
	}
	if(sum > 4) {
		return true;
	} else {
		return false;
	}
}

function isX1Win(row, column) {
	var sum = 1;
	var c = qipan[row][column];
	for(var l = 1; l <= getMin3(4, column - 0, row - 0); l++) {
		if(c == qipan[row - l][column - l]) {
			sum += 1;
		} else {
			break;
		}
	}

	if(sum == 5) {
		return true;
	}

	for(var r = 1; r <= getMin3(4, 14 - column, 14 - row); r++) {
		if(c == qipan[row + r][column + r]) {
			sum += 1;
		} else {
			break;
		}
	}

	if(sum > 4) {
		return true;
	} else {
		return false;
	}
}

function isX2Win(row, column) {
	var sum = 1;
	var c = qipan[row][column];
	for(var l = 1; l <= getMin3(4, 14 - column, row - 0); l++) {
		if(c == qipan[row - l][column + l]) {
			sum += 1;
		} else {
			break;
		}
	}

	if(sum == 5) {
		return true;
	}

	for(var r = 1; r <= getMin3(4, column - 0, 14 - row); r++) {
		if(c == qipan[row + r][column - r]) {
			sum += 1;
		} else {
			break;
		}
	}
	if(sum > 4) {
		return true;
	} else {
		return false;
	}
}

function getMin2(no1, no2) {
	return(no1 <= no2 ? no1 : no2);
}

function getMin3(no1, no2, no3) {
	return getMin2(getMin2(no1, no2), no3);
}