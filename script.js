
"use strict";

let
	cnv = document.getElementById("canv"),
	ctx = cnv.getContext("2d");

cnv.height = 750;
cnv.width  = 900;

let
	prop = new Image(),
	bg   = new Image(),
	hero = new Image();

prop.src = 'Images/prop.png';
bg.src = 'Images/bg.jpg';
hero.src = 'Images/Default.png';

let props = [];

props.speed = 2;

props[0] = {
	x: Math.floor(Math.random() * (canv.width - 300)),
	y: canv.height - 100
};

let my = {
	x: canv.width / 2,
	y: 0,
	width: 75,
	height: 100
}

let
	grav = 3,
	sensitivity = 15,
	onFloor = false,
	jump = 75;

function draw () {

	onFloor = false;

	ctx.drawImage(bg, 0, 0, cnv.width, cnv.height);
	ctx.drawImage(hero, my.x, my.y, my.width, my.height);

	if ((my.x >= canv.width || my.x <= -my.width) ||
		my.y >= canv.height || my.y <= -my.height) {
		window.location.reload();
	}

	my.y += grav;

	for (let i=0;i<props.length;i++) {
		ctx.drawImage(prop, props[i].x, props[i].y, 300, 100);

		props[i].y -= props.speed;

		if (props[i].y == 300) {
			props.push({
				x: Math.floor(Math.random() * (canv.width - 300)),
				y: canv.height - 100
			});
		}

		if ((my.x + my.width/2 > props[i].x && my.x + my.width/2 < props[i].x + 300)
			&& (my.y + my.height > props[i].y && my.y + my.height < props[i].y + 100)) {
			my.y = props[i].y - my.height;
			hero.src = "Images/Default.png";
			onFloor = true;
		}
	}

	requestAnimationFrame(draw);
}


setInterval(()=>{
	if (!onFloor) {
		hero.src = "Images/Down.png";
	}
},100);


document.addEventListener('keydown', (e)=>{
	if (e.keyCode === 32 && onFloor) { // Jump
		hero.src = "Images/Jump.png";
		onFloor = false
		my.y -= jump;
	}
	if (e.keyCode === 65) { // Left
		my.x -= sensitivity;
	}

	if (e.keyCode === 68) { // Right
		my.x += sensitivity;
	}
});

draw();
