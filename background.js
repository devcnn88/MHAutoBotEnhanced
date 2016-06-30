var mainPort;
var trapsPort;
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
});