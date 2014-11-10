+function () {

	$("#male").AwesomeVisuals();

	$("#male").AwesomeVisuals("update", 0.85);

	

	$("#heart").AwesomeVisuals({
		fontawesomeicon: "heart",
		height: 200,
		fillproportion: 0.75,
		fillcolor: "blue",
		filldirection: "down",
		filladjustment:{
			top: 10,
			bottom: 10
		},
		filltext:{
			size: "35px"
		}
	});

	$("#beer").AwesomeVisuals({
		fontawesomeicon: "beer",
		fillproportion: 0.65,
		fillcolor: 'orange',
		filladjustment:{
			top: 25,
			bottom: 25
		},
		filltext:{
			marginLeft: "60px"
		}
	});

	$("#beer").AwesomeVisuals("update", 0.3);

	$("#grid").AwesomeVisuals({
		type: "grid"
	})


	$("#grid").AwesomeVisuals("update", 0.25);
}();