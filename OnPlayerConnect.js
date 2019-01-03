let spawncam = mp.cameras.new('spawncam', new mp.Vector3(-401.6108, 1050.37, 323.8428), new mp.Vector3(0,0,0), 80);
const player = mp.players.local;

mp.events.add("playerSpawn", playerSpawn);
  function playerSpawn(player) { 
	
	spawncam.setActive(true);
	mp.game.cam.renderScriptCams(true, false, 0, true, false);
	mp.gui.chat.show(true);
	mp.game.ui.displayHud(false);
	mp.game.ui.displayRadar(false);
	mp.gui.cursor.visible=true;
	mp.events.callRemote("StartLogRegSystem");

	
	
  }
mp.events.add(
{
    "LoggedIn" : player =>
    {
		spawncam.setActive(false);
		mp.game.cam.renderScriptCams(false, false, 0, false, false);	
		mp.gui.chat.show(true);
		mp.game.ui.displayHud(true);
		mp.game.ui.displayRadar(true);
		mp.gui.cursor.visible=false;
    }

});
  mp.keys.bind(0x4D, true, function() {
  	if(!spawncam.isActive()) {
		spawncam.setActive(true);
		mp.game.cam.renderScriptCams(true, false, 0, true, false);	
		mp.gui.chat.show(true);
		mp.game.ui.displayHud(false);
		mp.game.ui.displayRadar(false);
		mp.gui.cursor.visible=true;
		
	
	}
	else {
		spawncam.setActive(false);
		mp.game.cam.renderScriptCams(false, false, 0, false, false);	
		mp.gui.chat.show(true);
		mp.game.ui.displayHud(true);
		mp.game.ui.displayRadar(true);
		mp.gui.cursor.visible=false;

	}
	


});