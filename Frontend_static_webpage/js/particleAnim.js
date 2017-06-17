// JavaScript Document
// Animations with javascript "sketch" plugin
// Samuel Ng
// 23 Jan 2016

var ctx = Sketch.create();
var particles = [];
var count = 20;
var speed = 1;

var loaded = false;

var mouseX, mouseY;	

ctx.draw = function() {	
	"use strict";	
	
	if (!loaded)
	{
	  	ParticleGenerator();
		loaded = true;	
	}
	
	for (var i = 0; i < count; i++)
	{
		particles[i].draw();	
	}
	
	DrawLink(ctx);
};

function ParticleGenerator()
{
	"use strict";	
	
	particles[0] = new GenerateMouseParticle();

	for (var i = 1; i < count; i++)
	{
		particles[i] = new Particle(ctx);	
	}
	
}

function DrawLink(canvas)
{
	"use strict";	

	var maxDistance = 300;
	var baseOpacity = 0.2;

	for (var i = 0; i < particles.length; i++)
	{		
		for (var o = 0; o < particles.length; o++)
		{
			if (i !== o)
			{
				var deltaXsquare = Math.pow((particles[i].xPos - particles[o].xPos), 2);
				var deltaYsquare = Math.pow((particles[i].yPos - particles[o].yPos), 2);
				
				var distance = Math.sqrt(deltaXsquare + deltaYsquare);	
						
				if (distance < maxDistance)
				{
					canvas.beginPath();
					canvas.moveTo(particles[i].xPos, particles[i].yPos);
					canvas.lineTo(particles[o].xPos, particles[o].yPos);
					var distancePercentage = (distance/maxDistance); 
					var opacity = baseOpacity - distancePercentage;
					canvas.strokeStyle="rgba(105, 255, 255, " + opacity + ")";

					canvas.stroke();
				}
			}
		}
	}	
}

function Particle (canvas) {
	"use strict";	
	this.xPos = Math.random() * canvas.width;
	this.yPos = Math.random() * canvas.height;
	this.xVelocity = (Math.random() - 0.5) * speed;
	this.yVelocity = (Math.random() - 0.5) * speed;
	this.ctx = canvas;
	
	this.draw = function() {
		this.xPos += this.xVelocity;
		this.yPos += this.yVelocity;
		this.ctx.beginPath();
		this.ctx.arc( this.xPos, this.yPos, 1.5, 0, Math.PI * 2);
		this.ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
		this.ctx.fill();
		
		if (this.xPos > this.ctx.width || this.xPos < 0)
		{
			this.xVelocity = -this.xVelocity;
		}
		
		if (this.yPos > this.ctx.height || this.yPos < 0)
		{
			this.yVelocity = -this.yVelocity;
		}
	};
}

function GenerateMouseParticle ()
{
	"use strict";	
	this.xPos = mouseX;
	this.yPos = mouseY;
	this.ctx = ctx;
	
	this.draw = function() {
		this.xPos = mouseX;
		this.yPos = mouseY;
	};
}

document.onmousemove = function (e) 
{
	mouseX = e.pageX;
	mouseY = e.pageY;
};