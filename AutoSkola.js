let ASpos = new mp.Vector3(-177.284, -1157.127, 23.11159);
const player = mp.players.local;
mp.events.add("playerSpawn", playerSpawn);
var IsActiveMenu = false;
let autoskola;
var SelectedCat = 0; // No Category 
let ispit;
let vehicle;
var AverageSpeed = [8];
let CheckPointsB = [8];
let CheckPointsC = [7];
var index = 0;
var RenderFailed = false;
let Unloading = false;
var IsPlayerTakingAnyTest = false;
var CheckPointsBCategoryPos = 
[
	new mp.Vector3(-128.5171, -1148.238, 24.80812),
	new mp.Vector3(-115.293, -1343.01, 28.68881),
	new mp.Vector3(-188.8923, -1486.446, 31.36286),
	new mp.Vector3(-8.588225, -1638.024, 28.6831),
	new mp.Vector3(112.4473, -1637.574, 28.75181),
	new mp.Vector3(82.57404, -1495.889, 28.67627),
	new mp.Vector3(118.2195, -1357.424, 28.66335),		
	new mp.Vector3(-63.59769, -1131.699, 25.21777),	
	new mp.Vector3(-224.6678, -1126.237, 22.43626)		
];

var CheckPointsCCategoryPos = 
[
	new mp.Vector3(-7.765841, -1111.522, 28.24168),
	new mp.Vector3(1122.318, -779.476, 57.34518),
	new mp.Vector3(902.6367, -143.0449, 76.83196),
	new mp.Vector3(580.9774, 134.5538, 98.27599),
	new mp.Vector3(-1568.396, -238.646, 49.70993),
	new mp.Vector3(-1606.062, -1033.454, 13.32606),
	new mp.Vector3(-686.0786, -885.0862, 24.73358),		
	new mp.Vector3(-238.4755, -1175.829, 22.608)
];

var CheckPointsCCategoryRotations = 
[
	162,
	356,
	325,
	250,
	143,
	228,
	273,		
	144
];


function playerSpawn(player) {
	mp.labels.new("~r~Driving school~n~~w~Use button ~r~/E~w~ to enter it.", ASpos,
	{
		los: true,
		font: 0,
		drawDistance: 15,
		color: [255, 102, 102, 255],
	});
	mp.markers.new(1, new mp.Vector3(-177.284, -1157.127, 22.11159), 1.5,
	{
		color: [255, 255, 255, 255],
		visible: true,
		dimension: 0
	});
	mp.game.ui.setNewWaypoint(player.position.x, player.position.y);	// brise waypoint sljedeci (bug)
}

 mp.keys.bind(0x45, true, function() {
	mp.gui.chat.push("You have successfully pressed button.");
	if(mp.game.gameplay.getDistanceBetweenCoords(player.position.x, player.position.y, player.position.z, -177.284, -1157.127, 23.11159, true) < 2.5)
	{
		if(IsActiveMenu == false)
		{
			autoskola = mp.browsers.new('package://MyProject/index.html');﻿
			IsActiveMenu = true;
			mp.gui.cursor.show(true, true);
		}


	
	}
});
 mp.keys.bind(0x32, true, function() {
	player.position = new mp.Vector3(-219.8647, -1171.897, 22.26661);
	mp.players.local.setMoney(2250);

});
 mp.keys.bind(0x72, true, function() {
	vehicle = mp.players.local.vehicle;
	mp.gui.chat.push("!{blue}Instructor!{#ffffff}: Go right.. Please watch for red lights and speed limits.");
	CheckPointsB[index] = mp.checkpoints.new(0, CheckPointsBCategoryPos[index], 3,
	{
		direction: new mp.Vector3(0, 0, 75),
		color: [ 255, 0, 0, 255 ],
		visible: true,
		dimension: 0
	});
	mp.game.ui.setNewWaypoint(CheckPointsBCategoryPos[index].x, CheckPointsBCategoryPos[index].y);

});

 mp.keys.bind(0x73, true, function() {
	vehicle = mp.players.local.vehicle;
	mp.gui.chat.push("!{blue}Instructor!{#ffffff}: Lets go deliver some materials for shops and restaurants.");
	mp.gui.chat.push("!{blue}Instructor!{#ffffff}: You need to park backwards your vehicle so it is easier to unload materials.");
	CheckPointsC[index] = mp.checkpoints.new(1, CheckPointsCCategoryPos[index], 3,
	{
		direction: new mp.Vector3(0, 0, CheckPointsCCategoryRotations[index]),
		color: [ 255, 0, 0, 255 ],
		visible: true,
		dimension: 0
	});
	mp.game.ui.setNewWaypoint(CheckPointsCCategoryPos[index].x, CheckPointsCCategoryPos[index].y);

});
mp.events.add('render', () => {
 	if(RenderFailed)
	{		
		mp.game.graphics.drawText("Failed", [0.5, 0.5], { 
			font: 7, 
			color: [255, 75, 75, 245], 
			scale: [1.5, 1.5], 
			outline: true
		});		
	}
 	if(Unloading)
	{		
		mp.game.graphics.drawText("Unloading ...", [0.5, 0.5], { 
			font: 7, 
			color: [113, 181, 107, 245], 
			scale: [1.5, 1.5], 
			outline: true
		});		
	}
});
mp.events.add("playerEnterCheckpoint", (checkpoint) => {
	
	if(checkpoint == CheckPointsB[index] && index <= 8)
	{	

		// -------------------------  TO DO COMMANDS ---------------------------------------
		CheckPointsB[index].visible = false;	
		mp.game.audio.playSound(-1, "Nav_Arrow_Ahead", "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", true, 0, true);
		AverageSpeed[index] = vehicle.getSpeed()*3.6;
		mp.gui.chat.push(`${AverageSpeed[index]}`);
		if(index == CheckPointsBCategoryPos.length-1) 
		{
			var SumOfAverage = 0;
			for (var i = 1; i < AverageSpeed.length; i++) { 
				SumOfAverage = AverageSpeed[i] + SumOfAverage;
				mp.gui.chat.push(`${SumOfAverage}`);						
			}
			SumOfAverage = SumOfAverage / AverageSpeed.length;
			if(SumOfAverage <= 60 && SumOfAverage >= 30 && vehicle.isDamaged() == false)
			{
				mp.gui.chat.push(`!{green}you passed test`);				
				index = 0;
				IsPlayerTakingAnyTest = false;
				player.removeFromVehicle();
			}
			
			else 
			{ 
				mp.gui.chat.push(`you failed test`);
				index = 0;
				IsPlayerTakingAnyTest = false;
				player.removeFromVehicle();
			}
			mp.gui.chat.push(`${parseInt(SumOfAverage)} is average speed`);			
		}
		// ----------------------------------------------------------------------------------
		if(index < CheckPointsBCategoryPos.length-1)
		{
			index ++;
			CheckPointsB[index] = mp.checkpoints.new(0, CheckPointsBCategoryPos[index], 3,
			{
				direction: new mp.Vector3(0, 0, 0),
				color: [ 255, 0, 0, 255 ],
				visible: true,
				dimension: 0
			});		
			mp.game.ui.setNewWaypoint(CheckPointsBCategoryPos[index].x, CheckPointsBCategoryPos[index].y);			
		}
		
		return;					
	}
	
	else if(checkpoint == CheckPointsC[CheckPointsCCategoryPos.length-1])
	{
		mp.gui.chat.push("!{green}you passed test");		
		index = 0;
		RenderFailed = false;
		Unloading = false;
		IsPlayerTakingAnyTest = false;
		CheckPointsC[CheckPointsCCategoryPos.length-1].visible = false;
		return;		
	}
	else if(checkpoint == CheckPointsC[index] && index <= 7)
	{
		if(vehicle.getBodyHealth() >= 900 && vehicle.getBodyHealth() <= 980)
		{
			mp.gui.chat.push("!{blue}Instructor!{#ffffff}: It seems like you damaged my truck a little bit! Please be careful!");
		}
		else if(vehicle.getBodyHealth() < 900) {
			CheckPointsC[index].visible = false;
			mp.gui.chat.push("!{blue}Instructor!{#ffffff}: Sorry you damaged my truck, get out you failed!");
			player.removeFromVehicle();
			index = 0;
			IsPlayerTakingAnyTest = false;		
			mp.game.graphics.notify('~r~You failed ~n~~w~You damaged insturctors truck too much.');
			RenderFailed = true;
			setInterval(() => {
					RenderFailed = false;
				
			}, 3500);
			mp.game.audio.playSound(-1, "CHECKPOINT_MISSED", "HUD_MINI_GAME_SOUNDSET", true, 0, true);	
			return;
		}
	
		else if(player.getHeading() > CheckPointsCCategoryRotations[index]-10 && player.getHeading() < CheckPointsCCategoryRotations[index]+10 && index != CheckPointsCCategoryPos.length)
		{
			CheckPointsC[index].visible = false;	
			mp.game.audio.playSound(-1, "Nav_Arrow_Ahead", "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS", true, 0, true);
			Unloading = true;
			vehicle.freezePosition(true);
			player.freezePosition(true);	
			UnLoadingTimer = setInterval(() => {
				vehicle.freezePosition(false);
				player.freezePosition(false);
				Unloading = false;	
				clearInterval(UnLoadingTimer);
				UnLoadingTimer = null;
			}, 5000);			
			// ----------------------------------------------------------------------------------
			if(index < CheckPointsCCategoryPos.length-1)
			{
				CheckPointsC[index] = null;
				index ++;
				CheckPointsC[index] = mp.checkpoints.new(1, CheckPointsCCategoryPos[index], 3,
				{
					direction: new mp.Vector3(0, 0, 75),
					color: [ 255, 0, 0, 255 ],
					visible: true,
					dimension: 0
				});		
				mp.game.ui.setNewWaypoint(CheckPointsCCategoryPos[index].x, CheckPointsCCategoryPos[index].y);			
			}
			
			return;	
		}

		else
		{
			mp.gui.chat.push("!{blue}Instructor!{#ffffff}: Park backwards then we will go to next point!");
		}
	}
});
mp.events.add('CheckMoney', (money, category) => {
	if(player.getMoney() >= money)
	{
	mp.gui.chat.push("!{#ffff66}Warning!{#ffffff}: Test will start soon, please wait.");	
		SelectedCat = category;
		autoskola.destroy();
		IsActiveMenu = false;
		ispit = mp.browsers.new('package://MyProject/DStest.html');﻿	
			
	}
	else
	{
		mp.gui.chat.push("!{#ffff66}Warning!{#ffffff}: Sorry, you dont have enough money to start test.");
	}
});


mp.events.add('QuitDrivingSchool', () =>﻿ {

	autoskola.destroy();
	IsActiveMenu = false;
	mp.gui.cursor.show(false, false);
});
mp.events.add('QuitDrivingTest', () =>﻿ {

	ispit.destroy();
	IsActiveMenu = false;
	mp.gui.cursor.show(false, false);
	
});
mp.events.add('GoToDrivingTest', () =>﻿ {
	ispit.destroy();
	IsActiveMenu = false;
	mp.gui.cursor.show(false, false);
	mp.gui.chat.push("!{#80ff80}Info!{#ffffff}: Go to driving school parking and get into vehicle.");
	switch(SelectedCat)
	{
		case 1:  // B category
		{
			mp.events.callRemote("SpawnDrivingVehicle", player, 1);
		
			break;
		}
		case 2:  // C category
		{
			mp.events.callRemote("SpawnDrivingVehicle", player, 2);
	
			break;
		}
		case 3:  // CE category
		{
			mp.events.callRemote("SpawnDrivingVehicle", player, 3);
		
			break;
		}
		case 4:  // F,G category
		{
			mp.events.callRemote("SpawnDrivingVehicle", player, 4);

			break;
		}
		default:
		{
			mp.gui.chat.push("!{#ff6666}Error!{#ffffff}: Driving school unexpected error, please call administrator.");
		}
	}
});
mp.events.add('StartBCategory', () =>﻿ {
	if(!IsPlayerTakingAnyTest)
	{
		IsPlayerTakingAnyTest = true;
	}
	else { mp.gui.chat.push("!{#ff6666}Error!{#ffffff}: You are already in driving test. Please finish it first"); }

});



mp.events.add('StartCCECategory', () =>﻿ {
	if(!IsPlayerTakingAnyTest)
	{
		IsPlayerTakingAnyTest = true;
	}
	else { mp.gui.chat.push("!{#ff6666}Error!{#ffffff}: You are already in driving test. Please finish it first"); }

	
});

mp.events.add('StartFGCategory', () =>﻿ {
	if(!IsPlayerTakingAnyTest)
	{
		IsPlayerTakingAnyTest = true;
	}
	else { mp.gui.chat.push("!{#ff6666}Error!{#ffffff}: You are already in driving test. Please finish it first"); }

	
});
