var mapPort;

chrome.runtime.onConnect.addListener(function(port) {
	if(port.name == 'map'){
		mapPort = port;
		mapPort.onMessage.addListener(function(msg) {
			console.log(msg);
			if (msg.request == "getUncaught"){
				ajaxPost(msg.url, msg.data, function (data){
					console.log(data.treasure_map);
					if(data.treasure_map.groups !== null && data.treasure_map.groups !== undefined){
						var arrUncaught = [];
						for(var i=0;i<data.treasure_map.groups.length;i++){
							if(data.treasure_map.groups[i].is_uncaught === true){
								for(var j=0;j<data.treasure_map.groups[i].mice.length;j++){
									arrUncaught.push(data.treasure_map.groups[i].mice[j].name);
								}
							}
						}
						mapPort.postMessage({
							obj : msg.objMapHunting,
							array : arrUncaught
						});
					}
				}, function (error){
					console.error('mapPort ajax:',error);
					mapPort.postMessage([]);
				});
			}
			else if(msg.request == "discard"){
				ajaxPost(msg.url, msg.data, function (data){
				}, function (error){
					console.error('mapPort ajax:',error);
				});
			}
		});
	}
});

function ajaxPost(postURL, objData, callback, throwerror){
	try {
		jQuery.ajax({
			type: 'POST',
			url: postURL,
			data: objData,
			contentType: 'application/x-www-form-urlencoded',
			dataType: 'json',
			xhrFields: {
				withCredentials: false
			},
			success: callback,
			error: throwerror, 
		});
	}
	catch (e) {
		throwerror();
	}
}