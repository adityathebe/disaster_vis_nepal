var circleCol  = [];
var slider, myP;
var columns;
var custom_column = []

function preload() {
	table = loadTable("data.csv", "csv", "header");
}

function setup() {
	createCanvas(1200, 500);
	columns = table.columns;
	var eachRow = []
	var rows = table.rows;
	
	rows.forEach(function(row) {
		eachRow.push(row.arr);
	})

	for (var i = 0; i < eachRow.length-1; i++) {
		circleCol.push(new Circle(eachRow[i]));
	}
	
	for (var i = 0; i < columns.length; i++) {
		var temp_col = []
		for (var j = 0; j < rows.length; j++) {
			temp_col.push(rows[j].arr[i])
		}
		custom_column.push(temp_col)
	}

	textStyle(ITALIC);
	textAlign(CENTER);

	// DOM ELements
	myP = createElement('h2', 'Waiting.');
	slider = createSlider(1, columns.length -1, 2, 1);
}

function draw() {
	background('#64DDBB');
	circleCol.forEach(function(cir) {
		cir.render();
	})
}

function Circle(dataArr) {
	this.r = 30; 
	this.x = random(0 + this.r, width - this.r);
	this.y = random(0 + this.r, height - this.r);
	this.value = dataArr[0]
	this.content = dataArr

	this.draw = function() {
		var font_val = map(this.r, 20, 100, 7, 15)
		textSize(font_val);
		fill("#FEC606");
		ellipse(this.x, this.y, this.r, this.r)
		fill(255)
		text(this.value, this.x, this.y)
	}

	this.render = function(){
		this.draw();
		this.hover();
		this.move();
		slValue = slider.value();
		var max = findMax(custom_column[slValue]);
		myP.html(columns[slValue]);
		this.r = map(dataArr[slValue], 0 , max, 24, 100);
	}

	this.hover = function() {
		var distance = dist(this.x, this.y, mouseX, mouseY)
		if(distance <= this.r /2) {
			textSize(20);
			text(this.value, mouseX, mouseY)
		}
	}

	this.move = function() {
		var vel = p5.Vector.random2D();
		this.x += 0.5 * vel.x;
		this.y += 0.4 * vel.y;
	}
}

function findMax(arr) {
	var test = 0;
	var maxval = 0;
	var temp;
	for (var i = 1; i < arr.length - 1; i++) {
		temp = parseInt(arr[i]);
		if(temp > test){
			maxval = arr[i];
			test = maxval; 
		}
	}
	return maxval;
}
