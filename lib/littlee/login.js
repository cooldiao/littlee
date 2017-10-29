var Login = {
	index: function(data){
		(!!data) && (Data.backup = data);
		params = {};
		params.method = "render";
		params.template = "login";
		params.isback = 'false';
		params.data = {};
		Ajax.query(params);
	}
};