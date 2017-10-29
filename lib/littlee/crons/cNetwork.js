var CNetwork = {
	time: 0,
	run: function(){
		if(app.is_phonegap){
			if(CNetwork.time == 1){
				app.checkNetwork();
				CNetwork.time = 0;
			}else{
				CNetwork.time += 1;
			}
		}
	}
}
cron.CNetwork = CNetwork;