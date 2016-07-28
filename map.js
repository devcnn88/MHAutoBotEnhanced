var classElement = undefined;
mapSolver();

function mapSolver(){
	if(document.getElementById('inputOpenMapSolver') === null){
		classElement = document.querySelectorAll('.treasureMapPopup-mice-groups.uncaughtmice .treasureMapPopup-mice-group-mouse-name span');
		if(classElement.length > 0){
			var arrUncaught = [];
			for(var i=0;i<classElement.length;i++){
				arrUncaught.push(classElement[i].textContent);
			}
			if(arrUncaught.length > 0){
				var btn = document.createElement('input');
				btn.setAttribute('id', 'inputOpenMapSolver');
				btn.setAttribute('value', 'Open Map Solver');
				btn.onclick = "window.open(http://olf.github.io/mhmapsolver/?mice=" + encodeURI(arrUncaught.join('/')) + ",'mhmapsolver')";
				document.getElementsByClassName("treasureMapPopup-header hasImage")[0].appendChild(btn);
			}
		}
	}
	window.setTimeout(function () { mapSolver(); }, 1000);
}