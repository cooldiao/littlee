var ErrReport = {
	report: function(content){
		var data = {user: conf.user.username, uuid: device.uuid, data: JSON.stringify(content)};
		Ajax.post('errReport/report', data, function(json){});
	}
};