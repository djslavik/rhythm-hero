RH.DebugGameScreen = (function(){
	'use strict';
	// timeWidth is the number of miliseconds that the canvas width can represent
	function DebugGameScreen(canvas, timeWidth) {
		this.canvas = canvas;
		this.timeWidth = timeWidth;
	}
	DebugGameScreen.prototype = {
		update : function(ups){
			var canvas = this.canvas;
			var context = canvas.getContext("2d");
			context.clearRect(0, 0, canvas.width, canvas.height);
			var x = 0;
			var screen = this;
			context.beginPath();
			context.lineWidth = 1;
			var y = 0;
			ups.forEach(function(element){
				y = 0.5 + (element.isPressed ? canvas.height/4: canvas.height/2);
				context.lineTo( x, y);
				var newX = x + (canvas.width/screen.timeWidth) * (element.duration);
				context.lineTo( newX, y);
				x = newX;
			});
			context.lineTo(canvas.width, y);
			context.stroke();
		}
	};
	return DebugGameScreen;
}());

RH.GameScreen = (function(){
	'use strict';
	// timeWidth is the number of miliseconds that the canvas width can represent
	function GameScreen(canvas, timeWidth) {
		this.canvas = canvas;
		this.timeWidth = timeWidth;
		this.bars = [];
		for (var i = 0; i < 3; i++){
			var notes = [];
			for (var j = 0; j < 4; j++){
				var key = RH.VexUtils.randomKey();
				notes[j] = RH.VexUtils.newNote(key, 4);
			}
			this.bars[i] = notes;
		}
		this.metronome = new RH.Metronome(50, 50);
	}
	GameScreen.prototype = {

		update : function(ellapsedBars, ellapsedBeats, beatPerBar, beatPerMs, timeSignature){

			var canvas = this.canvas;
			var context = canvas.getContext("2d");
			context.clearRect(0, 0, canvas.width, canvas.height);
			
			context.save();
			context.translate(canvas.width/2 - 25, 30);
			this.metronome.draw(context, timeSignature, ellapsedBeats);
			context.restore();
			
			var renderer = new Vex.Flow.Renderer(canvas,Vex.Flow.Renderer.Backends.CANVAS);
			var barLength = (beatPerBar/beatPerMs) *  (canvas.width/ ( this.timeWidth)); //px/seconds
			for (var i = 0; i < 3; i++){
				var shift = barLength * (ellapsedBeats / beatPerBar);
				var startStave = i* barLength  - shift;
				var stave = new Vex.Flow.Stave(startStave, 50,  barLength);
				stave.setContext(context).draw();
				var notes = RH.getArrayElement(this.bars, ellapsedBars + i);
				Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);
			}
			this.previousBar= ellapsedBars;
			

		}
	};
	return GameScreen;
}());
