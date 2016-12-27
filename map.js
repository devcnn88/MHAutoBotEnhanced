mapSolver();

function mapSolver(){
	var classMiceGroups = document.getElementsByClassName('treasureMapPopup-mice-groups');
	if(classMiceGroups.length > 0){
		var strMouseName,strTemp,strCurrentZone;
		var strMouseLocation = arrMouseLocation.join(",") + ",";
		var i,nIndex,nIndex1;
		var arrTemp = [];
		var classUncaught = document.getElementsByClassName('treasureMapPopup-mice-group-mouse-name');
		var userVariable = JSON.parse(getPageVariable('JSON.stringify(user.quests.QuestWinterHunt2016)'));
		for(i=0;i<userVariable.sprites.length;i++){
			if(userVariable.sprites[i].css_class.indexOf('active') > -1){ // current zone
				if(parseInt(userVariable.meters_remaining)===0)
					i++;
				nIndex = userVariable.sprites[i].name.indexOf("(");
				strCurrentZone = userVariable.sprites[i].name.substr(0,nIndex-1);
				break;
			}
		}
		for(i=0;i<classUncaught.length;i++){
			strMouseName = classUncaught[i].textContent;
			if(classUncaught[i].getAttribute('style') === null || classUncaught[i].getAttribute('style') === undefined){
				nIndex = strMouseLocation.indexOf(strMouseName);
				if(nIndex > -1){
					nIndex1 = strMouseLocation.indexOf(",", nIndex);
					strTemp = strMouseLocation.substring(nIndex,nIndex1);
					arrTemp = strTemp.split("|");
					arrTemp.splice(0,1);
					if(arrTemp.length > 0){
						if(strTemp.indexOf(strCurrentZone) > -1)
							classUncaught[i].setAttribute('style', 'color:red');
					}
				}
			}
			else
				break;
		}
	}
	window.setTimeout(function () { mapSolver(); }, 1000);
}

function getPageVariable(variableName) {
    var value;
	try {
		if (browser == 'chrome') {
			// google chrome only
			var scriptElement = document.createElement("script");
			scriptElement.setAttribute('id', "scriptElement");
			scriptElement.setAttribute('type', "text/javascript");
			scriptElement.innerHTML = "document.getElementById('scriptElement').innerText=" + variableName + ";";
			document.body.appendChild(scriptElement);

			value = scriptElement.innerHTML;
			document.body.removeChild(scriptElement);
			scriptElement = null;
			variableName = null;
		}
		else {
			value = eval(variableName + ';');
		}
		return value;
	}
	catch (e) {
		console.perror('getPageVariable',e.message);
		return "";
	}
}

var arrMouseLocation  = [
	"Black Diamond Racer Mouse|Frosty Mountains",
	"Borean Commander Mouse|Winter Wasteland",
	"Builder Mouse|Snowball Storm",
	"Candy Cane Mouse|Decorative Oasis|Tinsel Forest",
	"Christmas Tree Mouse|Decorative Oasis|Tinsel Forest",
	"Confused Courier Mouse",
	"Destructoy Mouse|Toy Lot|Toy Emporium",
	"Double Black Diamond Racer Mouse|Frosty Mountains",
	"Elf MouseElf Mouse|Winter Wonderland",
	"Free Skiing Mouse|Bunny Hills|Frosty Mountains",
	"Frigid Foreman Mouse|Winter Wasteland",
	"Gingerbread Mouse",
	"Glacia Ice Fist|Winter Wasteland",
	"Great Winter Hunt Impostor|Winter Wonderland",
	"Greedy Al",
	"Hoarder Mouse",
	"Joy MouseJoy Mouse|Winter Wonderland",
	"Mad Elf MouseMad Elf Mouse|Toy Emporium",
	"Miser MouseMiser Mouse",
	"Missile Toe Mouse|Tinsel Forest",
	"Mouse of Winter Future|Winter Wasteland|Winter Wonderland",
	"Mouse of Winter Past|Winter Wasteland|Winter Wonderland",
	"Mouse of Winter Present|Winter Wasteland|Winter Wonderland",
	"Nitro Racer Mouse|Frosty Mountains",
	"Nutcracker Mouse|Toy Emporium",
	"Ornament Mouse|Tinsel Forest",
	"Present Mouse",
	"Rainbow Racer Mouse|Frosty Mountains",
	"Reinbo|Snowball Storm",
	"Ribbon Mouse|Decorative Oasis|Tinsel Forest",
	"Ridiculous Sweater Mouse|Toy Lot|Toy Emporium",
	"S.N.O.W. Golem Mouse|Snowball Storm",
	"Scrooge Mouse",
	"Slay Ride Mouse|Toy Emporium",
	"Snow Boulder Mouse|Winter Wasteland",
	"Snow Fort Mouse|Snowball Storm",
	"Snow Scavenger|Winter Wasteland",
	"Snow Sorceress|Snowball Storm",
	"Snowball Hoarder Mouse|Snowball Storm",
	"Snowblower Mouse|Snowball Storm ",
	"Snowflake Mouse",
	"Snowglobe Mouse|Decorative Oasis|Tinsel Forest",
	"Sporty Ski Instructor Mouse|Bunny Hills|Frosty Mountains",
	"Squeaker Claws|Toy Emporium",
	"Stocking Mouse|Tinsel Forest",
	"Stuck Snowball Mouse|Snowball Storm",
	"Toboggan Technician Mouse|Bunny Hills|Frosty Mountains",
	"Toy Mouse|Toy Lot|Toy Emporium",
	"Toy Tinkerer Mouse|Toy Lot|Toy Emporium",
	"Triple Lutz Mouse",
	"Tundra Huntress Mouse|Snowball Storm",
	"Wreath Thief Mouse|Tinsel Forest",
	"Young Prodigy Racer Mouse|Bunny Hills|Frosty Mountains"
];