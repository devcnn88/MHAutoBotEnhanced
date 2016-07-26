var mainPort;
var trapsPort;
var mapPort;

chrome.runtime.onConnect.addListener(function(port) {
	if(port.name == 'main'){
		mainPort = port;
		mainPort.onMessage.addListener(function(msg) {
			if (msg.request == "get"){
				if(trapsPort !== null && trapsPort !== undefined){
					trapsPort.postMessage(msg);
				}
			}
		});
	}
	else if(port.name == 'traps'){
		trapsPort = port;
		trapsPort.onMessage.addListener(function(msg) {
			if (Array.isArray(msg.result)){
				if(mainPort !== null && mainPort !== undefined){
					mainPort.postMessage(msg);
				}
			}
		});
	}
	else if(port.name == 'map'){
		mapPort = port;
		mapPort.onMessage.addListener(function(msg) {
			console.log(msg);
			if (msg.request == "getUncaught"){
				var objData = {
					sn : 'Hitgrab',
					hg_is_ajax : 1,
					action : 'info',
					uh : msg.unique_hash
				};
				ajaxPost(msg.url, objData, function (data){
					console.log(data.treasure_map);
					if(data.treasure_map.groups !== null && data.treasure_map.groups !== undefined){
						var arrUncaught = new Array(data.treasure_map.groups[0].mice.length);
						for(var i=0;i<data.treasure_map.groups[0].mice.length;i++){
							arrUncaught[i] = data.treasure_map.groups[0].mice[i].name;
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