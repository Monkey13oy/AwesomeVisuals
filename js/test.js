+function () {

	$("#male").AwesomeVisuals();

	$("#male").AwesomeVisuals("update", 0.85);

	

	$("#heart").AwesomeVisuals({
		fontawesomeIcon: "heart",
		height: 200,
		fillProportion: 0.75,
		fillColor: "blue",
		fillDirection: "down",
		fillAdjustment:{
			top: 10,
			bottom: 10
		},
		fillText:{
			size: "35px"
		}
	});

	$("#beer").AwesomeVisuals({
		fontawesomeIcon: "beer",
		fillProportion: 0.65,
		fillColor: 'orange',
		fillAdjustment:{
			top: 25,
			bottom: 25
		},
		fillText:{
			marginLeft: "60px"
		}
	});

	$("#beer").AwesomeVisuals("update", 0.3);

}();