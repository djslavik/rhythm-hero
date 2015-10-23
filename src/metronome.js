RH.Metronome = (function(){
	'use strict';
	function Metronome(width, height){
		this.width = width;
		this.height = height;
	}
	
	var DRAWERS = {};
	
	var drawDot = function(context, x, y){
		context.beginPath();
		context.arc(x, y, 2, 0, 2 * Math.PI, false);
		context.fillStyle = 'green';
		context.fill();
		context.lineWidth = 1;
		context.strokeStyle = '#003300';
		context.stroke();
	};
	
	DRAWERS[RH.TS.FOUR_FOUR.toString()] = function(metronome, context, ellapsedBeats){
		var division = RH.divide(ellapsedBeats, 1);
		var x;
		var y;
		switch(division.quotient) {
			case 0:
				x =	1/2;
				y = division.rest;
				break;
			case 1:
				x = 1/2 * (1 - division.rest);
				y = 1 - 1/2 * division.rest;
				break;
			case 2:
				x = division.rest;
				y = 1/2;
				break;
			case 3:
				x = 1 - division.rest * 1/2;
				y = 1/2 * (1 - division.rest);
				break;
		}
		
		drawDot(context, metronome.width * x , metronome.height * y);
	};
	Metronome.prototype = {
		draw: function(context, timeSignature, ellapsedBeats){
			context.clearRect(0, 0, this.width, this.height);
			DRAWERS[timeSignature.toString()](this, context, ellapsedBeats);
		}
	};
	return Metronome;
}());
