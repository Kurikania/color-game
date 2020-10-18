var numbOfSq = 6;
var colors =  generateRandomColors(numbOfSq);
var squares = document.querySelectorAll(".colorBox");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var reset = document.querySelector("#reset"); 
var easy = document.querySelector("#easy"); 
var hard = document.querySelector("#hard"); 
var cmykButton = document.querySelector("#toCmyk"); 
var rgbButton = document.querySelector("#toRgb"); 
var playCmyk = false; 
var isEasy = false; 

function playEasy() {
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.backgroundColor = colors[i]; 
		} else {
			squares[i].style.display = "none";
		}
	}
}

function playHard(){
	for (var i = 0; i < squares.length; i++) {		
			squares[i].style.backgroundColor = colors[i]; 
			squares[i].style.display = "block";		
	}
}

easy.addEventListener("click", function(){
	easy.classList.add("selected");
	hard.classList.remove("selected");
	isEasy = true; 
	numbOfSq = 3;
	if (playCmyk) { 
	colors = generateRandomColors(numbOfSq);
	pickedColor = pickColor(); 
	colorDisplay.textContent = rgbToCmyk(pickedColor);
	}   else { 
	colors = generateRandomColors(numbOfSq);
	pickedColor = pickColor(); 
	colorDisplay.textContent = pickedColor; }
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.backgroundColor = colors[i]; 
		} else {
			squares[i].style.display = "none";
		}
	}

}); 

hard.addEventListener("click", function(){
	easy.classList.remove("selected");
	hard.classList.add("selected");
	isEasy = false;
	numbOfSq = 6;
	if (playCmyk) { 
	colors = generateRandomColors(numbOfSq);
	pickedColor = pickColor(); 
	colorDisplay.textContent = rgbToCmyk(pickedColor);
	}   else { colors = generateRandomColors(numbOfSq);
	pickedColor = pickColor(); 
	colorDisplay.textContent = pickedColor; }
	for (var i = 0; i < squares.length; i++) {		
			squares[i].style.backgroundColor = colors[i]; 
			squares[i].style.display = "block";		
	}
}); 


	
function gameCmyk(){
	h1.style.color = "white";
	lightGb = false;
	playCmyk = true; 
	cmykButton.classList.add("selected");
	rgbButton.classList.remove("selected"); 
	numbOfSq = (!isEasy) ? 6 : 3;  
	colors = generateRandomColors(numbOfSq);
	pickedColor = pickColor(); 
	colorDisplay.textContent = rgbToCmyk(pickedColor);
	if (isEasy) {
		playEasy();
	} else { playHard() }
	/*for (var i = 0; i < squares.length; i++) {		
			squares[i].style.backgroundColor = colors[i]; 
			squares[i].style.display = "block";		
	}*/
	h1.style.backgroundColor = "steelblue";
	messageDisplay.textContent = ""
	reset.textContent = "New Colors"
};


function gameRgb(){ 
	h1.style.color = "white";
	lightGb = false;
	playCmyk = false; 
	numbOfSq = (!isEasy) ? 6 : 3; 
	cmykButton.classList.remove("selected");
	rgbButton.classList.add("selected"); 
	colors = generateRandomColors(numbOfSq);
	pickedColor = pickColor(); 
	colorDisplay.textContent = pickedColor;
	if (isEasy) {
		playEasy();
	} else { playHard() }

	/*for (var i = 0; i < squares.length; i++) {		
			squares[i].style.backgroundColor = colors[i]; 
			squares[i].style.display = "block";		
	}*/
	h1.style.backgroundColor = "steelblue";
	messageDisplay.textContent = "";
	reset.textContent = "New Colors";
	};

cmykButton.addEventListener("click", gameCmyk );
rgbButton.addEventListener("click", gameRgb ) ; 
	
reset.addEventListener("click", function(){
	h1.style.color = "white";
	lightGb = false;

	if (playCmyk) {
		gameCmyk();
	} else {
		gameRgb();
	}
	messageDisplay.textContent = "";
	
	this.textContent = "New Colors"; 
	});

colorDisplay.textContent = pickedColor;

function isBGlight(pickedColor) {
	var pickedColorSum  = pickedColor.substring(4, pickedColor.length-1)
         .replace(/ /g, '')
         .split(',');

var pickedColorRes = Number(pickedColorSum[0]) + Number(pickedColorSum[1]) + Number(pickedColorSum[2]);
return pickedColorRes;
}

for(var i = 0; i < squares.length; i++) {

	squares[i].style.backgroundColor = colors[i];

	//add click listners to scquares
	squares[i].addEventListener("click", function(){
		var clickedColor = this.style.backgroundColor;
		if (clickedColor === pickedColor) {
			messageDisplay.textContent = "Correct";
			changeColors(clickedColor);
			h1.style.backgroundColor = clickedColor;
			if(isBGlight(pickedColor) > 540) {
				h1.style.color = "black"; 
			}
			reset.textContent = "Play Again"; 
		} else {
			messageDisplay.textContent = "Try again";
			this.style.backgroundColor = "#232323"; 
		}

	})
}

function changeColors(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	//make array
	var arr = [];
	// add colors
	if (!playCmyk)
	for (var i = 0; i < num ; i++) { 
		arr[i] = randomColor() ;
	} else { 
	for (var i = 0; i < num ; i++) { 
		arr[i] = cmykToRgb(randomColorCMYK()) ;
		 }
		}
	return arr;
}

var lightGb = false;
function randomColor() {
	// make red
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	
	return "rgb(" + r +", " + g +", " + b + ")" 
}

function randomColorCMYK() {	
	var c = Math.floor(Math.random() * 100);
	var m = Math.floor(Math.random() * 100);
	var y = Math.floor(Math.random() * 100);
	var k =  Math.floor(Math.random() * 100);
	var cmyk = [c, m, y, k]; 
	return cmyk;  
}



 function cmykToRgb (CMYK){
		 
		var c = CMYK[0] / 100;
		var m = CMYK[1] / 100;
		var y = CMYK[2] / 100;
		var k = CMYK[3] / 100;
 
		var r = 1 - Math.min( 1, c * ( 1 - k ) + k );
		var g = 1 - Math.min( 1, m * ( 1 - k ) + k );
		var b = 1 - Math.min( 1, y * ( 1 - k ) + k );
 
		r = Math.round( r * 255 );
		g = Math.round( g * 255 );
		b = Math.round( b * 255 );
 
		return "rgb(" + r +", " + g +", " + b + ")" ;
	}
 	
function rgbToCmyk (rgbStr){

		var result = rgbStr.substring(4, rgbStr.length-1)
         .replace(/ /g, '')
         .split(',');
 
		var r = Number(result[0]) / 255;
		var g = Number(result[1]) / 255;
		var b = Number(result[2]) / 255;
 
		var k = Math.min( 1 - r, 1 - g, 1 - b );
		var c = ( 1 - r - k ) / ( 1 - k );
		var m = ( 1 - g - k ) / ( 1 - k );
		var y = ( 1 - b - k ) / ( 1 - k );
 
		c = Math.round( c * 100 );
		m = Math.round( m * 100 );
		y = Math.round( y * 100 );
		k = Math.round( k * 100 );
 
		return "cmyk(" + c +", " + m +", " + y + ", "+ k +")" 
	}
	












