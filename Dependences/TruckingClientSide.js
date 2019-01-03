let truckingpos = new mp.Vector3(902.3652, -1259.04, 24.6);
mp.labels.new("~w~Use ~r~/trucking", new mp.Vector3(902.3652, -1259.04, 25.5),
{
    los: true,
    font: 0,
    drawDistance: 15,
	color: [255, 102, 102, 255],
});
mp.markers.new(1, truckingpos, 1.5,
{
    color: [255, 255, 255, 255],
    visible: true,
    dimension: 0
});

 mp.events.add("playerSpawn", playerSpawn);
 function playerSpawn(player) {
  }
mp.events.add('SwitchTrailerOption', (result) => {
	switch(result)
	{
		case 1:
			mp.gui.chat.push("You Pressed Tanker");
			break;
		case 2:
			mp.gui.chat.push("You Pressed Logs");
			break;
		case 3:
			mp.gui.chat.push("You Pressed Container");
			break;
		case 4:
			mp.gui.chat.push("You Pressed Vehicles");
			break;
	}

});