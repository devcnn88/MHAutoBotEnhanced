var classElement = undefined;
mapSolver();

function mapSolver(){
	if(document.getElementById('inputOpenMapSolver') === null){
		var classMiceGroups = document.getElementsByClassName('treasureMapPopup-mice-groups');
		if(classMiceGroups.length > 0){
			var i,j;
			var arrUncaught = [];
			var classMouseName;
			for(i=0;i<classMiceGroups.length;i++){
				if(classMiceGroups[i].getAttribute('class').toLowerCase().indexOf('uncaught') > -1){
					classMouseName = classMiceGroups[i].getElementsByClassName('treasureMapPopup-mice-group-mouse-name');
					for(j=0;j<classMouseName.length;j++){
						arrUncaught.push(classMouseName[j].textContent);
					}
				}
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