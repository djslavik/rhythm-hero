$(document).ready(function() {
	'use strict';
	module("Rendering Tests");
	var Game = RH.Game;
	var Measure = RH.Measure;
	var Note = RH.Note;
	var GameOptions = RH.GameOptions;
	var RhythmPatterns = RH.RhythmPatterns;
	var BackScreen = RH.BackScreen;
	
	var WIDTH = 400;
	
	RH.debug();
	function createNote(note_data) {
		return new Vex.Flow.StaveNote(note_data);
	}

	var VF = Vex.Flow;
	var generateCanvas = function(title, WIDTH){
		var canvasJ = $('<canvas>');
		canvasJ.prop({
			width : WIDTH,
			height : 100
		});
		$('<div>').append($('<h2>').text(title)).append(canvasJ).appendTo($("#test-output"));
		return canvasJ[0];
	};
	
	var testCanvas = function(title, callBack) {
		test(title, function() {
			var canvas = generateCanvas(title, 800);
			callBack(canvas);
			ok(true, title);
		});
	};

	test('first', function() {
		var title = 'first';


		
		var tempo = GameOptions.DEFAULT_TEMPO;
		var timeSignature = GameOptions.DEFAULT_TS;
		var options = new GameOptions(timeSignature, tempo);
		var measures = Game.generateMeasures(options, RhythmPatterns.PATTERNS);
		
		var canvasesData = BackScreen.createMeasuresCanvases(400, measures);
		var canvas = generateCanvas(title, WIDTH * measures.length);
		for (var i = 0; i < measures.length; i++){
			canvas.getContext('2d').putImageData(canvasesData[i], WIDTH * i , 0);
		}
		ok(true, title);
	});

	test('second', function() {
		var title = 'second';
		
		var tempo = GameOptions.DEFAULT_TEMPO;
		var timeSignature = GameOptions.DEFAULT_TS;
		var options = new GameOptions(timeSignature, tempo);
		var patternsS = ['minim','crotchet', 'quaver', 'triplet quaver','dotted crotchet quaver', 'quaver dotted crotchet', 'whole'];
		var patterns = patternsS.map(RhythmPatterns.getPattern);
		var measures = Game.generateMeasures(options, patterns);
		
		var canvasesData = BackScreen.createMeasuresCanvases(400, measures);
		var canvas = generateCanvas(title, WIDTH * measures.length);
		for (var i = 0; i < measures.length; i++){
			canvas.getContext('2d').putImageData(canvasesData[i], WIDTH * i , 0);
		}
		ok(true, title);
	});
	
	test('third', function() {
		var title = 'third';
		
		var tempo = GameOptions.DEFAULT_TEMPO;
		var timeSignature = GameOptions.DEFAULT_TS;
		var options = new GameOptions(timeSignature, tempo);
		var patterns = RH.RhythmPatterns.generatePatterns(0, RH.RhythmPatterns.MAX_DIFFICULTY, 50);
		var measures = Game.generateMeasures(options, patterns);
		
		var canvasesData = BackScreen.createMeasuresCanvases(400, measures);
		var canvas = generateCanvas(title, WIDTH * measures.length);
		for (var i = 0; i < measures.length; i++){
			canvas.getContext('2d').putImageData(canvasesData[i], WIDTH * i , 0);
		}
		ok(true, title);
	});

});