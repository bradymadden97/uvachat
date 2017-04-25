$(document).ready(function(){
	var canvas = document.getElementById('stacksCanvas');
	var ctx = canvas.getContext("2d");
	img = new Image();
	ctx.drawImage(img,0,0,600,317,0,0,600,317);
	img.src="img/stacks.png";
});