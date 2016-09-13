// ==UserScript==
// @name        MouseHunt AutoBot Enhanced Edition
// @author      Ooi Keng Siang, CnN
// @version    	1.32.7
// @namespace   http://ooiks.com/blog/mousehunt-autobot, https://devcnn.wordpress.com/
// @description Ooiks: An advance user script to automate sounding the hunter horn in MouseHunt application in Facebook with MouseHunt version 3.0 (Longtail) supported and many other features. CnN: An enhanced version to sound horn based on selected algorithm of event or location.
// @require		https://code.jquery.com/jquery-2.2.2.min.js
// @include		http://mousehuntgame.com/*
// @include		https://mousehuntgame.com/*
// @include		http://www.mousehuntgame.com/*
// @include		https://www.mousehuntgame.com/*
// @include		http://apps.facebook.com/mousehunt/*
// @include		https://apps.facebook.com/mousehunt/*
// @include		http://hi5.com/friend/games/MouseHunt*
// @include		http://mousehunt.hi5.hitgrab.com/*
// @grant		unsafeWindow
// @downloadURL	https://greasyfork.org/scripts/5705-mousehunt-autobot-enhanced-edition/code/MouseHunt%20AutoBot%20Enhanced%20Edition.user.js
// @updateURL	https://greasyfork.org/scripts/5705-mousehunt-autobot-enhanced-edition/code/MouseHunt%20AutoBot%20Enhanced%20Edition.meta.js
// ==/UserScript==

// == Basic User Preference Setting (Begin) ==
// // The variable in this section contain basic option will normally edit by most user to suit their own preference
// // Reload MouseHunt page manually if edit this script while running it for immediate effect.

// // Extra delay time before sounding the horn. (in seconds)
// // Default: 5 - 180
var hornTimeDelayMin = 10;
var hornTimeDelayMax = 30;

// // Bot aggressively by ignore all safety measure such as check horn image visible before sounding it. (true/false)
// // Note: Highly recommended to turn off because it increase the chances of getting caught in botting.
// // Note: It will ignore the hornTimeDelayMin and hornTimeDelayMax.
// // Note: It may take a little bit extra of CPU processing power.
var aggressiveMode = false;

// // Enable trap check once an hour. (true/false)
var enableTrapCheck = true;

// // Trap check time different value (00 minutes - 45 minutes)
// // Note: Every player had different trap check time, set your trap check time here. It only take effect if enableTrapCheck = true;
// // Example: If you have XX:00 trap check time then set 00. If you have XX:45 trap check time, then set 45.
var trapCheckTimeDiff = 00;

// // Extra delay time to trap check. (in seconds)
// // Note: It only take effect if enableTrapCheck = true;
var checkTimeDelayMin = 5;
var checkTimeDelayMax = 10;

// // Play sound when encounter king's reward (true/false)
var isKingWarningSound = false;

// // Auto solve KR
var isAutoSolve = false;

// // Extra delay time before solving KR. (in seconds)
// // Default: 10 - 30
var krDelayMin = 10;
var krDelayMax = 30;

// // Time to start and stop solving KR. (in hours, 24-hour format)
// // Example: Script would not auto solve KR between 00:00 - 6:00 when krStopHour = 0 & krStartHour = 6;
// // To disable this feature, set both to the same value.
var krStopHour = 0;
var krStartHour = 6;

// // Extra delay time to start solving KR after krStartHour. (in minutes)
var krStartHourDelayMin = 10;
var krStartHourDelayMax = 30;

// // Maximum retry of solving KR.
// // If KR solved more than this number, pls solve KR manually ASAP in order to prevent MH from caught in botting
var kingsRewardRetryMax = 3;

// // State to indicate whether to save KR image into localStorage or not
var saveKRImage = true;

// // Maximum number of KR image to be saved into localStorage
var maxSaveKRImage = 75;

// // The script will pause if player at different location that hunt location set before. (true/false)
// // Note: Make sure you set showTimerInPage to true in order to know what is happening.
var pauseAtInvalidLocation = false;

// // Time to wait after trap selector clicked (in second)
var secWait = 7;

// // Stop trap arming after X retry
var armTrapRetry = 3;

// // Maximum number of log to be saved into sessionStorage
var maxSaveLog = 500;

// == Basic User Preference Setting (End) ==





// == Advance User Preference Setting (Begin) ==
// // The variable in this section contain some advance option that will change the script behavior.
// // Edit this variable only if you know what you are doing
// // Reload MouseHunt page manually if edit this script while running it for immediate effect.

// // Display timer and message in page title. (true/false)
var showTimerInTitle = false;

// // Embed a timer in page to show next hunter horn timer, highly recommanded to turn on. (true/false)
// // Note: You may not access some option like pause at invalid location if you turn this off.
var showTimerInPage = true;

// // Display the last time the page did a refresh or reload. (true/false)
var showLastPageLoadTime = true;

// // Default time to reload the page when bot encounter error. (in seconds)
var errorReloadTime = 60;

// // Time interval for script timer to update the time. May affect timer accuracy if set too high value. (in seconds)
var timerRefreshInterval = 1;

// // Trap arming status
var LOADING = -1;
var NOT_FOUND = 0;
var ARMED = 1;

// // Trap List
var objTrapList = {
	weapon : [],
	base : [],
	trinket : [],
	bait : []
};

// // Trap Collection
var objTrapCollection = {
	weapon: ["Crystal Mineral Crusher Trap","Biomolecular Re-atomizer Trap","Chrome Arcane Capturing Rod","Law Laser Trap","Zugzwang's Ultimate Move","2010 Blastoff Trap","2012 Big Boom Trap","500 Pound Spiked Crusher","Ambrosial Portal","Ambush","Ancient Box Trap","Ancient Gauntlet","Ancient Spear Gun","Arcane Blast Trap","Arcane Capturing Rod Of Never Yielding Mystery","Bandit Deflector","Birthday Candle Kaboom","Birthday Party Piñata Bonanza","Blackstone Pass Trap","Bottomless Grave","Brain Extractor","Bubbles: The Party Crasher Trap","Cackle Lantern Trap","Candy Crusher Trap","Chesla's Revenge","Christmas Cracker Trap","Chrome DeathBot","Chrome DrillBot","Chrome MonstroBot","Chrome Nannybot","Chrome Oasis Water Node Trap","Chrome Onyx Mallet","Chrome Phantasmic Oasis Trap","Chrome RhinoBot","Chrome Sphynx Wrath","Chrome Tacky Glue Trap","Clockapult of Time","Clockapult of Winter Past","Clockwork Portal Trap","Crystal Crucible Trap","Crystal Tower","Digby DrillBot","Dimensional Chest Trap","Double Diamond Adventure","Dragon Lance","Dreaded Totem Trap","Endless Labyrinth Trap","Engine Doubler","Enraged RhinoBot","Event Horizon","Explosive Toboggan Ride","Festive Gauntlet Crusher","Fluffy DeathBot","Focused Crystal Laser","The Forgotten Art of Dance","Forgotten Pressure Plate Trap","Giant Speaker","Gingerbread House Surprise","Glacier Gatler","Gorgon Trap","Grand Arcanum Trap","Grungy DeathBot","Harpoon Gun","Heat Bath","High Tension Spring","HitGrab Horsey","HitGrab Rainbow Rockin' Horse","HitGrab Rockin' Horse","Horrific Venus Mouse Trap","Ice Blaster","Ice Maiden","Icy RhinoBot","Infinite Labyrinth Trap","Isle Idol Trap","Isle Idol Trap","Isle Idol Trap","Kraken Chaos","The Law Draw","Maniacal Brain Extractor","Mouse DeathBot","Mouse Hot Tub","Mouse Mary O'Nette","Mouse Rocketine","Mouse Trebuchet","Multi-Crystal Laser","Mutated Venus Mouse Trap","Mysteriously unYielding Null-Onyx Rampart of Cascading Amperes","Mystic Pawn Pincher","Nannybot","Net Cannon","Ninja Ambush Trap","Nutcracker Nuisance Trap","NVMRC Forcefield Trap","Oasis Water Node Trap","Obelisk of Incineration","Obelisk of Slumber","Obvious Ambush Trap","Onyx Mallet","PartyBot","Phantasmic Oasis Trap","Pneumatic Tube Trap","Pumpkin Pummeler","Reaper's Perch","Rewers Riposte","RhinoBot","Rune Shark Trap","S.A.M. F.E.D. DN-5","S.L.A.C.","S.L.A.C. II","S.U.P.E.R. Scum Scrubber","Sandstorm MonstroBot","Sandtail Sentinel","School of Sharks","Scum Scrubber","Shrink Ray Trap","Sinister Portal","Snow Barrage","Snowglobe Trap","Soul Catcher","Soul Harvester","Sphynx Wrath","Stale Cupcake Golem Trap","Steam Laser Mk. I","Steam Laser Mk. II","Steam Laser Mk. II (Broken!)","Steam Laser Mk. III","Supply Grabber","Swiss Army Mouse Trap","Tacky Glue Trap","Tarannosaurus Rex Trap","Technic Pawn Pincher","Temporal Turbine","Terrifying Spider Trap","Thorned Venus Mouse Trap","Ultra MegaMouser MechaBot Trap","Veiled Vine Trap","Venus Mouse Trap","Warden Slayer Trap","Warpath Thrasher","Wrapped Gift Trap","Zugzwang's First Move","Zugzwang's Last Move","Zurreal's Folly"],
	base: ["Aqua Base","Attuned Enerchi Induction Base","Bacon Base","Bamboozler Base","Birthday Cake Base","Birthday Dragée Cake Base","Bronze Tournament Base","Candy Cane Base","Carrot Birthday Cake Base","Cheesecake Base","Chocolate Birthday Cake Base","Claw Shot Base","Crushed Birthday Cake Base","Cupcake Birthday Base","Deep Freeze Base","Dehydration Base","Depth Charge Base","Dragon Jade Base","Eerie Base","Eerier Base","Enerchi Induction Base","Explosive Base","Extra Sweet Cupcake Birthday Base","Fan Base","Firecracker Base","Fissure Base","Fracture Base","Gingerbread Base","Golden Tournament Base","Hearthstone Base","Horse Jade Base","Hothouse Base","Jade Base","Labyrinth Base","Living Base","Magma Base","Magnet Base","Minotaur Base","Molten Shrapnel Base","Monkey Jade Base","Monolith Base","Papyrus Base","Physical Brace Base","Polar Base","Polluted Base","Refined Pollutinum Base","Remote Detonator Base","Rift Base","Runic Base","Seasonal Base","Sheep Jade Base","Silver Tournament Base","Skello-ton Base","Snake Jade Base","Soiled Base","Spellbook Base","Spiked Base","Stone Base","Tidal Base","Tiki Base","Tribal Base","Tribal Kaboom Base","Washboard Base","Wooden Base","Wooden Base with Target"],
	bait: ["Ancient Cheese","Arctic Asiago Cheese","Ascended Cheese","Brie Cheese","Brie String Cheese","Candy Corn Cheese","Checkmate Cheese","Cheddar Cheese","Cherry Cheese","Combat Cheese","Creamy Havarti Cheese","Crunchy Cheese","Crunchy Havarti Cheese","Cupcake Colby","Dewthief Camembert","Diamond Cheese","Duskshade Camembert","Extra Sweet Cupcake Colby","Festive Feta","Fishy Fromage","Fusion Fondue","Galleon Gouda","Gauntlet Cheese Tier 2","Gauntlet Cheese Tier 3","Gauntlet Cheese Tier 4","Gauntlet Cheese Tier 5","Gauntlet Cheese Tier 6","Gauntlet Cheese Tier 7","Gauntlet Cheese Tier 8","Gemstone Cheese","Ghoulgonzola Cheese","Gilded Cheese","Gingerbread Cheese","Glowing Gruyere Cheese","Glutter Cheese","Gnarled Cheese","Gouda Cheese","Graveblossom Camembert","Grilled Cheese","Gumbo Cheese","Inferno Havarti Cheese","Lactrodectus Lancashire Cheese","Limelight Cheese","Lunaria Camembert","Magical Havarti Cheese","Magical String Cheese","Maki Cheese","Maki String Cheese","Marble Cheese","Marble String Cheese","Marshmallow Monterey","Master Fusion Cheese","Mineral Cheese","Moon Cheese","Mozzarella Cheese","Null Onyx Gorgonzola","Nutmeg Cheese","Onyx Gorgonzola","Polluted Parmesan Cheese","Pungent Havarti Cheese","Radioactive Blue Cheese","Rancid Radioactive Blue Cheese","Rift Combat Cheese","Rift Glutter Cheese","Rift Rumble Cheese","Rift Susheese Cheese","Riftiago Cheese","Resonator Cheese","Rockforth Cheese","Rumble Cheese","Runic Cheese","Runny Cheese","Seasoned Gouda","Shell Cheese","Snowball Bocconcini","Spicy Havarti Cheese","SUPER|brie+","Susheese Cheese","Sweet Havarti Cheese","Swiss Cheese","Swiss String Cheese","Terre Ricotta Cheese","Toxic Brie","Toxic SUPER|brie+","Undead Emmental","Vanilla Stilton Cheese","Vengeful Vanilla Stilton Cheese","White Cheddar Cheese","Wicked Gnarly Cheese"],
	trinket: ["2014 Charm","2015 Charm","2016 Charm","Airship Charm","Amplifier Charm","Ancient Charm","Antiskele Charm","Artisan Charm","Athlete Charm","Attraction Charm","Baitkeep Charm","Black Powder Charm","Blue Double Sponge Charm","Brain Charm","Bravery Charm","Cackle Charm","Cactus Charm","Candy Charm","Champion Charm","Cherry Charm","Chrome Charm","Clarity Charm","Compass Magnet Charm","Crucible Cloning Charm","Cupcake Charm","Dark Chocolate Charm","Derr Power Charm","Diamond Boost Charm","Door Guard Charm","Dragonbane Charm","Dragonbreath Charm","Dreaded Charm","Dusty Coal Charm","Eggscavator Charge Charm","Eggstra Charge Charm","Eggstra Charm","Elub Power Charm","EMP400 Charm","Empowered Anchor Charm","Enerchi Charm","Extra Spooky Charm","Extra Sweet Cupcake Charm","Extreme Ancient Charm","Extreme Attraction Charm","Extreme Luck Charm","Extreme Polluted Charm","Extreme Power Charm","Extreme Wealth Charm","Festive Ultimate Luck Charm","Festive Ultimate Power Charm","Firecracker Charm","First Ever Charm","Flamebane Charm","Forgotten Charm","Freshness Charm","Gargantua Guarantee Charm","Gemstone Boost Charm","Gilded Charm","Glowing Gourd Charm","Gnarled Charm","Golden Anchor Charm","Greasy Glob Charm","Growth Charm","Grub Salt Charm","Grub Scent Charm","Grubling Bonanza Charm","Grubling Chow Charm","Haunted Ultimate Luck Charm","Horsepower Charm","Hydro Charm","Lantern Oil Charm","Luck Charm","Lucky Power Charm","Lucky Rabbit Charm","Magmatic Crystal Charm","Mining Charm","Mobile Charm","Monger Charm","Monkey Fling Charm","Nanny Charm","Nerg Power Charm","Nightshade Farming Charm","Nitropop Charm","Oxygen Burst Charm","Party Charm","Polluted Charm","Power Charm","Prospector's Charm","Rainbow Luck Charm","Ramming Speed Charm","Red Double Sponge Charm","Red Sponge Charm","Regal Charm","Rift Power Charm","Rift Ultimate Luck Charm","Rift Ultimate Lucky Power Charm","Rift Ultimate Power Charm","Rift Vacuum Charm","Roof Rack Charm","Rook Crumble Charm","Rotten Charm","Safeguard Charm","Scholar Charm","Scientist's Charm","Searcher Charm","Shadow Charm","Shamrock Charm","Shattering Charm","Sheriff's Badge Charm","Shielding Charm","Shine Charm","Shortcut Charm","Smart Water Jet Charm","Snakebite Charm","Snowball Charm","Soap Charm","Softserve Charm","Spellbook Charm","Spiked Anchor Charm","Sponge Charm","Spooky Charm","Spore Charm","Stagnant Charm","Sticky Charm","Striker Charm","Super Ancient Charm","Super Attraction Charm","Super Brain Charm","Super Cactus Charm","Super Luck Charm","Super Nightshade Farming Charm","Super Polluted Charm","Super Power Charm","Super Regal Charm","Super Rift Vacuum Charm","Super Rotten Charm","Super Salt Charm","Super Soap Charm","Super Spore Charm","Super Warpath Archer Charm","Super Warpath Cavalry Charm","Super Warpath Commander's Charm","Super Warpath Mage Charm","Super Warpath Scout Charm","Super Warpath Warrior Charm","Super Wealth Charm","Supply Schedule Charm","Tarnished Charm","Taunting Charm","Treasure Trawling Charm","Ultimate Anchor Charm","Ultimate Ancient Charm","Ultimate Attraction Charm","Ultimate Charm","Ultimate Luck Charm","Ultimate Lucky Power Charm","Ultimate Polluted Charm","Ultimate Power Charm","Ultimate Spore Charm","Uncharged Scholar Charm","Unstable Charm","Valentine Charm","Warpath Archer Charm","Warpath Cavalry Charm","Warpath Commander's Charm","Warpath Mage Charm","Warpath Scout Charm","Warpath Warrior Charm","Water Jet Charm","Wax Charm","Wealth Charm","Wild Growth Charm","Winter Builder Charm","Winter Charm","Winter Hoarder Charm","Winter Miser Charm","Winter Screw Charm","Winter Spring Charm","Winter Wood Charm","Yellow Double Sponge Charm","Yellow Sponge Charm"]
};

// // Best weapon/base/charm/bait pre-determined by user. Edit ur best weapon/base/charm/bait in ascending order. e.g. [best, better, good]
var objBestTrap = {
	weapon : {
		arcane : ['Event Horizon','Grand Arcanum Trap','Chrome Arcane Capturing Rod','Arcane Blast Trap','Arcane Capturing Rod Of Nev'],
		draconic : ['Dragon Lance','Ice Maiden'],
		forgotten : ['Infinite Labyrinth Trap','Endless Labyrinth Trap','Crystal Crucible Trap','Stale Cupcake Golem Trap','Tarannosaurus Rex Trap','Crystal Mineral Crusher Trap','The Forgotten Art of Dance'],
		hydro : ['School of Sharks','Rune Shark Trap','Chrome Phantasmic Oasis Trap','Phantasmic Oasis Trap','Oasis Water Node Trap','Steam Laser Mk. III','Steam Laser Mk. II','Steam Laser Mk. I','Ancient Spear Gun'],
		law : ['The Law Draw','Law Laser Trap','Engine Doubler','Bandit Deflector','Supply Grabber','S.L.A.C. II','S.L.A.C.'],
		physical : ['Chrome MonstroBot','Sandstorm MonstroBot','Sandtail Sentinel','Enraged RhinoBot'],
		rift : ['Mysteriously unYielding','Multi-Crystal Laser','Focused Crystal Laser','Biomolecular Re-atomizer Trap','Crystal Tower'],
		shadow : ['Temporal Turbine','Clockwork Portal Trap','Reaper\'s Perch','Dreaded Totem Trap','Candy Crusher Trap','Clockapult of Time','Clockapult of Winter Past'],
		tactical : ['Chrome Sphynx Wrath','Sphynx Wrath','Zugzwang\'s Ultimate Move','Zugzwang\'s First Move']
	},
	base : {
		luck : ['Minotaur Base','Fissure Base','Rift Base','Attuned Enerchi Induction Base','Monkey Jade Base','Sheep Jade Base','Depth Charge Base','Horse Jade Base','Snake Jade Base','Dragon Jade Base','Eerier Base','Papyrus Base'],
		power : ['Minotaur Base','Tidal Base','Golden Tournament Base','Spellbook Base']
	}
};

// // Fiery Warpath Preference
var commanderCharm = ['Super Warpath Commander\'s', 'Warpath Commander\'s'];
var objPopulation = {
	WARRIOR : 0,
	SCOUT : 1,
	ARCHER : 2,
	CAVALRY : 3,
	MAGE : 4,
	ARTILLERY : 5,
	name : ['Warrior', 'Scout', 'Archer', 'Cavalry', 'Mage', 'Artillery']
};
var g_fwStreakLength = 15;
var objDefaultFW = {
	weapon : 'Sandtail Sentinel',
	base : 'Physical Brace',
	focusType : 'NORMAL',
	priorities : 'HIGHEST',
	cheese : new Array(g_fwStreakLength),
	charmType : new Array(g_fwStreakLength),
	special : new Array(g_fwStreakLength),
	lastSoldierConfig : 'CONFIG_GOUDA'
};

// // Living Garden Preference
var bestLGBase = ['Living Base', 'Hothouse Base'];
var bestSalt = ['Super Salt', 'Grub Salt'];
var redSpongeCharm = ['Red Double', 'Red Sponge'];
var yellowSpongeCharm = ['Yellow Double', 'Yellow Sponge'];
var spongeCharm = ['Double Sponge', 'Sponge'];

// // Sunken City Preference
// // DON'T edit this variable if you don't know what are you editing
var objSCZone = {
	ZONE_NOT_DIVE : 0,
	ZONE_DEFAULT : 1,
	ZONE_CORAL : 2,
	ZONE_SCALE : 3,
	ZONE_BARNACLE : 4,
	ZONE_TREASURE : 5,
	ZONE_DANGER : 6,
	ZONE_DANGER_PP : 7,
	ZONE_OXYGEN : 8,
	ZONE_BONUS : 9
};

var bestSCBase = ['Minotaur Base', 'Depth Charge Base'];
var objSCTrap = {
	scOxyBait : ['Fishy Fromage', 'Gouda'],
	TT : 'Treasure Trawling',
	EAC : 'Empowered Anchor',
	scAnchorTreasure : ['Golden Anchor', 'Empowered Anchor'],
	scAnchorDanger : ['Spiked Anchor', 'Empowered Anchor'],
	scAnchorUlti : ['Ultimate Anchor', 'Empowered Anchor']
};

// // Spring Egg Hunt
var chargeCharm = ['Eggstra Charge', 'Eggscavator'];
var chargeHigh = 17;
var chargeMedium = 12;

// // Labyrinth
var bestLabyBase = ['Minotaur Base', 'Labyrinth Base'];
var objCodename = {
	FEALTY : "y",
	TECH : "h",
	SCHOLAR : "s",
	TREASURY : "t",
	FARMING : "f",
	PLAIN : "p",
	SUPERIOR : "s",
	EPIC : "e",
	SHORT : "s",
	MEDIUM : "m",
	LONG : "l"
};
var arrHallwayOrder = [
'sp','mp','lp',
'ss','ms','ls',
'se','me','le'];
var objDefaultLaby = {
	districtFocus : 'None',
	between0and14 : ['lp'],
	between15and59  : ['sp','ls'],
	between60and100  : ['sp','ss','le'],
	chooseOtherDoors : false,
	typeOtherDoors : "SHORTEST_FEWEST",
	securityDisarm : false,
	lastHunt : 0,
	armOtherBase : 'false'
};
var objLength = {
	SHORT : 0,
	MEDIUM : 1,
	LONG : 2
};

// // Furoma Rift
var objFRBattery = {
	level : [1,2,3,4,5,6,7,8,9,10],
	name : ["one","two","three","four","five","six","seven","eight","nine","ten"],
	capacity : [20,45,75,120,200,310,450,615,790,975],
	cumulative : [20,65,140,260,460,770,1220,1835,2625,3600]
};

// == Advance User Preference Setting (End) ==



// WARNING - Do not modify the code below unless you know how to read and write the script.

// All global variable declaration and default value
var scriptVersion = "1.32.7 Enhanced Edition";
var fbPlatform = false;
var hiFivePlatform = false;
var mhPlatform = false;
var mhMobilePlatform = false;
var secureConnection = false;
var lastDateRecorded = new Date();
var hornTime = 900;
var hornTimeDelay = 0;
var checkTimeDelay = 0;
var isKingReward = false;
var lastKingRewardSumTime;
var baitQuantity = -1;
var huntLocation;
var currentLocation;
var today = new Date();
var checkTime;
var hornRetryMax = 10;
var hornRetry = 0;
var nextActiveTime = 900;
var timerInterval = 2;
var checkMouseResult = null;
var mouseList = [];
var discharge = false;
var arming = false;
var kingsRewardRetry = 0;
var objSCCustom = {};
var keyKR = [];
var separator = "~";

// element in page
var titleElement;
var nextHornTimeElement;
var checkTimeElement;
var kingTimeElement;
var lastKingRewardSumTimeElement;
var optionElement;
var travelElement;
var strHornButton = 'hornbutton';
var strCampButton = 'campbutton';
var isNewUI = false;
var debugKR = false;

// console logging
function saveToSessionStorage(){
	var i;
	var str = "";
	for(i=0;i<arguments.length;i++){
		if(!isNullOrUndefined(arguments[i]) && typeof arguments[i] === 'object'){ // if it is object
			str += JSON.stringify(arguments[i]);
		}
		else
			str += arguments[i];
		if(i != arguments.length-1)
			str += " ";
	}
	var key = "";
	var arrLog = [];
	for(i=0;i<window.sessionStorage.length;i++){
		key = window.sessionStorage.key(i);
		if(key.indexOf("Log_") > -1)
			arrLog.push(key);
	}
	if (arrLog.length > maxSaveLog){
		arrLog = arrLog.sort();
		var count = Math.floor(maxSaveLog / 2);
		for(i=0;i<count;i++)
			removeSessionStorage(arrLog[i]);
	}
	try{
		setSessionStorage("Log_" + Date.now(), str);
	}
	catch (e){
		if(e.name == "QuotaExceededError"){
			for(i=0;i<window.sessionStorage.length;i++){
				key = window.sessionStorage.key(i);
				if(key.indexOf('Log_') > -1)
					removeSessionStorage(key);
			}
			saveToSessionStorage.apply(this,arguments);
		}
	}
	
}
console.plog = function(){
	saveToSessionStorage.apply(this,arguments);
	console.log.apply(console,arguments);
};
console.perror = function(){
	saveToSessionStorage.apply(this,arguments);
	console.error.apply(console,arguments);
};
console.pdebug = function(){
	saveToSessionStorage.apply(this,arguments);
	console.debug.apply(console,arguments);
};

function FinalizePuzzleImageAnswer(answer)
{
	if (answer.length != 5)
    {
	    //Get a new puzzle
	    if (kingsRewardRetry >= kingsRewardRetryMax)
	    {
	        kingsRewardRetry = 0;
			setStorage("KingsRewardRetry", kingsRewardRetry);
			var strTemp = 'Max ' + kingsRewardRetryMax + 'retries. Pls solve it manually ASAP.';
			alert(strTemp);
			displayTimer(strTemp, strTemp, strTemp);
			console.perror(strTemp);
			return;
	    }
	    else
	    {
	        ++kingsRewardRetry;
			setStorage("KingsRewardRetry", kingsRewardRetry);
			var tagName = document.getElementsByTagName("a");
			for (var i = 0; i < tagName.length; i++)
			{
				if (tagName[i].innerText == "Click here to get a new one!")
				{
					fireEvent(tagName[i], 'click');
					if(isNewUI){
						var myFrame = document.getElementById('myFrame');
						if(!isNullOrUndefined(myFrame))
							document.body.removeChild(myFrame);
						window.setTimeout(function () { CallKRSolver(); }, 6000);
					}
					return;
				}
			}
	    }
    }
    else
    {
		//Submit answer
        var puzzleAns = document.getElementById("puzzle_answer");
		if (isNewUI) puzzleAns = document.getElementsByClassName("mousehuntPage-puzzle-form-code")[0];
		if (!puzzleAns)
		{
			console.pdebug("puzzleAns:", puzzleAns);
			return;
		}
		puzzleAns.value = "";
        puzzleAns.value = answer.toLowerCase();
        var puzzleSubmit = document.getElementById("puzzle_submit");
		if (isNewUI) puzzleSubmit = document.getElementsByClassName("mousehuntPage-puzzle-form-code-button")[0];
		if (!puzzleSubmit)
		{
			console.pdebug("puzzleSubmit:", puzzleSubmit);
			return;
		}

		fireEvent(puzzleSubmit, 'click');
		kingsRewardRetry = 0;
		setStorage("KingsRewardRetry", kingsRewardRetry);
		var myFrame = document.getElementById('myFrame');
		if (myFrame)
			document.body.removeChild(myFrame);
		window.setTimeout(function () { CheckKRAnswerCorrectness(); }, 5000);
    }
}

function receiveMessage(event)
{
	if(!debugKR && !isAutoSolve)
		return;

	console.pdebug("Event origin:", event.origin);
	if (event.origin.indexOf("mhcdn") > -1 || event.origin.indexOf("mousehuntgame") > -1 || event.origin.indexOf("dropbox") > -1)
	{
		if (event.data.indexOf("~") > -1)
		{
			var result = "";
			if (saveKRImage){
				result = event.data.substring(0, event.data.indexOf("~"));
				var processedImg = event.data.substring(event.data.indexOf("~") + 1, event.data.length);
				var strKR = "KR" + separator;
				strKR += Date.now() + separator;
				strKR += result + separator;
				strKR += "RETRY" + kingsRewardRetry;
				try{
					setStorage(strKR, processedImg);
				}
				catch (e){
					console.perror('receiveMessage',e.message);
				}
			}
			FinalizePuzzleImageAnswer(result);
		}
		else if(event.data.indexOf("#")>-1){
			var value = event.data.substring(1, event.data.length);
			setStorage("krCallBack",value);
		}
		else if(event.data.indexOf('Log_')>-1){
			console.plog(event.data.split('_')[1]);
		}
	}
}

window.addEventListener("message", receiveMessage, false);
if (debugKR)
	CallKRSolver();

var getMapPort;
try{
	if(!isNullOrUndefined(chrome.runtime.id)){
		getMapPort = chrome.runtime.connect({name: 'map'});
		getMapPort.onMessage.addListener(function(msg) {
			console.log(msg);
			if(msg.array.length > 0)
				checkCaughtMouse(msg.obj, msg.array);
		});
	}	
}
catch (e){
	// not chrome extension
	getMapPort = undefined;
}

exeScript();

function exeScript() {
	console.pdebug("exeScript() Start");
	browser = browserDetection();
    // check the trap check setting first
	trapCheckTimeDiff = GetTrapCheckTime();

    if (trapCheckTimeDiff == 60 || trapCheckTimeDiff === 0) {
        trapCheckTimeDiff = 00;
    }
    else if (trapCheckTimeDiff < 0 || trapCheckTimeDiff > 60) {
        // invalid value, just disable the trap check
        enableTrapCheck = false;
    }

    if (showTimerInTitle) {
        // check if they are running in iFrame
		var contentElement = undefined;
		var breakFrameDivElement = undefined;
        if (window.location.href.indexOf("apps.facebook.com/mousehunt/") != -1) {
            contentElement = document.getElementById('pagelet_canvas_content');
            if (contentElement) {
                breakFrameDivElement = document.createElement('div');
                breakFrameDivElement.setAttribute('id', 'breakFrameDivElement');
                breakFrameDivElement.innerHTML = "Timer cannot show on title page. You can <a href='http://www.mousehuntgame.com/canvas/'>run MouseHunt without iFrame (Facebook)</a> to enable timer on title page";
                contentElement.parentNode.insertBefore(breakFrameDivElement, contentElement);
            }
            contentElement = undefined;
        }
        else if (window.location.href.indexOf("hi5.com/friend/games/MouseHunt") != -1) {
            contentElement = document.getElementById('apps-canvas-body');
            if (contentElement) {
                breakFrameDivElement = document.createElement('div');
                breakFrameDivElement.setAttribute('id', 'breakFrameDivElement');
                breakFrameDivElement.innerHTML = "Timer cannot show on title page. You can <a href='http://mousehunt.hi5.hitgrab.com/'>run MouseHunt without iFrame (Hi5)</a> to enable timer on title page";
                contentElement.parentNode.insertBefore(breakFrameDivElement, contentElement);
            }
            contentElement = undefined;
        }
    }

    // check user running this script from where
    if (window.location.href.indexOf("mousehuntgame.com/canvas/") != -1) {
        // from facebook
        fbPlatform = true;
    }
    else if (window.location.href.indexOf("mousehuntgame.com") != -1) {
        // need to check if it is running in mobile version
        var version = getCookie("switch_to");
        if (version !== null && version == "mobile") {
            // from mousehunt game mobile version
            mhMobilePlatform = true;
        }
        else {
            // from mousehunt game standard version
            mhPlatform = true;
        }
        version = undefined;
    }
    else if (window.location.href.indexOf("mousehunt.hi5.hitgrab.com") != -1) {
        // from hi5
        hiFivePlatform = true;
    }

    // check if user running in https secure connection
    if (window.location.href.indexOf("https://") != -1) {
        secureConnection = true;
    }
    else {
        secureConnection = false;
    }

    if (fbPlatform) {
		// alert("This script doesnt work under Facebook MH at this moment");
		// return;
        if (window.location.href == "http://www.mousehuntgame.com/canvas/" ||
			window.location.href == "http://www.mousehuntgame.com/canvas/#" ||
			window.location.href == "https://www.mousehuntgame.com/canvas/" ||
			window.location.href == "https://www.mousehuntgame.com/canvas/#" ||
			window.location.href.indexOf("mousehuntgame.com/canvas/index.php") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/canvas/turn.php") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/canvas/?newpuzzle") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/canvas/?") != -1) {
            // page to execute the script!

            // make sure all the preference already loaded
            loadPreferenceSettingFromStorage();

            // this is the page to execute the script
            if (!checkIntroContainer() && retrieveDataFirst()) {
                // embed a place where timer show
                embedTimer(true);

                // embed script to horn button
                embedScript();

                // start script action
                action();
            }
            else {
                // fail to retrieve data, display error msg and reload the page
                document.title = "Fail to retrieve data from page. Reloading in " + timeformat(errorReloadTime);
                window.setTimeout(function () { reloadPage(false); }, errorReloadTime * 1000);
            }
        }
        else {
            // not in huntcamp, just show the title of autobot version
            embedTimer(false);
        }
    }
    else if (mhPlatform) {
        if (window.location.href == "http://www.mousehuntgame.com/" ||
			window.location.href == "http://www.mousehuntgame.com/#" ||
			window.location.href == "http://www.mousehuntgame.com/?switch_to=standard" ||
			window.location.href == "https://www.mousehuntgame.com/" ||
			window.location.href == "https://www.mousehuntgame.com/#" ||
			window.location.href == "https://www.mousehuntgame.com/?switch_to=standard" ||
			window.location.href.indexOf("mousehuntgame.com/turn.php") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/?newpuzzle") != -1 ||
			window.location.href.indexOf("mousehuntgame.com/index.php") != -1) {
            // page to execute the script!

            // make sure all the preference already loaded
            loadPreferenceSettingFromStorage();

            // this is the page to execute the script
            if (!checkIntroContainer() && retrieveDataFirst()) {
                // embed a place where timer show
                embedTimer(true);

                // embed script to horn button
                embedScript();

                // start script action
                action();
            }
            else {
                // fail to retrieve data, display error msg and reload the page
                document.title = "Fail to retrieve data from page. Reloading in " + timeformat(errorReloadTime);
                window.setTimeout(function () { reloadPage(false); }, errorReloadTime * 1000);
            }
        }
        else {
            // not in huntcamp, just show the title of autobot version
            embedTimer(false);
        }
    }
    else if (mhMobilePlatform) {
        // execute at all page of mobile version
		// page to execute the script!

		// make sure all the preference already loaded
		loadPreferenceSettingFromStorage();

		// embed a place where timer show
		embedTimer(false);
    }
    else if (hiFivePlatform) {
        if (window.location.href == "http://mousehunt.hi5.hitgrab.com/#" ||
			window.location.href.indexOf("http://mousehunt.hi5.hitgrab.com/?") != -1 ||
			window.location.href == "http://mousehunt.hi5.hitgrab.com/" ||
			window.location.href.indexOf("http://mousehunt.hi5.hitgrab.com/turn.php") != -1 ||
			window.location.href.indexOf("http://mousehunt.hi5.hitgrab.com/?newpuzzle") != -1 ||
			window.location.href.indexOf("http://mousehunt.hi5.hitgrab.com/index.php") != -1) {
            // page to execute the script!

            // make sure all the preference already loaded
            loadPreferenceSettingFromStorage();

            // this is the page to execute the script
            if (!checkIntroContainer() && retrieveDataFirst()) {
                // embed a place where timer show
                embedTimer(true);

                // embed script to horn button
                embedScript();

                // start script action
                action();
            }
            else {
                // fail to retrieve data, display error msg and reload the page
                document.title = "Fail to retrieve data from page. Reloading in " + timeformat(errorReloadTime);
                window.setTimeout(function () { reloadPage(false); }, errorReloadTime * 1000);
            }
        }
        else {
            // not in huntcamp, just show the title of autobot version
            embedTimer(false);
        }
    }
	console.pdebug("exeScript() End");
	return;
}

function GetTrapCheckTime(){
	try {
		var passiveElement = document.getElementsByClassName('passive');
		if (passiveElement.length > 0) {
			var time = passiveElement[0].textContent;
			time = time.substr(time.indexOf('m -') - 4, 2);
			setStorage("TrapCheckTimeOffset", time);
			return parseInt(time);
		}
		else throw new Error('passiveElement not found');
	}
	catch (e) {
		console.perror('GetTrapCheckTime',e.message);
		var tempStorage = getStorage('TrapCheckTimeOffset');
		if (isNullOrUndefined(tempStorage)) {
		    tempStorage = 00;
			setStorage("TrapCheckTimeOffset", tempStorage);
		}
		return parseInt(tempStorage);
	}
}

function checkIntroContainer() {
    var gotIntroContainerDiv = false;

    var introContainerDiv = document.getElementById('introContainer');
    if (introContainerDiv) {
        introContainerDiv = undefined;
        gotIntroContainerDiv = true;
    }
    else {
        gotIntroContainerDiv = false;
    }

    try {
        return (gotIntroContainerDiv);
    }
    finally {
        gotIntroContainerDiv = undefined;
    }
}

function notifyMe(notice, icon, body) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check if the user is okay to get some notification
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(notice, { 'icon': icon, 'body': body});
    }
    // Otherwise, we need to ask the user for permission
    // Note, Chrome does not implement the permission static property
    // So we have to check for NOT 'denied' instead of 'default'
    else if (Notification.permission !== 'denied')
    {
        Notification.requestPermission(function (permission)
        {
            // Whatever the user answers, we make sure we store the information
            if(!('permission' in Notification)) {
            Notification.permission = permission;
            }

            // If the user is okay, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(notice, { 'icon': icon, 'body': body});
            }
        });
    }
}

function ZTalgo() {
    retrieveMouseList();
    var intervalZT = setInterval(
        function () {
            if (mouseList.length > 0) {
                if (checkMouse("Chess Master")) {
                    //arm Uncharged Scholar Charm & Checkmate Cheese
                    checkThenArm(null, "trinket", "Uncharged Scholar");
                    checkThenArm(null, "bait", "Checkmate");
                }
                else if (checkMouse("King")) {
                    //arm Checkmate Cheese
                    checkThenArm(null, "bait", "Checkmate");
                }
                else if (checkMouse("Queen")) {
                    //arm another charm other than rook charm
                    checkThenArm(null, "trinket", "Super Power");
                    disarmTrap('trinket');
                }
                else if (checkMouse("Rook")) {
                    //arm rook charm (if available)
                    checkThenArm(null, "trinket", "Rook Crumble");
                }
                else if (checkMouse("Knight")) {
                    //arm Sphynx Wrath
                    checkThenArm(null, "weapon", "Sphynx Wrath");
                    checkThenArm('best', 'base', objBestTrap.base.power);
                }
                clearInterval(intervalZT);
                intervalZT = null;
                mouseList = [];
                return;
            }
        }, 1000);
    return;
}

function eventLocationCheck(caller) {
    var selAlgo = getStorageToVariableStr("eventLocation", "None");
	console.pdebug('Algorithm Selected:', selAlgo, 'Call From:', caller);
	var temp = "";
    switch (selAlgo)
    {
        case 'Charge Egg 2015':
            checkCharge(12); break;
        case 'Charge Egg 2015(17)':
            checkCharge(17); break;
		case 'Charge Egg 2016 Medium + High':
            checkCharge2016(chargeMedium); break;
        case 'Charge Egg 2016 High':
            checkCharge2016(chargeHigh); break;
		case 'Burroughs Rift(Red)':
			BurroughRift(19, 20); break;
		case 'Burroughs Rift(Green)':
			BurroughRift(6, 18); break;
		case 'Burroughs Rift(Yellow)':
			BurroughRift(1, 5); break;
		case 'Burroughs Rift Custom':
			BRCustom(); break;
		case 'Halloween 2015':
			Halloween2015(); break;
		case 'All LG Area':
			temp = getStorage("LGArea");
			if(isNullOrUndefined(temp)){
				var objLGTemplate = {
					isAutoFill : false,
					isAutoPour : false,
					maxSaltCharged : 25,
					base : {
						before : '',
						after : ''
					},
					trinket : {
						before : '',
						after : ''
					},
					bait : {
						before : '',
						after : ''
					}
				};
				var objLGDefault = {
					LG : JSON.parse(JSON.stringify(objLGTemplate)),
					TG : JSON.parse(JSON.stringify(objLGTemplate)),
					LC : JSON.parse(JSON.stringify(objLGTemplate)),
					CC : JSON.parse(JSON.stringify(objLGTemplate)),
					SD : JSON.parse(JSON.stringify(objLGTemplate)),
					SC : JSON.parse(JSON.stringify(objLGTemplate)),
				};
				temp = JSON.stringify(objLGDefault);
			}
			temp = JSON.parse(temp);
			LGGeneral(temp);
			break;
		case 'SG':
			seasonalGarden(); break;
		case 'ZT':
			zugzwangTower(); break;
		case 'Sunken City':
			SunkenCity(false); break;
		case 'Sunken City Aggro':
			SunkenCity(true); break;
		case 'Sunken City Custom':
			SCCustom(); break;
		case 'Labyrinth':
			labyrinth(); break;
		case 'Zokor':
			zokor(); break;
		case 'Fiery Warpath':
			fw(); break;
		case 'Furoma Rift':
			fRift(); break;
		case 'BC/JOD':
			balackCoveJOD(); break;
		case 'FG/AR':
			forbiddenGroveAR(); break;
		case 'Test':
			checkThenArm('best', 'base', objBestTrap.base.luck);
			checkThenArm('best', 'weapon', objBestTrap.weapon.arcane);
			checkThenArm(null, 'trinket', 'Dragonbane');
			checkThenArm(null, 'bait', 'Radioactive');
			break;
        default:
            break;
    }
}

function mapHunting(){
	var objDefaultMapHunting = {
		status : false,
		selectedMouse : [],
		logic : 'OR',
		weapon : 'Remain',
		base : 'Remain',
		trinket : 'Remain',
		bait : 'Remain',
		leave : false
	};
	var objMapHunting = JSON.parse(getStorageToVariableStr('MapHunting', JSON.stringify(objDefaultMapHunting)));
	var strViewState = getPageVariable('user.quests.QuestRelicHunter.view_state');
	var bHasMap = (strViewState == 'hasMap' || strViewState == 'hasReward');
	if(!objMapHunting.status || !bHasMap || objMapHunting.selectedMouse.length === 0)
		return;

	checkCaughtMouse(objMapHunting);
}

function checkCaughtMouse(obj, arrUpdatedUncaught){
	var arrUncaughtMouse = [];
	if(!(Array.isArray(arrUpdatedUncaught)))
		arrUpdatedUncaught = [];

	var bHasReward = (getPageVariable('user.quests.QuestRelicHunter.view_state') == 'hasReward');
	if(!bHasReward && arrUpdatedUncaught.length === 0){
		var nRemaining = -1;
		var classTreasureMap = document.getElementsByClassName('mousehuntHud-userStat treasureMap')[0];
		if(classTreasureMap.children[2].textContent.toLowerCase().indexOf('remaining') > -1)
			nRemaining = parseInt(classTreasureMap.children[2].textContent);
		
		if(Number.isNaN(nRemaining) || nRemaining == -1)
			return;

		var temp = getStorageToVariableStr('Last Record Uncaught', null);
		if(!isNullOrUndefined(temp))
			arrUncaughtMouse = temp.split(",");	
		
		if(arrUncaughtMouse.length != nRemaining){
			// get updated uncaught mouse list
			arrUncaughtMouse = [];
			var objData = {
				sn : 'Hitgrab',
				hg_is_ajax : 1,
				action : 'info',
				uh : getPageVariable('user.unique_hash')
			};
			if(isNullOrUndefined(getMapPort)){
				// direct call jquery
				ajaxPost(window.location.origin + '/managers/ajax/users/relichunter.php', objData, function (data){
					console.log(data.treasure_map);
					if(!isNullOrUndefined(data.treasure_map.groups)){
						var arrUncaught = [];
						for(var i=0;i<data.treasure_map.groups.length;i++){
							if(data.treasure_map.groups[i].is_uncaught === true){
								for(var j=0;j<data.treasure_map.groups[i].mice.length;j++){
									arrUncaught.push(data.treasure_map.groups[i].mice[j].name);
								}
							}
						}
						if(arrUncaught.length > 0)
							checkCaughtMouse(obj, arrUncaught);
					}
				}, function (error){
					console.error('ajax:',error);
				});
			}
			else{
				getMapPort.postMessage({
					request: "getUncaught",
					data: objData,
					url: window.location.origin + '/managers/ajax/users/relichunter.php',
					objMapHunting : obj
				});
			}
			return;
		}
	}
	else{
		if(bHasReward)
			setStorage('Last Record Uncaught', '');
		else
			setStorage('Last Record Uncaught', arrUpdatedUncaught.join(","));
		arrUncaughtMouse = arrUpdatedUncaught.slice();
	}
	
	console.pdebug('Uncaught:', arrUncaughtMouse);
	var i;
	var bChangeTrap = false;
	var bCanLeave = false;
	var arrIndex = [];
	for(i=0;i<obj.selectedMouse.length;i++){
		arrIndex.push(arrUncaughtMouse.indexOf(obj.selectedMouse[i]));
	}
	if(obj.logic == 'AND'){
		bChangeTrap = (countArrayElement(-1, arrIndex) == arrIndex.length || bHasReward);
	}
	else{
		bChangeTrap = (countArrayElement(-1, arrIndex) > 0 || bHasReward);
	}
	
	bCanLeave = !bHasReward && bChangeTrap;
	if(bChangeTrap){
		for(i=arrIndex.length-1;i>=0;i--){
			if(arrIndex[i] == -1)
				obj.selectedMouse.splice(i,1);
		}
		setStorage('MapHunting', JSON.stringify(obj));
		for (var prop in obj) {
			if(obj.hasOwnProperty(prop) && 
				(prop == 'weapon' || prop == 'base' || prop == 'trinket' || prop == 'bait')) {
				if(obj[prop] != 'Remain'){
					if(obj[prop] == 'None')
						disarmTrap(prop);
					else
						checkThenArm(null, prop, obj[prop]);
				}
			}
		}
	}
	
	if(bCanLeave && obj.leave){
		var objData = {
			sn : 'Hitgrab',
			hg_is_ajax : 1,
			action : 'discard',
			uh : getPageVariable('user.unique_hash')
		};
		if(isNullOrUndefined(getMapPort)){
			// direct call jquery
			ajaxPost(window.location.origin + '/managers/ajax/users/relichunter.php', objData, function (data){
				console.plog('Map discarded');
			}, function (error){
				console.perror('ajax discard:',error);
			});
		}
		else{
			getMapPort.postMessage({
				request: "discard",
				data: objData,
				url: window.location.origin + '/managers/ajax/users/relichunter.php',
			});
		}
	}
}

function GetCurrentLocation(){
	var loc = getPageVariable('user.location');
    console.pdebug('Current Location:', loc);
	return loc;
}

function Halloween2015()
{
	if (GetCurrentLocation().indexOf("Haunted Terrortories") > -1)
	{
		var areaName = document.getElementsByClassName('halloweenHud-areaDetails-name')[0].innerHTML;
		var warning = document.getElementsByClassName('halloweenHud-areaDetails-warning active').length;
		var isWarning = (warning > 0);
		console.pdebug('Current Area Name:', areaName, 'Warning:', isWarning);
		if (isWarning)
		{
			var trickContainer = document.getElementsByClassName('halloweenHud-bait trick_cheese clear-block')[0];
			var treatContainer = document.getElementsByClassName('halloweenHud-bait treat_cheese clear-block')[0];
			if (trickContainer.children[2].getAttribute('class') == 'armNow active')
			{
				console.pdebug('Currently armed: Trick cheese, Going to arm Treat cheese');
				fireEvent(treatContainer.children[2], 'click');
			}
			else
			{
				console.pdebug('Currently armed: Treat cheese, Going to arm Trick cheese');
				fireEvent(trickContainer.children[2], 'click');
			}
		}
	}
}

function BurroughRift(minMist, maxMist, nToggle)
{
	//Tier 0: 0 Mist Canisters
	//Tier 1/Yellow: 1-5 Mist Canisters
	//Tier 2/Green: 6-18 Mist Canisters
	//Tier 3/Red: 19-20 Mist Canisters
	if (GetCurrentLocation().indexOf('Burroughs Rift') < 0)
		return;

	var currentMistQuantity = parseInt(document.getElementsByClassName('mistQuantity')[0].innerText);
	var isMisting = (getPageVariable('user.quests.QuestRiftBurroughs.is_misting') == 'true');
	var mistButton = document.getElementsByClassName('mistButton')[0];
	console.pdebug('Current Mist Quantity:', currentMistQuantity, 'Is Misting:', isMisting);
	if(minMist === 0 && maxMist === 0){
		if(isMisting){
			console.pdebug('Stop mist...');
			fireEvent(mistButton, 'click');
		}
	}
	else if(currentMistQuantity >= maxMist && isMisting)
	{
		if(maxMist == 20 && Number.isInteger(nToggle)){
			if(nToggle == 1){
				console.pdebug('Stop mist...');
				fireEvent(mistButton, 'click');
			}
			else{
				var nCount20 = getStorageToVariableInt('BR20_Count', 0);
				nCount20++;
				if(nCount20 >= nToggle){
					nCount20 = 0;
					console.pdebug('Stop mist...');
					fireEvent(mistButton, 'click');
				}
				setStorage('BR20_Count', nCount20);
			}
		}
		else{
			console.pdebug('Stop mist...');
			fireEvent(mistButton, 'click');
		}
	}
	else if(currentMistQuantity <= minMist && !isMisting)
	{
		console.pdebug('Start mist...');
		fireEvent(mistButton, 'click');
	}
	return currentMistQuantity;
}

function BRCustom(){
	if (GetCurrentLocation().indexOf('Burroughs Rift') < 0)
		return;

	var objBR = getStorageToVariableStr('BRCustom', "");
	if(objBR === "")
		return;

	objBR = JSON.parse(objBR);
	var mistQuantity = 0;
	if(objBR.hunt == 'Red')
		mistQuantity = BurroughRift(19, 20, objBR.toggle);
	else if(objBR.hunt == 'Green')
		mistQuantity = BurroughRift(6, 18);
	else if(objBR.hunt == 'Yellow')
		mistQuantity = BurroughRift(1, 5);
	else
		mistQuantity = BurroughRift(0, 0);

	var currentTier = '';
	if(mistQuantity >= 19)
		currentTier = 'Red';
	else if(mistQuantity >= 6)
		currentTier = 'Green';
	else if(mistQuantity >= 1)
		currentTier = 'Yellow';
	else
		currentTier = 'None';

	if(currentTier != objBR.hunt)
		return;

	var nIndex = objBR.name.indexOf(currentTier);
	checkThenArm(null, 'weapon', objBR.weapon[nIndex]);
	checkThenArm(null, 'base', objBR.base[nIndex]);
	checkThenArm(null, 'bait', objBR.bait[nIndex]);
	if(objBR.trinket[nIndex] == 'None')
		disarmTrap('trinket');
	else
		checkThenArm(null, 'trinket', objBR.trinket[nIndex]);
}

function LGGeneral(objLG) {
    var loc = GetCurrentLocation();
	switch (loc)
    {
        case 'Living Garden':
            livingGarden(objLG); break;
        case 'Lost City':
            lostCity(objLG); break;
        case 'Sand Dunes':
            sandDunes(); break;
        case 'Twisted Garden':
            twistedGarden(objLG); break;
        case 'Cursed City':
            cursedCity(objLG); break;
        case 'Sand Crypts':
            sandCrypts(objLG); break;
        default:
            return;
    }
	DisarmLGSpecialCharm(loc);
}

function seasonalGarden(){
	if(GetCurrentLocation().indexOf('Seasonal Garden') < 0)
		return;

	var cheeseArmed = getPageVariable('user.bait_name');
	if(cheeseArmed.indexOf('Checkmate') > -1)
		checkThenArm(null, 'bait', 'Gouda');
	
	var objSGDefault = {
		useZUMIn: 'None'
	};
	var objSG = JSON.parse(getStorageToVariableStr('SGarden', JSON.stringify(objSGDefault)));
	objSG.season = ['Spring', 'Summer', 'Fall', 'Winter'];
	objSG.trap = [objBestTrap.weapon.physical.slice(), objBestTrap.weapon.tactical.slice(), objBestTrap.weapon.shadow.slice(), objBestTrap.weapon.hydro.slice()];
	var nTimeStamp = Date.parse(new Date())/1000;
	var nFirstSeasonTimeStamp = 1283328000;
	var nSeasonLength = 288000; // 80hr
	var nSeason = Math.floor((nTimeStamp - nFirstSeasonTimeStamp)/nSeasonLength) % objSG.season.length;
	var nSeasonNext = nSeasonLength - ((nTimeStamp - nFirstSeasonTimeStamp) % nSeasonLength);
	console.plog('Current Season:', objSG.season[nSeason], 'Next Season In:', timeformat(nSeasonNext));
	if(nSeasonNext <= nextActiveTime){ // total seconds left to next season less than next active time
		nSeason++;
		if(nSeason >= objSG.season.length)
			nSeason = 0;
	}

	
	if(objSG.useZUMIn == 'ALL' || objSG.useZUMIn == objSG.season[nSeason].toUpperCase())
		objSG.trap[nSeason].unshift('Zugzwang\'s Ultimate Move');
	checkThenArm('best', 'weapon', objSG.trap[nSeason]);
}

function zugzwangTower(){
	var loc = GetCurrentLocation();
	if (loc.indexOf("Seasonal Garden") > -1){
		setStorage('eventLocation', 'SG');
		seasonalGarden();
		return;
	}
	else if (loc.indexOf("Zugzwang's Tower") < 0)
		return;

	var objZTDefault = {
		focus : 'MYSTIC',
		order : ['PAWN', 'KNIGHT', 'BISHOP', 'ROOK', 'QUEEN', 'KING', 'CHESSMASTER'],
		weapon : new Array(14).fill(''),
		base : new Array(14).fill(''),
		trinket : new Array(14).fill('None'),
		bait : new Array(14).fill('Gouda'),
	};
	
	var objZT = JSON.parse(getStorageToVariableStr('ZTower', JSON.stringify(objZTDefault)));
	objZT.focus = objZT.focus.toUpperCase();
	var nProgressMystic = parseInt(getPageVariable('user.viewing_atts.zzt_mage_progress'));
	var nProgressTechnic = parseInt(getPageVariable('user.viewing_atts.zzt_tech_progress'));
	if(Number.isNaN(nProgressMystic) || Number.isNaN(nProgressTechnic))
		return;

	var strUnlockMystic = getZTUnlockedMouse(nProgressMystic);
	var strUnlockTechnic = getZTUnlockedMouse(nProgressTechnic);
	if(strUnlockMystic === "" || strUnlockTechnic === "")
		return;
	var nIndex = -1;
	console.plog(capitalizeFirstLetter(objZT.focus),'Progress Mystic:',nProgressMystic,'Unlock Mystic:',strUnlockMystic,'Progress Technic:',nProgressTechnic,'Unlock Technic:',strUnlockTechnic);
	if(objZT.focus.indexOf('MYSTIC') === 0){ // Mystic side first
		if(strUnlockMystic == 'CHESSMASTER' && objZT.focus.indexOf('=>') > -1){ // is double run?
			nIndex = objZT.order.indexOf(strUnlockTechnic);
			if(nIndex > -1)
				nIndex += 7;
		}
		else{ // single run
			nIndex = objZT.order.indexOf(strUnlockMystic);
		}
	}
	else{ // Technic side first
		if(strUnlockTechnic == 'CHESSMASTER' && objZT.focus.indexOf('=>') > -1){ // is double run?
			nIndex = objZT.order.indexOf(strUnlockMystic);
			if(nIndex > -1)
				nIndex += 7;
		}
		else{ // single run
			nIndex = objZT.order.indexOf(strUnlockTechnic);
		}
	}
	
	if(nIndex == -1)
		return;

	if(objZT.weapon[nIndex] == 'MPP/TPP')
		objZT.weapon[nIndex] = (objZT.focus == 'MYSTIC') ? 'Mystic Pawn Pincher' : 'Technic Pawn Pincher';
	else if(objZT.weapon[nIndex] == 'BPT/OAT')
		objZT.weapon[nIndex] = (objZT.focus == 'MYSTIC') ? 'Blackstone Pass Trap' : 'Obvious Ambush Trap';
	
	for (var prop in objZT) {
		if(objZT.hasOwnProperty(prop) && 
			(prop == 'weapon' || prop == 'base' || prop == 'trinket' || prop == 'bait')) {
			if(objZT[prop][nIndex] == 'None')
				disarmTrap(prop);
			else
				checkThenArm(null, prop, objZT[prop][nIndex]);
		}
	}
}

function getZTUnlockedMouse(nProgress){
	var strUnlock = "";
	if(nProgress <= 7)
		strUnlock = 'PAWN';
	else if(nProgress <= 9)
		strUnlock = 'KNIGHT';
	else if(nProgress <= 11)
		strUnlock = 'BISHOP';
	else if(nProgress <= 13)
		strUnlock = 'ROOK';
	else if(nProgress <= 14)
		strUnlock = 'QUEEN';
	else if(nProgress <= 15)
		strUnlock = 'KING';
	else if(nProgress <= 16)
		strUnlock = 'CHESSMASTER';
	return strUnlock;
}

function balackCoveJOD(){
	var curLoc = GetCurrentLocation();
	if(curLoc.indexOf('Jungle') > -1){
		checkThenArm(null, 'bait', 'Gouda');
		checkThenArm('best', 'weapon', objBestTrap.weapon.shadow);
	}
	else if(curLoc.indexOf('Balack') > -1){
		var i = 0;
		var objBC = {
			arrTide : ['Low Rising', 'Mid Rising', 'High Rising', 'High Ebbing', 'Mid Ebbing', 'Low Ebbing'],
			arrLength : [24, 3, 1, 1, 3, 24],
			arrAll : []
		};
		var nTimeStamp = Math.floor(Date.now()/1000);
		var nFirstTideTimeStamp = 1294708860;
		var nTideLength = 1200; // 20min
		for(i=0;i<objBC.arrTide.length;i++){
			objBC.arrAll = objBC.arrAll.concat(new Array(objBC.arrLength[i]).fill(objBC.arrTide[i]));
		}
		var nTideTotalLength = sumData(objBC.arrLength);
		var nDiff = nTimeStamp - nFirstTideTimeStamp;
		var nIndexCurrentTide = Math.floor(nDiff/nTideLength) % nTideTotalLength;
		var tideNameCurrent = objBC.arrAll[nIndexCurrentTide];
		var tideNameNext;
		if(tideNameCurrent.indexOf('Low') > -1)
			tideNameNext = 'Mid Rising';
		else if(tideNameCurrent.indexOf('High') > -1)
			tideNameNext = 'Mid Ebbing';
		else if(tideNameCurrent == 'Mid Rising')
			tideNameNext = 'High Rising';
		else if(tideNameCurrent == 'Mid Ebbing')
			tideNameNext = 'Low Ebbing';
		
		var nTideDist = objBC.arrAll.indexOf(tideNameNext) + nTideTotalLength - nIndexCurrentTide;
		nTideDist = nTideDist % nTideTotalLength;
		var nNextTideTime = nTideDist*nTideLength - nDiff%nTideLength;
		console.plog('Current Tide:', objBC.arrAll[nIndexCurrentTide], 'Next Tide:', tideNameNext, 'In', timeformat(nNextTideTime));
		if(nNextTideTime <= nextActiveTime && tideNameNext.indexOf('High') > -1){ // total seconds left to next high tide less than next active time
			checkThenArm(null, 'bait', 'Vanilla Stilton');
		}
	}
}

function forbiddenGroveAR(){
	var curLoc = GetCurrentLocation();
	if(curLoc.indexOf('Acolyte Realm') > -1){
		checkThenArm('best', 'weapon', objBestTrap.weapon.forgotten);
		checkThenArm(null, 'bait', 'Runic Cheese');
	}
}

function SunkenCity(isAggro) {
	if (GetCurrentLocation().indexOf("Sunken City") < 0)
		return;
	
	var zone = document.getElementsByClassName('zoneName')[0].innerText;
	console.pdebug('Current Zone:', zone);
	var currentZone = GetSunkenCityZone(zone);
	checkThenArm('best', 'weapon', objBestTrap.weapon.hydro);
	if (currentZone == objSCZone.ZONE_NOT_DIVE){
		checkThenArm('best', 'base', objBestTrap.base.luck);
		checkThenArm(null, 'trinket', 'Oxygen Burst');
		checkThenArm('best', 'bait', objSCTrap.scOxyBait);
		return;
	}

	checkThenArm('best', 'base', bestSCBase);
	var distance = parseInt(getPageVariable('user.quests.QuestSunkenCity.distance'));
	console.pdebug('Dive Distance(m):', distance);
	var charmArmed = getPageVariable("user.trinket_name");
	var charmElement = document.getElementsByClassName('charm');
	var isEACArmed = (charmArmed.indexOf('Empowered Anchor') > -1);
	var isWJCArmed = (charmArmed.indexOf('Water Jet') > -1);
	if (currentZone == objSCZone.ZONE_OXYGEN || currentZone == objSCZone.ZONE_TREASURE || currentZone == objSCZone.ZONE_BONUS)
	{
		if (isAggro && (currentZone == objSCZone.ZONE_TREASURE))
			checkThenArm('best', 'trinket', objSCTrap.scAnchorTreasure);
		else
		{
			// arm Empowered Anchor Charm
			if (!isEACArmed)
			{
				if (parseInt(charmElement[0].innerText) > 0)
					fireEvent(charmElement[0], 'click');
			}
		}
		
		checkThenArm(null, 'bait', 'SUPER');
	}
	else if (currentZone == objSCZone.ZONE_DANGER_PP)
	{
		if (!isAggro)
		{
			// arm Empowered Anchor Charm
			if (!isEACArmed && !isAggro)
			{
				if (parseInt(charmElement[0].innerText) > 0)
					fireEvent(charmElement[0], 'click');
			}
		}
		else
			checkThenArm('best', 'trinket', objSCTrap.scAnchorDanger);
		checkThenArm(null, 'bait', 'Gouda');
	}
	else if ((currentZone == objSCZone.ZONE_DEFAULT) && isAggro)
	{
		var depth = parseInt(getPageVariable('user.quests.QuestSunkenCity.zones[1].length'));
		if (depth >= 500)
		{
			var nextZoneName = getPageVariable('user.quests.QuestSunkenCity.zones[2].name');
			var nextZoneLeft = parseInt(getPageVariable('user.quests.QuestSunkenCity.zones[2].left'));
			var nextZone = GetSunkenCityZone(nextZoneName);
			var distanceToNextZone = parseInt((nextZoneLeft - 80) / 0.6);
			console.pdebug('Distance to next zone(m):', distanceToNextZone);
			if (distanceToNextZone >= 480 || (distanceToNextZone >= 230 && nextZone == objSCZone.ZONE_DEFAULT))
			{
				// arm Water Jet Charm
				checkThenArm('best', 'trinket', ['Smart Water Jet', 'Water Jet']);
			}
			else
			{
				DisarmSCSpecialCharm(charmArmed);
			}
		}
		else
			DisarmSCSpecialCharm(charmArmed);
		
		checkThenArm(null, 'bait', 'Gouda');
	}
	else
	{
		DisarmSCSpecialCharm(charmArmed);
		checkThenArm(null, 'bait', 'Gouda');
	}
}

function SCCustom() {
	if (GetCurrentLocation().indexOf("Sunken City") < 0)
		return;
	
	var zone = document.getElementsByClassName('zoneName')[0].innerText;
	var zoneID = GetSunkenCityZone(zone);
	checkThenArm('best', 'weapon', objBestTrap.weapon.hydro);
	if (zoneID == objSCZone.ZONE_NOT_DIVE){
		checkThenArm('best', 'base', objBestTrap.base.luck);
		checkThenArm(null, 'trinket', 'Oxygen Burst');
		checkThenArm('best', 'bait', objSCTrap.scOxyBait);
		return;
	}

	var objSCCustomDefault = {
		zone : ['ZONE_NOT_DIVE','ZONE_DEFAULT','ZONE_CORAL','ZONE_SCALE','ZONE_BARNACLE','ZONE_TREASURE','ZONE_DANGER','ZONE_DANGER_PP','ZONE_OXYGEN','ZONE_BONUS'],
		zoneID : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		isHunt : new Array(9).fill(true),
		bait : new Array(9).fill('Gouda'),
		trinket : new Array(9).fill('None'),
		useSmartJet : false
	};
	objSCCustom = JSON.parse(getStorageToVariableStr('SCCustom', JSON.stringify(objSCCustomDefault)));
	console.pdebug(objSCCustom);
	var distance = parseInt(getPageVariable('user.quests.QuestSunkenCity.distance'));
	console.plog('Current Zone:', zone, 'ID', zoneID, 'at meter', distance);
	checkThenArm('best', 'base', bestSCBase);
	var canJet = false;
	if (!objSCCustom.isHunt[zoneID]){
		var nextZoneName = [];
		var nextZoneLeft = [];
		var nextZoneID = [];
		var distanceToNextZone = [];
		var isNextZoneInHuntZone = [];
		var i;
		for (i = 0; i < 2; i++){
			nextZoneName[i] = getPageVariable('user.quests.QuestSunkenCity.zones[' + (i+2) + '].name');
			nextZoneLeft[i] = parseInt(getPageVariable('user.quests.QuestSunkenCity.zones[' + (i+2) + '].left'));
			nextZoneID[i] = GetSunkenCityZone(nextZoneName[i]);
			distanceToNextZone[i] = parseInt((nextZoneLeft[i] - 80) / 0.6);
			isNextZoneInHuntZone[i] = (objSCCustom.isHunt[nextZoneID[i]]);
			console.plog('Next Zone:', nextZoneName[i], 'in meter', distanceToNextZone[i], 'Is In Hunt Zone:', isNextZoneInHuntZone[i]);
		}
		
		// jet through
		var charmElement = document.getElementsByClassName('charm');
		var charmArmed = getPageVariable("user.trinket_name");
		var isWJCArmed = (charmArmed.indexOf('Water Jet') > -1);
		if (distanceToNextZone[0] >= 480 || (distanceToNextZone[1] >= 480 && (!isNextZoneInHuntZone[0])) || (!(isNextZoneInHuntZone[0]||isNextZoneInHuntZone[1]))) {
			// arm Water Jet Charm
			var bSmartJet = false;
			var bNormalJet = (parseInt(charmElement[1].innerText) > 0);
			if(objSCCustom.useSmartJet){
				getTrapList('trinket');
				for(i=0;i<objTrapList.trinket.length;i++){
					if(!bSmartJet)
						bSmartJet = (objTrapList.trinket[i].indexOf('Smart Water Jet') === 0);
					if(!bNormalJet)
						bSmartJet = (objTrapList.trinket[i].indexOf('Water Jet') === 0);
				}
				canJet = (bSmartJet || bNormalJet);
				checkThenArm('best', 'trinket', ['Smart Water Jet', 'Water Jet']);
			}
			else{
				canJet = bNormalJet;
				if (!isWJCArmed) {
					if (canJet)
						fireEvent(charmElement[1], 'click');
				}
			}
			checkThenArm(null, 'bait', 'Gouda');
		}
	}
	
	if (objSCCustom.isHunt[zoneID] || !canJet){
		// hunt here
		var bestOrNull = Array.isArray(objSCCustom.bait[zoneID]) ? 'best' : null;
		checkThenArm(bestOrNull, 'bait', objSCCustom.bait[zoneID]);
		if (objSCCustom.trinket[zoneID] == "NoSC")
			DisarmSCSpecialCharm();
		else if (objSCCustom.trinket[zoneID] == "None")
			disarmTrap('trinket');
		else {
			if(objSCTrap.hasOwnProperty(objSCCustom.trinket[zoneID])){
				bestOrNull = Array.isArray(objSCTrap[objSCCustom.trinket[zoneID]]) ? 'best' : null;
				checkThenArm(bestOrNull, 'trinket', objSCTrap[objSCCustom.trinket[zoneID]]);
			}
		}
	}
}

function DisarmSCSpecialCharm(charmArmedName)
{
	var specialCharms = ['Golden Anchor', 'Spiked Anchor', 'Ultimate Anchor', 'Oxygen Burst', 'Empowered Anchor', 'Water Jet'];	
	for (var i = 0; i < specialCharms.length; i++)
	{
		if (charmArmedName.indexOf(specialCharms[i]) > -1)
		{
			disarmTrap('trinket');
			break;
		}
	}
}

function GetSunkenCityZone(zoneName)
{
	var returnZone = 0;
	switch (zoneName)
	{
		case 'Sand Dollar Sea Bar':
		case 'Pearl Patch':
		case 'Sunken Treasure':
			returnZone = objSCZone.ZONE_TREASURE;
			break;
		case 'Feeding Grounds':
		case 'Carnivore Cove':
			returnZone = objSCZone.ZONE_DANGER;
			break;
		case 'Monster Trench':
		case 'Lair of the Ancients':
			returnZone = objSCZone.ZONE_DANGER_PP;
			break;
		case 'Deep Oxygen Stream':
		case 'Oxygen Stream':
			returnZone = objSCZone.ZONE_OXYGEN;
			break;
		case 'Magma Flow':
			returnZone = objSCZone.ZONE_BONUS;
			break;
		case 'Coral Reef':
		case 'Coral Garden':
		case 'Coral Castle':
			returnZone = objSCZone.ZONE_CORAL;
			break;
		case 'School of Mice':
		case 'Mermouse Den':
		case 'Lost Ruins':
			returnZone = objSCZone.ZONE_SCALE;
			break;
		case 'Rocky Outcrop':
		case 'Shipwreck':
		case 'Haunted Shipwreck':
			returnZone = objSCZone.ZONE_BARNACLE;
			break;
		case 'Shallow Shoals':
		case 'Sea Floor':
		case 'Murky Depths':
			returnZone = objSCZone.ZONE_DEFAULT;
			break;
		default:
			returnZone = objSCZone.ZONE_NOT_DIVE;
			break;
	}
	return returnZone;
}

function labyrinth() {
	if (GetCurrentLocation().indexOf("Labyrinth") < 0)
		return;

	checkThenArm('best', 'weapon', objBestTrap.weapon.forgotten);
	var labyStatus = getPageVariable("user.quests.QuestLabyrinth.status");
	var isAtEntrance = (labyStatus=="intersection entrance");
	var isAtHallway = (labyStatus=="hallway");
	var isAtIntersection = (labyStatus=="intersection");
	var isAtExit = (labyStatus=="exit");
	var lastHunt = document.getElementsByClassName('labyrinthHUD-hallway-tile locked').length + 1;
	var totalClue = parseInt(document.getElementsByClassName('labyrinthHUD-clueBar-totalClues')[0].innerText);
	console.pdebug("Entrance:", isAtEntrance, "Intersection:", isAtIntersection, "Exit:", isAtExit);
	var objLaby = JSON.parse(getStorageToVariableStr('Labyrinth', JSON.stringify(objDefaultLaby)));
	console.pdebug('District to focus:', objLaby.districtFocus);
	bestLabyBase = bestLabyBase.concat(objBestTrap.base.luck).concat(objBestTrap.base.power);
	if(objLaby.armOtherBase != 'false'){
		var charmArmed = getPageVariable('user.trinket_name');
		if(charmArmed.indexOf('Compass Magnet') === 0)
			checkThenArm(null, 'base', objLaby.armOtherBase);
		else
			checkThenArm('best', 'base', bestLabyBase);
	}
	else
		checkThenArm('best', 'base', bestLabyBase);
	
	if(isAtHallway){
		if(objLaby.securityDisarm){
			var strCurHallwayTier = document.getElementsByClassName('labyrinthHUD-hallwayName')[0].textContent.split(' ')[1].toUpperCase();
			var maxCluePerHunt = 0;
			if(strCurHallwayTier == 'PLAIN')
				maxCluePerHunt = 1;
			else if(strCurHallwayTier == 'SUPERIOR')
				maxCluePerHunt = 2;
			else
				maxCluePerHunt = 3;
			var classLantern = document.getElementsByClassName('labyrinthHUD-toggleLantern mousehuntTooltipParent');
			var bLanternActive = true;
			if(classLantern.length < 1)
				bLanternActive = (getPageVariable('user.quests.QuestLabyrinth.lantern_status') == 'active');
			else
				bLanternActive = (classLantern[0].getAttribute('class').indexOf('inactive') < 0);
			if(bLanternActive)
				maxCluePerHunt++;
			console.plog('Hallway Last Hunt :', lastHunt, 'Total Clues:', totalClue, 'Max Clue Per Hunt:', maxCluePerHunt);
			if(lastHunt <= objLaby.lastHunt && totalClue >= (100-maxCluePerHunt*lastHunt))
				disarmTrap('bait');
		}
		return;
	}

	if(isAtEntrance || isAtExit || objLaby.districtFocus.indexOf('None') > -1){
		checkThenArm(null, 'bait', 'Gouda');
		disarmTrap('trinket');
		return;
	}

	var doorsIntersect = document.getElementsByClassName('labyrinthHUD-door');
	var doorsExit = document.getElementsByClassName('labyrinthHUD-exit');
	var objDoors = {
		name : [],
		length : [],
		tier : [],
		clue : [],
		code : [],
		priorities : [],
		debug : []
	};
	var temp = "";
	for (var i=0;i<doorsIntersect.length;i++){
		if (doorsIntersect[i].getAttribute('class').indexOf('mystery') > -1){
			isAtIntersection = false;
			return;
		}
		
		if (doorsIntersect[i].getAttribute('class').indexOf('broken') > -1 || doorsIntersect[i].children.length<2){
			objDoors.length.push("LONG");
			objDoors.tier.push("PLAIN");
			objDoors.name.push("BROKEN");
			objDoors.debug.push("LONG PLAIN BROKEN");
			objDoors.code.push("");
			objDoors.clue.push(Number.MAX_SAFE_INTEGER);
			objDoors.priorities.push(Number.MAX_SAFE_INTEGER);
		}
		else {
			temp = doorsIntersect[i].children[1].innerText.toUpperCase();
			objDoors.debug.push(temp);
			temp = temp.split(" ");
			objDoors.length.push(temp[0]);
			objDoors.tier.push(temp[1]);
			objDoors.name.push(temp[2]);
			objDoors.code.push(objCodename[temp[0]] + objCodename[temp[1]]);
			objDoors.clue.push(Number.MAX_SAFE_INTEGER);
			objDoors.priorities.push(Number.MAX_SAFE_INTEGER);
		}
		isAtIntersection = true;
	}

	console.plog(objDoors.debug.join(","));
	var userVariable = undefined;
	temp = "";
	var range = "";
	var index = [];
	try	{
		userVariable = JSON.parse(getPageVariable('JSON.stringify(user.quests.QuestLabyrinth)'));
		for (var i=0;i<userVariable.all_clues.length;i++){
			temp = userVariable.all_clues[i].name.toUpperCase();
			if (temp.indexOf("DEAD") > -1)
				continue;
			index = getAllIndices(objDoors.name, temp);
			for(var j=0;j<index.length;j++){
				objDoors.clue[index[j]] = userVariable.all_clues[i].quantity;
			}
		}

		index = objDoors.name.indexOf(objLaby.districtFocus);
		if(index<0){
			if(objLaby.chooseOtherDoors){
				console.pdebug(objDoors);
				temp = min(objDoors.clue);
				var objFewestClue = {
					num : temp,
					indices : getAllIndices(objDoors.clue, temp),
					count : countArrayElement(temp, objDoors.clue)
				};
				var objShortestLength = {
					type : "SHORT",
					indices : [],
					count : 0
				};
				if(objDoors.length.indexOf("SHORT") > -1)
					objShortestLength.type = "SHORT";
				else if(objDoors.length.indexOf("MEDIUM") > -1)
					objShortestLength.type = "MEDIUM";
				else if(objDoors.length.indexOf("LONG") > -1)
					objShortestLength.type = "LONG";
				objShortestLength.indices = getAllIndices(objDoors.length, objShortestLength.type);
				objShortestLength.count = objShortestLength.indices.length;
				console.pdebug(JSON.stringify(objShortestLength));
				console.pdebug(JSON.stringify(objFewestClue));
				if(objShortestLength.indices.length < 1 || objFewestClue.indices.length < 1){
					checkThenArm(null, 'bait', 'Gouda');
					disarmTrap('trinket');
					return;
				}

				var arrTemp = [];
				var nMin = Number.MAX_SAFE_INTEGER;
				var nMinIndex = -1;
				if(objLaby.typeOtherDoors.indexOf("SHORTEST") === 0){ // SHORTEST_ONLY / SHORTEST_FEWEST
					if(objShortestLength.count > 1 && objLaby.typeOtherDoors.indexOf("FEWEST") > -1){
						for(var i=0;i<objShortestLength.indices.length;i++){
							if(objDoors.clue[objShortestLength.indices[i]] < nMin){
								nMin = objDoors.clue[objShortestLength.indices[i]];
								nMinIndex = objShortestLength.indices[i];
							}
						}
						if(nMinIndex > -1)
							arrTemp.push(nMinIndex);
					}
					else
						arrTemp = objShortestLength.indices;
				}
				else if(objLaby.typeOtherDoors.indexOf("FEWEST") === 0){ // FEWEST_ONLY / FEWEST_SHORTEST
					if(objFewestClue.count > 1 && objLaby.typeOtherDoors.indexOf("SHORTEST") > -1){
						var strTemp = "";
						for(var i=0;i<objFewestClue.indices.length;i++){
							strTemp = objDoors.length[objFewestClue.indices[i]].toUpperCase();
							if(objLength.hasOwnProperty(strTemp) && objLength[strTemp] < nMin){
								nMin = objLength[strTemp];
								nMinIndex = objFewestClue.indices[i];
							}
						}
						if(nMinIndex > -1)
							arrTemp.push(nMinIndex);
					}
					else
						arrTemp = objFewestClue.indices;
				}
				for(var i=0;i<arrTemp.length;i++){
					if(objDoors.name[arrTemp[i]].indexOf("BROKEN") < 0){
						fireEvent(doorsIntersect[arrTemp[i]], 'click');
						window.setTimeout(function () { fireEvent(document.getElementsByClassName('mousehuntActionButton confirm')[0], 'click'); }, 1500);
						break;
					}
				}
			}
			else{
				checkThenArm(null, 'bait', 'Gouda');
				disarmTrap('trinket');
			}
			return;
		}
		else{
			if(objDoors.clue[index]<15)
				range = 'between0and14';
			else if(objDoors.clue[index]<60)
				range = 'between15and59';
			else
				range = 'between60and100';
		}

		var arr;
		var arrAll = [];
		for (var i=0;i<objLaby[range].length;i++){
			// i = 0/1/2 = plain/superior/epic
			arr = [];
			for (var j=0;j<3;j++)
				arr.push(j+1 + (objLaby[range].length-1-i)*3);
			
			if(objLaby[range][i].indexOf(objCodename.LONG) === 0)
				arrAll = arrAll.concat(arr.reverse());
			else
				arrAll = arrAll.concat(arr);
		}

		for (var i=arrAll.length;i<arrHallwayOrder.length;i++)
			arrAll.push(Number.MAX_SAFE_INTEGER);

		for (var i=0;i<objDoors.code.length;i++){
			if(objDoors.name[i].indexOf(objLaby.districtFocus)>-1){
				index = arrHallwayOrder.indexOf(objDoors.code[i]);
				if(index > -1){
					objDoors.priorities[i] = arrAll[index];
				}
			}
		}

		console.pdebug(objDoors);
		var sortedDoorPriorities = sortWithIndices(objDoors.priorities, "ascend");
		fireEvent(doorsIntersect[sortedDoorPriorities.index[0]], 'click');
		window.setTimeout(function () { fireEvent(document.getElementsByClassName('mousehuntActionButton confirm')[0], 'click'); }, 1500);
	}
	catch (e){
		console.perror('labyrinth',e.message);
		checkThenArm(null, 'bait', 'Gouda');
		disarmTrap('trinket');
		return;
	}
}

function zokor(){
	var loc = GetCurrentLocation();
	if (loc.indexOf("Labyrinth") > -1){
		setStorage('eventLocation', 'Labyrinth');
		labyrinth();
		return;
	}
	else if (loc.indexOf("Zokor") < 0)
		return;
	
	var objZokorDefault = {
		bossStatus : ['INCOMING', 'ACTIVE', 'DEFEATED'],
		bait : new Array(3).fill('Gouda'),
		trinket : new Array(3).fill('None')
	};

	var objZokor = JSON.parse(getStorageToVariableStr('Zokor', JSON.stringify(objZokorDefault)));
	var objAncientCity = JSON.parse(getPageVariable('JSON.stringify(user.quests.QuestAncientCity)'));
	objAncientCity.boss = objAncientCity.boss.toUpperCase();
	var nIndex = objZokor.bossStatus.indexOf(objAncientCity.boss);
	console.plog('District Tier:', objAncientCity.district_tier, 'Boss Status:', objAncientCity.boss);
	if(objAncientCity.district_tier < 3)
		return;

	checkThenArm('best', 'weapon', objBestTrap.weapon.forgotten);
	checkThenArm('best', 'base', objBestTrap.base.luck);
	if(nIndex > -1){
		checkThenArm(null, 'bait', objZokor.bait[nIndex]);
		if(objZokor.trinket[nIndex] == 'None')
			disarmTrap('trinket');
		else
			checkThenArm(null, 'trinket', objZokor.trinket[nIndex]);
	}
}

function fw(){
	if (GetCurrentLocation().indexOf("Fiery Warpath") < 0)
		return;

	var wave = getPageVariable('user.viewing_atts.desert_warpath.wave');
	wave = parseInt(wave);
	var objDefaulFWAll = {
		wave1 : JSON.parse(JSON.stringify(objDefaultFW)),
		wave2 : JSON.parse(JSON.stringify(objDefaultFW)),
		wave3 : JSON.parse(JSON.stringify(objDefaultFW)),
		wave4 : JSON.parse(JSON.stringify(objDefaultFW)),
	};
	var objFWAll = JSON.parse(getStorageToVariableStr('FW',JSON.stringify(objDefaulFWAll)));
	var objFW = objFWAll['wave'+wave];
	checkThenArm(null, 'base', objFW.base);
    if (wave == 4){
		checkThenArm(null, 'weapon', objFW.weapon);
		checkThenArm(null, 'bait', 'Gouda');
        return;
    }

	objFW.streak = parseInt(document.getElementsByClassName('streak_quantity')[0].innerText);
    console.pdebug('Wave:', wave, 'Streak:', objFW.streak);
	if(Number.isNaN(objFW.streak) || objFW.streak < 0 || objFW.streak >= g_fwStreakLength)
		return;

	if(objFW.cheese[objFW.streak] === null)
		objFW.cheese[objFW.streak] = 'Gouda';
	if(objFW.charmType[objFW.streak] === null)
		objFW.charmType[objFW.streak] = 'Warpath';
	if(objFW.special[objFW.streak] === null)
		objFW.special[objFW.streak] = 'None';

	objFW.streakMouse = getPageVariable('user.viewing_atts.desert_warpath.streak.mouse_type');
	if(objFW.streakMouse.indexOf('desert_') > -1)
		objFW.streakMouse = capitalizeFirstLetter(objFW.streakMouse.split('_')[1]);

    console.pdebug('Current streak mouse type:', objFW.streakMouse);
	var population = document.getElementsByClassName('population');
	objFW.population = {
		all : [],
		normal : [],
		special : [],
		active : []
	};
	objFW.soldierActive = false;
	var temp;
	for(var i=0;i<population.length;i++){
		temp = parseInt(population[i].innerText);
		if(Number.isNaN(temp))
			temp = 0;
		objFW.population.all.push(temp);
		if(temp > 0)
			objFW.population.active.push(1);
		else
			objFW.population.active.push(0);
		if(i == objPopulation.WARRIOR || i == objPopulation.SCOUT || i == objPopulation.ARCHER){
			objFW.population.normal.push(temp);
			objFW.soldierActive |= (temp > 0);
		}
		else{
			objFW.population.special.push(temp);
		}
	}

	if(!objFW.soldierActive && objFW.focusType == 'NORMAL')
		objFW.focusType = 'SPECIAL';

	console.pdebug(objFW);
	var index = -1;
	var charmArmed = getPageVariable('user.trinket_name');
	var nSum = sumData(objFW.population.active);
	if(nSum == 1){ // only one soldier type left
		if(objFW.lastSoldierConfig == 'CONFIG_STREAK')
			objFW.priorities = 'HIGHEST';
		else{
			if(objFW.lastSoldierConfig == 'CONFIG_GOUDA'){
				index = objFW.population.active.indexOf(1);
				if(index == objPopulation.CAVALRY)
					checkThenArm('best', 'weapon', objBestTrap.weapon.tactical);
				else if(index == objPopulation.MAGE)
					checkThenArm('best', 'weapon', objBestTrap.weapon.hydro);
				else if(index == objPopulation.ARTILLERY)
					checkThenArm('best', 'weapon', objBestTrap.weapon.arcane);
				else
					checkThenArm(null, 'weapon', objFW.weapon);
				if(charmArmed.indexOf('Warpath') > -1)
					disarmTrap('trinket');
			}
			return;
		}
	}
	if(objFW.special[objFW.streak] == 'COMMANDER')
		checkThenArm(null, 'trinket', objFW.charmType[objFW.streak] + ' Commander\'s');
	else if(objFW.special[objFW.streak] == 'GARGANTUA'){
		checkThenArm('best', 'weapon', objBestTrap.weapon.draconic);
		if(charmArmed.indexOf('Warpath') > -1)
			disarmTrap('trinket');
	}
	else{
		var bCurrentStreakZeroPopulation = false;
		var bWrongSoldierTypeStreak = false;
		var indexMinMax;
		objFW.focusType = objFW.focusType.toLowerCase();
		if(objFW.priorities == 'HIGHEST')
			indexMinMax = maxIndex(objFW.population[objFW.focusType]);
		else{
			for(var i=0;i<objFW.population[objFW.focusType].length;i++){
				if(objFW.population[objFW.focusType][i] < 1)
					objFW.population[objFW.focusType][i] = Number.MAX_SAFE_INTEGER;
			}
			indexMinMax = minIndex(objFW.population[objFW.focusType]);
		}
		index = objPopulation.name.indexOf(objFW.streakMouse);
		if(index > -1){
			bCurrentStreakZeroPopulation = (objFW.population.all[index] < 1);
			if(objFW.soldierActive && index >=3 && objFW.focusType.toUpperCase() == 'NORMAL'){
				bWrongSoldierTypeStreak = !(objFW.streak == 2 || objFW.streak >= 5);
			}
			else if(!objFW.soldierActive && objFW.focusType.toUpperCase() == 'SPECIAL'){
				bWrongSoldierTypeStreak = (index != (indexMinMax+3) && objFW.streak < 2);
			}
		}

		if(objFW.streak === 0 || bCurrentStreakZeroPopulation || bWrongSoldierTypeStreak){
			objFW.streak = 0;
			temp = objFW.population[objFW.focusType][indexMinMax];
			if(objFW.focusType.toUpperCase() == 'NORMAL'){
				checkThenArm(null, 'weapon', objFW.weapon);
				var count = countArrayElement(temp, objFW.population[objFW.focusType]);
				if(count > 1){
					if(objFW.population[objFW.focusType][objPopulation.SCOUT] == temp)
						checkThenArm(null, 'trinket', objFW.charmType[0] + ' Scout');
					else if(objFW.population[objFW.focusType][objPopulation.ARCHER] == temp)
						checkThenArm(null, 'trinket', objFW.charmType[0] + ' Archer');
					else if(objFW.population[objFW.focusType][objPopulation.WARRIOR] == temp)
						checkThenArm(null, 'trinket', objFW.charmType[0] + ' Warrior');
				}
				else{
					checkThenArm(null, 'trinket', objFW.charmType[0] + ' ' + objPopulation.name[indexMinMax]);
				}
			}
			else{
				if((indexMinMax+3) == objPopulation.ARTILLERY && nSum !=1){
					temp = objFW.population.special.slice();
					temp.splice(indexMinMax,1);
					indexMinMax = minIndex(temp);
				}
				indexMinMax += 3;
				if(indexMinMax == objPopulation.CAVALRY){
					checkThenArm('best', 'weapon', objBestTrap.weapon.tactical);
					checkThenArm(null, 'trinket', objFW.charmType[0] + ' Cavalry');
				}
				else if(indexMinMax == objPopulation.MAGE){
					checkThenArm('best', 'weapon', objBestTrap.weapon.hydro);
					checkThenArm(null, 'trinket', objFW.charmType[0] + ' Mage');
				}
				else if(indexMinMax == objPopulation.ARTILLERY){
					checkThenArm('best', 'weapon', objBestTrap.weapon.arcane);
					if(charmArmed.indexOf('Warpath') > -1)
						disarmTrap('trinket');
				}
			}
		}
		else{
			if(index == objPopulation.ARTILLERY && charmArmed.indexOf('Warpath') > -1)
				disarmTrap('trinket');
			else{
				if(objFW.charmType[objFW.streak].indexOf('Super') > -1){
					temp = [objFW.charmType[objFW.streak] + ' ' + objPopulation.name[index], 'Warpath ' + objPopulation.name[index]];
					checkThenArm('best', 'trinket', temp);
				}
				else{
					checkThenArm(null, 'trinket', objFW.charmType[objFW.streak] + ' ' + objPopulation.name[index]);
				}
			}

			if(index == objPopulation.CAVALRY)
				checkThenArm('best', 'weapon', objBestTrap.weapon.tactical);
			else if(index == objPopulation.MAGE)
				checkThenArm('best', 'weapon', objBestTrap.weapon.hydro);
			else if(index == objPopulation.ARTILLERY)
				checkThenArm('best', 'weapon', objBestTrap.weapon.arcane);
			else
				checkThenArm(null, 'weapon', objFW.weapon);
		}
	}
	checkThenArm(null, 'bait', objFW.cheese[objFW.streak]);
}

function fRift(){
	if(GetCurrentLocation().indexOf('Furoma Rift') < 0)
		return;
	
	var objFRDefault = {
		enter : 0,
		retreat : 0,
		weapon : new Array(11).fill(''),
		base : new Array(11).fill(''),
		trinket : new Array(11).fill(''),
		bait : new Array(11).fill('')
	};

	var objFR = JSON.parse(getStorageToVariableStr('FRift', JSON.stringify(objFRDefault)));
	objFR.enter = parseInt(objFR.enter);
	objFR.retreat = parseInt(objFR.retreat);
	var bInPagoda = (getPageVariable('user.quests.QuestRiftFuroma.view_state') == 'pagoda');
	var i;
	if(bInPagoda){
		var nCurBatteryLevel = 0;
		var nRemainingEnergy = parseInt(getPageVariable('user.quests.QuestRiftFuroma.droid.remaining_energy').replace(/,/g, ''));
		if(Number.isNaN(nRemainingEnergy)){
			console.plog('Remaining Energy:', nRemainingEnergy);
			return;
		}
		for(i=objFRBattery.cumulative.length-1;i>=0;i--){
			if(nRemainingEnergy <= objFRBattery.cumulative[i])
				nCurBatteryLevel = i+1;
			else
				break;
		}
		console.plog('In Pagoda, Current Battery Level:', nCurBatteryLevel, 'Remaining Energy:', nRemainingEnergy);
		if(nCurBatteryLevel <= objFR.retreat){
			fRiftArmTrap(objFR, 0);
			if(nCurBatteryLevel !== 0){
				// retreat
				fireEvent(document.getElementsByClassName('riftFuromaHUD-leavePagoda')[0], 'click');
				window.setTimeout(function () { fireEvent(document.getElementsByClassName('mousehuntActionButton confirm')[0], 'click'); }, 1500);
			}
		}
		else{
			fRiftArmTrap(objFR, nCurBatteryLevel);
		}
	}
	else{
		var nFullBatteryLevel = 0;
		var classBattery = document.getElementsByClassName('riftFuromaHUD-battery');
		var nStoredEnerchi = parseInt(document.getElementsByClassName('total_energy')[0].children[1].innerText.replace(/,/g, ''));
		if(classBattery.length < 1 || Number.isNaN(nStoredEnerchi))
			return;
		for(i=0;i<objFRBattery.cumulative.length;i++){
			if(nStoredEnerchi >= objFRBattery.cumulative[i])
				nFullBatteryLevel = i+1;
			else
				break;
		}
		console.log('In Training Ground, Fully Charged Battery Level:', nFullBatteryLevel, 'Stored Enerchi:', nStoredEnerchi);
		if(nFullBatteryLevel >= objFR.enter){
			fRiftArmTrap(objFR, nFullBatteryLevel);
			// enter
			fireEvent(classBattery[nFullBatteryLevel-1], 'click');
			window.setTimeout(function () { fireEvent(document.getElementsByClassName('mousehuntActionButton confirm')[0], 'click'); }, 1500);
		}
		else{
			fRiftArmTrap(objFR, 0);
		}
	}
}

function fRiftArmTrap(obj, nIndex){
	checkThenArm(null, 'weapon', obj.weapon[nIndex]);
	checkThenArm(null, 'base', obj.base[nIndex]);
	if(obj.bait[nIndex] == 'ANY_MASTER')
		checkThenArm('best', 'bait', ['Rift Glutter', 'Rift Susheese', 'Rift Combat']);
	else
		checkThenArm(null, 'bait', obj.bait[nIndex]);
	if(obj.trinket[nIndex] == 'None')
		disarmTrap('trinket');
	else
		checkThenArm(null, 'trinket', obj.trinket[nIndex]);
}

function livingGarden(obj) {
    checkThenArm('best', 'weapon', objBestTrap.weapon.hydro);
	var pourEstimate = document.getElementsByClassName('pourEstimate')[0];
    if (pourEstimate.innerText !== ""){
        checkThenArm('best', 'base', bestLGBase);
		if(!obj.LG.isAutoFill){
			if (getPageVariable('user.trinket_name').indexOf('Sponge') > -1)
				disarmTrap('trinket');
			return;
		}
		// Not pouring
        var estimateHunt = parseInt(pourEstimate.innerText);
        console.pdebug('Filling, Estimate Hunt:', estimateHunt);
        if (estimateHunt >= 35){
			if (obj.LG.isAutoPour) {
				console.pdebug('Going to click Pour...');
				var pourButton = document.getElementsByClassName('pour')[0];
				if (pourButton){
					fireEvent(pourButton, 'click');
					if (document.getElementsByClassName('confirm button')[0])
						window.setTimeout(function () { fireEvent(document.getElementsByClassName('confirm button')[0], 'click'); }, 2000);
				}
				checkThenArm(null, 'base', obj.LG.base.after);
				checkThenArm(null, 'bait', obj.LG.bait.after);
				if (obj.LG.trinket.after.indexOf('Sponge') > -1)
					obj.LG.trinket.after = 'None';
				checkThenArm(null, 'trinket', obj.LG.trinket.after);
			}
			else{
				if (getPageVariable('user.trinket_name').indexOf('Sponge') > -1)
					disarmTrap('trinket');
			}
        }
		else if (estimateHunt >= 28)
			checkThenArm(null, 'trinket', 'Sponge');
        else
            checkThenArm('best', 'trinket', spongeCharm);
    }
    else{
        // Pouring
		console.pdebug('Pouring...');
		checkThenArm(null, 'base', obj.LG.base.after);
		checkThenArm(null, 'bait', obj.LG.bait.after);
		if (obj.LG.trinket.after.indexOf('Sponge') > -1)
			obj.LG.trinket.after = 'None';
		checkThenArm(null, 'trinket', obj.LG.trinket.after);
    }
}

function lostCity(obj) {
	checkThenArm('best', 'weapon', objBestTrap.weapon.arcane);
	checkThenArm(null, 'bait', 'Dewthief');
	var isCursed = (document.getElementsByClassName('stateBlessed hidden').length > 0);
    console.pdebug('Cursed:', isCursed);
    
	//disarm searcher charm when cursed is lifted
    if (!isCursed) {
		checkThenArm(null, 'base', obj.LG.base.after);
		if (obj.LC.trinket.after.indexOf('Searcher') > -1)
            obj.LC.trinket.after = 'None';
		checkThenArm(null, 'trinket', obj.LC.trinket.after);
    }
    else{
        checkThenArm(null, 'trinket', 'Searcher');
		checkThenArm('best', 'base', bestLGBase);
	}
}

function sandDunes() {
	var hasStampede = getPageVariable('user.quests.QuestSandDunes.minigame.has_stampede');
    console.pdebug('Has Stampede:', hasStampede);

    //disarm grubling chow charm when there is no stampede
    if (hasStampede == 'false'){
        if (getPageVariable('user.trinket_name').indexOf('Chow') > -1)
            disarmTrap('trinket');
    }
    else
        checkThenArm(null, 'trinket', 'Grubling Chow');
	checkThenArm('best', 'weapon', objBestTrap.weapon.shadow);
	checkThenArm('best', 'base', bestLGBase);
	checkThenArm(null, 'bait', 'Dewthief');
}

function twistedGarden(obj) {
    checkThenArm('best', 'weapon', objBestTrap.weapon.hydro);
	checkThenArm('best', 'base', bestLGBase);
	var red = parseInt(document.getElementsByClassName('itemImage red')[0].innerText);
    var yellow = parseInt(document.getElementsByClassName('itemImage yellow')[0].innerText);
    var charmArmed = getPageVariable('user.trinket_name');
    console.pdebug('Red:', red, 'Yellow:', yellow);
	var redPlusYellow = redSpongeCharm.concat(yellowSpongeCharm);
	if(!obj.TG.isAutoFill){
		if (charmArmed.indexOf('Red') > -1 || charmArmed.indexOf('Yellow') > -1)
            disarmTrap('trinket');
		return;
	}
	if (red <= 8 && yellow <= 8)
		checkThenArm('best', 'trinket', redPlusYellow);
    else if (red < 10){
        if (red <= 8)
            checkThenArm('best', 'trinket', redSpongeCharm);
        else
            checkThenArm(null, 'trinket', 'Red Sponge');
    }
    else if (red == 10 && yellow < 10){
        if (yellow <=8)
            checkThenArm('best', 'trinket', yellowSpongeCharm);
        else
            checkThenArm(null, 'trinket', 'Yellow Sponge');
    }
    else {
        if(obj.TG.isAutoPour){
			if (!(Number.isNan(red) || Number.isNaN(yellow))) {
				var pourButton = document.getElementsByClassName('pour')[0];
				if (!isNullOrUndefined(pourButton)){
					fireEvent(pourButton, 'click');
					if (document.getElementsByClassName('confirm button')[0])
						window.setTimeout(function () { fireEvent(document.getElementsByClassName('confirm button')[0], 'click'); }, 1000);
				}
			}
			checkThenArm(null, 'base', obj.TG.base.after);
			if (obj.TG.trinket.after.indexOf('Red') > -1 || obj.TG.trinket.after.indexOf('Yellow') > -1)
				obj.TG.trinket.after = 'None';
			checkThenArm(null, 'trinket', obj.TG.trinket.after);
		}
		else{
			checkThenArm('best', 'base', bestLGBase);
			if (charmArmed.indexOf('Red') > -1 || charmArmed.indexOf('Yellow') > -1)
				disarmTrap('trinket');
		}
    }
}

function cursedCity(obj) {
    checkThenArm('best', 'weapon', objBestTrap.weapon.arcane);
	checkThenArm(null, 'bait', 'Graveblossom');
	var cursed = getPageVariable('user.quests.QuestLostCity.minigame.is_cursed');
    var curses = "";
    var charmArmed = getPageVariable('user.trinket_name');
    if (cursed == 'false'){
		checkThenArm(null, 'base', obj.CC.base.after);
        if (obj.CC.trinket.after.indexOf('Bravery') > -1 || obj.CC.trinket.after.indexOf('Shine') > -1 || obj.CC.trinket.after.indexOf('Clarity') > -1)
            obj.CC.trinket.after = 'None';
		checkThenArm(null, 'trinket', obj.CC.trinket.after);
    }
    else{
        var cursedCityCharm = [];
		for (var i = 0; i < 3; ++i){
            curses = getPageVariable('user.quests.QuestLostCity.minigame.curses[' + i + '].active');
            if (curses == 'true'){
				switch (i)
                {
                    case 0:
                        console.pdebug("Fear Active");
						cursedCityCharm.push('Bravery');
						break;
                    case 1:
                        console.pdebug("Darkness Active");
						cursedCityCharm.push('Shine');
						break;
                    case 2:
						console.pdebug("Mist Active");
						cursedCityCharm.push('Clarity');
						break;
                }
            }
        }
		checkThenArm('best', 'trinket', cursedCityCharm);
		checkThenArm('best', 'base', bestLGBase);
    }
}

function sandCrypts(obj) {
    checkThenArm('best', 'weapon', objBestTrap.weapon.shadow);
	checkThenArm(null, 'bait', 'Graveblossom');
	var salt = parseInt(document.getElementsByClassName('salt_charms')[0].innerText);
    console.pdebug('Salted:', salt);
    if (salt >= obj.SC.maxSaltCharged){
		checkThenArm(null, 'base', obj.SC.base.after);
        checkThenArm(null, 'trinket', 'Grub Scent');
	}
    else {
		checkThenArm(null, 'base', obj.SC.base.before);
		if ((obj.SC.maxSaltCharged - salt) == 1)
			checkThenArm(null, 'trinket', 'Grub Salt');
		else
			checkThenArm('best', 'trinket', bestSalt);
    }
}

function DisarmLGSpecialCharm(locationName)
{
	var obj = {};
	obj['Living Garden'] = spongeCharm.slice();
	obj['Lost City'] = ['Searcher'];
	obj['Sand Dunes'] = ['Grubling Chow'];
	obj['Twisted Garden'] = redSpongeCharm.concat(yellowSpongeCharm);
	obj['Cursed City'] = ['Bravery', 'Shine', 'Clarity'];
	obj['Sand Crypts'] = bestSalt.slice();
	delete obj[locationName];
	var charmArmed = getPageVariable("user.trinket_name");
	for (var prop in obj)
	{
		if(obj.hasOwnProperty(prop))
		{
			for (var i = 0; i < obj[prop].length; ++i)
			{
				if (charmArmed.indexOf(obj[prop][i]) === 0)
				{
					disarmTrap('trinket');
					return;
				}
			}
		}
	}
}

function retrieveMouseList() {
    fireEvent(document.getElementById('effectiveness'), 'click');
    var sec = secWait;
    var intervalRML = setInterval(
        function () {
            if (document.getElementsByClassName('thumb').length > 0)
            {
                mouseList = [];
                var y = document.getElementsByClassName('thumb');
                for (var i = 0; i < y.length; ++i) {
                    mouseList.push(y[i].getAttribute('title'));
                }
                fireEvent(document.getElementById('trapSelectorBrowserClose'), 'click');
                clearInterval(intervalRML);
                intervalRML = null;
                return;
            }
            else
            {
                --sec;
                if (sec <= 0) {
                    fireEvent(document.getElementById('effectiveness'), 'click');
                    sec = secWait;
                }
            }
        }, 1000);
    return;
}

function checkMouse(mouseName) {
    for (var i = 0; i < mouseList.length; ++i) {
        if (mouseList[i].indexOf(mouseName) > -1) {
            return true;
        }
        return false;
    }
}

function checkCharge2016(stopDischargeAt){
	try {
		var charge = parseInt(document.getElementsByClassName('springHuntHUD-charge-quantity')[0].innerText);
		var isDischarge = (getStorage("discharge") == "true");
		console.pdebug('Current Charge:', charge, 'Discharging:', isDischarge, 'Stop Discharge At:', stopDischargeAt);
		var charmContainer = document.getElementsByClassName('springHuntHUD-charmContainer')[0];
		var eggstra = {};
		eggstra.quantity = parseInt(charmContainer.children[0].children[0].innerText);
		eggstra.link = charmContainer.children[0].children[1];
		eggstra.isArmed = (eggstra.link.getAttribute('class').indexOf('active') > 0);
		eggstra.canArm = (eggstra.quantity > 0 && !eggstra.isArmed);
		var eggstraCharge = {};
		eggstraCharge.quantity = parseInt(charmContainer.children[1].children[0].innerText);
		eggstraCharge.link = charmContainer.children[1].children[1];
		eggstraCharge.isArmed = (eggstraCharge.link.getAttribute('class').indexOf('active') > 0);
		eggstraCharge.canArm = (eggstraCharge.quantity > 0 && !eggstraCharge.isArmed);
		var eggscavator = {};
		eggscavator.quantity = parseInt(charmContainer.children[2].children[0].innerText);
		eggscavator.link = charmContainer.children[2].children[1];
		eggscavator.isArmed = (eggscavator.link.getAttribute('class').indexOf('active') > 0);
		eggscavator.canArm = (eggscavator.quantity > 0 && !eggscavator.isArmed);

        if (charge == 20) {
            setStorage("discharge", "true");
			if (eggstra.canArm) fireEvent(eggstra.link, 'click');
        }
        else if (charge < 20 && charge > stopDischargeAt) {
            if (isDischarge) {
				if (eggstra.canArm) fireEvent(eggstra.link, 'click');
            }
            else {
				if (charge >= chargeHigh) {
					if (eggstraCharge.quantity > 0){
						if (!eggstraCharge.isArmed) fireEvent(eggstraCharge.link, 'click');
					}
					else{
						if (eggscavator.canArm) fireEvent(eggscavator.link, 'click');
					}
				}
				else {
					if (eggscavator.canArm) fireEvent(eggscavator.link, 'click');
				}
            }
        }
		else if (charge <= stopDischargeAt) {
			if (charge >= chargeHigh) {
				if (eggstraCharge.quantity > 0){
					if (!eggstraCharge.isArmed) fireEvent(eggstraCharge.link, 'click');
				}
				else{
					if (eggscavator.canArm) fireEvent(eggscavator.link, 'click');
				}
			}
			else {
				if (eggscavator.canArm) fireEvent(eggscavator.link, 'click');
			}
			setStorage("discharge", "false");
		}
    }
    catch (e) {
        console.perror('checkCharge2016',e.message);
    }
}
function checkCharge(stopDischargeAt) {
    try {
        var charge = parseInt(document.getElementsByClassName("chargeQuantity")[0].innerText);
		console.pdebug('Current Charge:', charge);
        if (charge == 20) {
            setStorage("discharge", true.toString());
            checkThenArm(null, "trinket", "Eggstra Charm");
        }

        else if (charge < 20 && charge > stopDischargeAt) {
            if (getStorage("discharge") == "true") {
                checkThenArm(null, "trinket", "Eggstra Charm");
            }
            else {
				if (stopDischargeAt == 17) {
					checkThenArm('best', "trinket", chargeCharm);
				}
				else {
					checkThenArm(null, "trinket", "Eggscavator");
				}
            }
        }
		else if (charge == stopDischargeAt) {
			if (stopDischargeAt == 17) {
				checkThenArm('best', "trinket", chargeCharm);
			}
			else {
				checkThenArm(null, "trinket", "Eggscavator");
			}
			setStorage("discharge", false.toString());
		}
        else if (charge < stopDischargeAt) {
            setStorage("discharge", false.toString());
			checkThenArm(null, "trinket", "Eggscavator");
        }
        return;
    }
    catch (e) {
        console.perror('checkCharge',e.message);
    }
}

function checkThenArm(sort, category, name, isForcedRetry)   //category = weapon/base/charm/trinket/bait
{
	if(isNullOrUndefined(name) || name === '')
		return;

	if (category == "charm")
        category = "trinket";

	if(!Array.isArray(name) && name.toUpperCase() === 'NONE'){
		disarmTrap(category);
		return;
	}

	if(isNullOrUndefined(isForcedRetry))
		isForcedRetry = true;

    var trapArmed = undefined;
	var userVariable = getPageVariable("user." + category + "_name");
    if (sort == 'best') {
		getTrapList(category);
		if (objTrapList[category].length === 0){
			var intervalCTA1 = setInterval(
				function (){
					if (!arming){
						getTrapListFromTrapSelector(sort, category, name, isForcedRetry);
						clearInterval(intervalCTA1);
						intervalCTA1 = null;
						return;
					}
				}, 1000);
			return;
		}
		else{
			var nIndex = -1;
			for (var i = 0; i < name.length; i++) {
				for (var j = 0; j < objTrapList[category].length; j++) {
					nIndex = objTrapList[category][j].indexOf("...");
					if(nIndex > -1)
						name[i] = name[i].substr(0,nIndex);
					if (objTrapList[category][j].indexOf(name[i]) === 0){
						console.plog('Best', category, 'found:', name[i], 'Currently Armed:', userVariable);
						if (userVariable.indexOf(name[i]) === 0) {
							trapArmed = true;
							arming = false;
							closeTrapSelector(category);
							return;
						}
						else {
							trapArmed = false;
							break;
						}
					}
				}
				if (trapArmed === false)
					break;
			}
		}
    }
    else
    {
        trapArmed = (userVariable.indexOf(name) === 0);
    }

	if (trapArmed === undefined && isForcedRetry){
		console.plog(name.join("/"), "not found in TrapList" + capitalizeFirstLetter(category));
		clearTrapList(category);
		checkThenArm(sort, category, name, false);
	}
    else if (trapArmed === false)
    {
        var intervalCTA = setInterval(
            function ()
            {
                if (arming === false)
                {
                    clickThenArmTrapInterval(sort, category, name);
                    clearInterval(intervalCTA);
                    intervalCTA = null;
                    return;
                }
            }, 1000);
    }

    return;
}

function clickThenArmTrapInterval(sort, trap, name) //sort = power/luck/attraction
{
    clickTrapSelector(trap);
    var sec = secWait;
	var armStatus = LOADING;
	var retry = armTrapRetry;
    var intervalCTATI = setInterval(
        function ()
        {
            armStatus = armTrap(sort, trap, name);
			if (armStatus != LOADING)
            {
                if(isNewUI)
					closeTrapSelector(trap);
				clearInterval(intervalCTATI);
                arming = false;
                intervalCTATI = null;
				if (armStatus == NOT_FOUND){
					//clearTrapList(trap);
					if (trap == 'trinket')
						disarmTrap('trinket');
					else
						closeTrapSelector(trap);
				}
                return;
            }
            else
            {
                --sec;
                if (sec <= 0)
                {
                    clickTrapSelector(trap);
                    sec = secWait;
					--retry;
					if (retry <= 0)
					{
						clearInterval(intervalCTATI);
						arming = false;
						intervalCTATI = null;
						return;
					}
                }
            }
        }, 1000);
    return;
}

// name = Brie/Gouda/Swiss (brie = wrong)
function armTrap(sort, trap, name) {
    return (isNewUI) ? armTrapNewUI(sort, trap, name) : armTrapClassicUI(sort, trap, name);
}

function armTrapClassicUI(sort, trap, name){
	var tagGroupElement = document.getElementsByClassName('tagGroup');
    var tagElement;
    var nameElement;
	var nIndex = -1;
	var nameArray = name;
	
    if (sort == 'best')
        name = name[0];
    
    if (tagGroupElement.length > 0)
    {
        console.pdebug('Try to arm', name);
        for (var i = 0; i < tagGroupElement.length; ++i)
        {
            tagElement = tagGroupElement[i].getElementsByTagName('a');
            for (var j = 0; j < tagElement.length; ++j)
            {
                nameElement = tagElement[j].getElementsByClassName('name')[0].innerText;
				nIndex = nameElement.indexOf("...");
				if(nIndex > -1)
					name = name.substr(0, nIndex);
                if (nameElement.indexOf(name) === 0)
                {
                    if(tagElement[j].getAttribute('class').indexOf('selected')<0)	// only click when not arming
						fireEvent(tagElement[j], 'click');
					else
						closeTrapSelector(trap);
					
					if(objTrapList[trap].indexOf(nameElement) < 0){
						objTrapList[trap].unshift(nameElement);
						setStorage("TrapList" + capitalizeFirstLetter(trap), objTrapList[trap].join(","));
					}
					
					console.pdebug(name, 'armed');
					return ARMED;
                }
            }
        }
		console.pdebug(name, 'not found');
		for(var i=0;i<objTrapList[trap].length;i++){
			if(objTrapList[trap][i].indexOf(name) === 0){
				objTrapList[trap].splice(i,1);
				setStorage("TrapList" + capitalizeFirstLetter(trap), objTrapList[trap].join(","));
				break;
			}
		}
        if (sort == 'best')
        {
			nameArray.shift();
            if (nameArray.length > 0)
                return armTrapClassicUI(sort, trap, nameArray);
			else
				return NOT_FOUND;
        }
		else
			return NOT_FOUND;
    }
	else
		return LOADING;
}

function armTrapNewUI(sort, trap, name){
	var passedFiltersEle = document.getElementsByClassName('passedFilters')[0].children;
    var nameElement;
	var nameArray = name;
	
    if (sort == 'best')
        name = name[0];
	
	if (passedFiltersEle.length > 0) {
		console.pdebug('Trying to arm ' + name);
		for (var i = 0; i < passedFiltersEle.length; i++) {
			nameElement = passedFiltersEle[i].getElementsByClassName('campPage-trap-itemBrowser-item-name')[0].textContent;
			if (nameElement.indexOf(name) === 0) {
				fireEvent(passedFiltersEle[i].getElementsByClassName('campPage-trap-itemBrowser-item-armButton')[0], 'click');
				if(objTrapList[trap].indexOf(nameElement) < 0){
					objTrapList[trap].unshift(nameElement);
					setStorage("TrapList" + capitalizeFirstLetter(trap), objTrapList[trap].join(","));
				}
					
				console.pdebug(name + ' armed');
				return ARMED;
			}
		}

		console.pdebug(name, 'not found');
		for(var i=0;i<objTrapList[trap].length;i++){
			if(objTrapList[trap][i].indexOf(name) === 0){
				objTrapList[trap].splice(i,1);
				setStorage("TrapList" + capitalizeFirstLetter(trap), objTrapList[trap].join(","));
				break;
			}
		}
        if (sort == 'best'){
			nameArray.shift();
            if (nameArray.length > 0)
                return armTrapNewUI(sort, trap, nameArray);
			else
				return NOT_FOUND;
        }
		else
			return NOT_FOUND;
	}
	else
		return LOADING;
}

function clickTrapSelector(strSelect){ //strSelect = weapon/base/charm/trinket/bait
	if(isNewUI){
		var armedItem = document.getElementsByClassName('campPage-trap-armedItem ' + strSelect)[0];
		var arrTemp = armedItem.getAttribute('class').split(" ");
		if(arrTemp[arrTemp.length-1] == 'active'){ // trap selector opened
			arming = true;
			return (console.pdebug('Trap selector', strSelect, 'opened'));
		}
		fireEvent(armedItem, 'click');
	}
	else{
		if(document.getElementsByClassName("showComponents " + strSelect).length > 0){ // trap selector opened
			arming = true;
			return (console.pdebug('Trap selector', strSelect, 'opened'));
		}

		if (strSelect == "base")
			fireEvent(document.getElementsByClassName('trapControlThumb')[0], 'click');
		else if (strSelect == "weapon")
			fireEvent(document.getElementsByClassName('trapControlThumb')[1], 'click');
		else if (strSelect == "charm" || strSelect == "trinket")
			fireEvent(document.getElementsByClassName('trapControlThumb')[2], 'click');
		else if (strSelect == "bait")
			fireEvent(document.getElementsByClassName('trapControlThumb')[3], 'click');
		else
			return (console.pdebug("Invalid trapSelector"));
	}
	
    arming = true;
    return (console.pdebug("Trap selector", strSelect, "clicked"));
}

function closeTrapSelector(category){
	if(isNewUI){
		var armedItem = document.getElementsByClassName('campPage-trap-armedItem ' + category)[0];
		if(!isNullOrUndefined(armedItem) && armedItem.getAttribute('class').indexOf('active') > -1){ // trap selector opened
			fireEvent(armedItem, 'click');
		}
	}
	else{
		if(document.getElementsByClassName("showComponents " + category).length > 0)
			fireEvent(document.getElementById('trapSelectorBrowserClose'), 'click');
	}
}

function retrieveDataFirst() {
	try {
		var gotHornTime = false;
		var gotPuzzle = false;
		var gotBaitQuantity = false;
		var retrieveSuccess = false;

		var scriptElementList = document.getElementsByTagName('script');
		
		if (scriptElementList) {
			var i;
			for (i = 0; i < scriptElementList.length; ++i) {
				var scriptString = scriptElementList[i].innerHTML;

				// get next horn time
				var hornTimeStartIndex = scriptString.indexOf("next_activeturn_seconds");
				if (hornTimeStartIndex >= 0) {
					var nextActiveTime = 900;
					hornTimeStartIndex += 25;
					var hornTimeEndIndex = scriptString.indexOf(",", hornTimeStartIndex);
					var hornTimerString = scriptString.substring(hornTimeStartIndex, hornTimeEndIndex);
					nextActiveTime = parseInt(hornTimerString);

					hornTimeDelay = hornTimeDelayMin + Math.round(Math.random() * (hornTimeDelayMax - hornTimeDelayMin));

					if (!aggressiveMode) {
						// calculation base on the js in Mousehunt
						var additionalDelayTime = Math.ceil(nextActiveTime * 0.1);

						// need to found out the mousehunt provided timer interval to determine the additional delay
						var timerIntervalStartIndex = scriptString.indexOf("hud.timer_interval");
						if (timerIntervalStartIndex >= 0) {
							timerIntervalStartIndex += 21;
							var timerIntervalEndIndex = scriptString.indexOf(";", timerIntervalStartIndex);
							var timerIntervalString = scriptString.substring(timerIntervalStartIndex, timerIntervalEndIndex);
							var timerInterval = parseInt(timerIntervalString);

							// calculation base on the js in Mousehunt
							if (timerInterval == 1) {
								additionalDelayTime = 2;
							}

							timerIntervalStartIndex = undefined;
							timerIntervalEndIndex = undefined;
							timerIntervalString = undefined;
							timerInterval = undefined;
						}

						// safety mode, include extra delay like time in horn image appear
						//hornTime = nextActiveTime + additionalDelayTime + hornTimeDelay;
						hornTime = nextActiveTime + hornTimeDelay;
						lastDateRecorded = undefined;
						lastDateRecorded = new Date();

						additionalDelayTime = undefined;
					}
					else {
						// aggressive mode, no extra delay like time in horn image appear
						hornTime = nextActiveTime;
						lastDateRecorded = undefined;
						lastDateRecorded = new Date();
					}

					gotHornTime = true;

					hornTimeStartIndex = undefined;
					hornTimeEndIndex = undefined;
					hornTimerString = undefined;
					nextActiveTime = undefined;
				}

				// get is king's reward or not
				var hasPuzzleStartIndex = scriptString.indexOf("has_puzzle");
				if (hasPuzzleStartIndex >= 0) {
					hasPuzzleStartIndex += 12;
					var hasPuzzleEndIndex = scriptString.indexOf(",", hasPuzzleStartIndex);
					var hasPuzzleString = scriptString.substring(hasPuzzleStartIndex, hasPuzzleEndIndex);
					isKingReward = (hasPuzzleString != 'false');

					gotPuzzle = true;

					hasPuzzleStartIndex = undefined;
					hasPuzzleEndIndex = undefined;
					hasPuzzleString = undefined;
				}

				// get cheese quantity
				var baitQuantityStartIndex = scriptString.indexOf("bait_quantity");
				if (baitQuantityStartIndex >= 0) {
					baitQuantityStartIndex += 15;
					var baitQuantityEndIndex = scriptString.indexOf(",", baitQuantityStartIndex);
					var baitQuantityString = scriptString.substring(baitQuantityStartIndex, baitQuantityEndIndex);
					baitQuantity = parseInt(baitQuantityString);

					gotBaitQuantity = true;

					baitQuantityStartIndex = undefined;
					baitQuantityEndIndex = undefined;
					baitQuantityString = undefined;
				}

				var locationStartIndex;
				var locationEndIndex;
				locationStartIndex = scriptString.indexOf("location\":\"");
				if (locationStartIndex >= 0) {
					locationStartIndex += 11;
					locationEndIndex = scriptString.indexOf("\"", locationStartIndex);
					var locationString = scriptString.substring(locationStartIndex, locationEndIndex);
					currentLocation = locationString;

					locationStartIndex = undefined;
					locationEndIndex = undefined;
					locationString = undefined;
				}

				scriptString = undefined;
			}
			i = undefined;
		}
		scriptElementList = undefined;

		if (gotHornTime && gotPuzzle && gotBaitQuantity) {
			// get trap check time
			CalculateNextTrapCheckInMinute();

			// get last location
			var huntLocationCookie = getStorage("huntLocation");
			if (isNullOrUndefined(huntLocationCookie)) {
				huntLocation = currentLocation;
				setStorage("huntLocation", currentLocation);
			}
			else {
				huntLocation = huntLocationCookie;
				setStorage("huntLocation", huntLocation);
			}
			huntLocationCookie = undefined;

			// get last king reward time
			var lastKingRewardDate = getStorage("lastKingRewardDate");
			if (isNullOrUndefined(lastKingRewardDate)) {
				lastKingRewardSumTime = -1;
			}
			else {
				var lastDate = new Date(lastKingRewardDate);
				lastKingRewardSumTime = parseInt((new Date() - lastDate) / 1000);
				lastDate = undefined;
			}
			lastKingRewardDate = undefined;

			retrieveSuccess = true;
		}
		else {
			retrieveSuccess = false;
		}

		// clean up
		gotHornTime = undefined;
		gotPuzzle = undefined;
		gotBaitQuantity = undefined;
		return (retrieveSuccess);
	}
	catch (e) {
		console.perror('retrieveDataFirst',e.message);
	}
}

function GetHornTime() {
	var huntTimerElement = document.getElementById('huntTimer');
	var totalSec = 900;
	if (huntTimerElement !== null) {
		huntTimerElement = huntTimerElement.textContent;
		if(huntTimerElement.toLowerCase().indexOf('ready') > -1)
			totalSec = 0;
		else if (isNewUI) {
			var arrTime = huntTimerElement.split(":");
			for(var i=0;i<arrTime.length;i++)
				arrTime[i] = parseInt(arrTime[i]);
			totalSec = arrTime[0] * 60 + arrTime[1];
		}
		else {
			var temp = parseInt(huntTimerElement);
			if(Number.isInteger(temp))
				totalSec = temp * 60;
		}
	}

	return totalSec;
}

function getKingRewardStatus() {
	return (getPageVariable('user.has_puzzle') == 'true');
	var headerOrHud = (isNewUI) ? document.getElementById('mousehuntHud') : document.getElementById('header');
	if (headerOrHud !== null) {
		var textContentLowerCase = headerOrHud.textContent.toLowerCase();
		if(bLog === true){
			console.plog('user.has_puzzle:', getPageVariable('user.has_puzzle'));
			console.plog('textContentLowerCase:', textContentLowerCase);
		}
		if (textContentLowerCase.indexOf("king reward") > -1 ||
			textContentLowerCase.indexOf("king's reward") > -1 ||
			textContentLowerCase.indexOf("kings reward") > -1) {
			return true;
		}
		else
			return (getPageVariable('user.has_puzzle') == 'true');
	}
	else
		return false;
}

function getBaitQuantity() {
	var hudBaitQuantity = document.getElementById('hud_baitQuantity');
	if (hudBaitQuantity !== null) {
		return parseInt(hudBaitQuantity.textContent);
	}
	else {
		return 0;
	}
}

function getCurrentLocation() {
	var tempLocation;
	if (isNewUI) {
		tempLocation = document.getElementsByClassName('mousehuntHud-environmentName');
		if (tempLocation.length > 0)
			return tempLocation[0].textContent;
		else
			return "";
	}
	else {
		tempLocation = document.getElementById('hud_location');
		if (!isNullOrUndefined(tempLocation))
			return tempLocation.textContent;
		else
			return "";
	}
}

function retrieveData() {
	try {
		// get next horn time
		browser = browserDetection();
		if (!(browser == 'firefox' || browser == 'opera' || browser == 'chrome')) {
			window.setTimeout(function () { reloadWithMessage("Browser not supported. Reloading...", false); }, 60000);
		}
		
		currentLocation = getCurrentLocation();
		isKingReward = getKingRewardStatus();
		baitQuantity = getBaitQuantity();
		nextActiveTime = GetHornTime();

		if (nextActiveTime === "" || isNaN(nextActiveTime)) {
			// fail to retrieve data, might be due to slow network

			// reload the page to see it fix the problem
			window.setTimeout(function () { reloadWithMessage("Fail to retrieve data. Reloading...", false); }, 5000);
		}
		else {
			// got the timer right!

			if(nextActiveTime === 0)
				hornTimeDelay = 0;
			else{
				// calculate the delay
				hornTimeDelay = hornTimeDelayMin + Math.round(Math.random() * (hornTimeDelayMax - hornTimeDelayMin));
			}

			if (!aggressiveMode) {
				// calculation base on the js in Mousehunt
				var additionalDelayTime = Math.ceil(nextActiveTime * 0.1);
				if (timerInterval !== "" && !isNaN(timerInterval) && timerInterval == 1) {
					additionalDelayTime = 2;
				}

				// safety mode, include extra delay like time in horn image appear
				//hornTime = nextActiveTime + additionalDelayTime + hornTimeDelay;
				hornTime = nextActiveTime + hornTimeDelay;
				lastDateRecorded = undefined;
				lastDateRecorded = new Date();

				additionalDelayTime = undefined;
			}
			else {
				// aggressive mode, no extra delay like time in horn image appear
				hornTime = nextActiveTime;
				lastDateRecorded = undefined;
				lastDateRecorded = new Date();
			}
		}

		// get trap check time
		CalculateNextTrapCheckInMinute();
		eventLocationCheck('retrieveData()');
		mapHunting();
	}
	catch (e) {
		console.perror('retrieveData',e.message);
	}
}

function checkJournalDate() {
    var reload = false;

    var journalDateDiv = document.getElementsByClassName('journaldate');
    if (journalDateDiv) {
        var journalDateStr = journalDateDiv[0].innerHTML.toString();
        var midIndex = journalDateStr.indexOf(":", 0);
        var spaceIndex = journalDateStr.indexOf(" ", midIndex);

        if (midIndex >= 1) {
            var hrStr = journalDateStr.substring(0, midIndex);
            var minStr = journalDateStr.substr(midIndex + 1, 2);
            var hourSysStr = journalDateStr.substr(spaceIndex + 1, 2);

            var nowDate = new Date();
            var lastHuntDate = new Date();
            if (hourSysStr == "am") {
                lastHuntDate.setHours(parseInt(hrStr), parseInt(minStr), 0, 0);
            }
            else {
                lastHuntDate.setHours(parseInt(hrStr) + 12, parseInt(minStr), 0, 0);
            }
            if (parseInt(nowDate - lastHuntDate) / 1000 > 900) {
                reload = true;
            }
            hrStr = undefined;
            minStr = undefined;
            nowDate = undefined;
            lastHuntDate = undefined;
        }
        else {
            reload = true;
        }

        journalDateStr = undefined;
        midIndex = undefined;
        spaceIndex = undefined;
    }
    journalDateDiv = undefined;

    if (reload) {
        reloadWithMessage("Timer error. Try reload to fix.", true);
    }

    try {
        return (reload);
    }
    finally {
        reload = undefined;
    }
}

function action() {
    if (isKingReward) {
        kingRewardAction();
    }
    else if (pauseAtInvalidLocation && (huntLocation != currentLocation)) {
        // update timer
        displayTimer("Out of pre-defined hunting location...", "Out of pre-defined hunting location...", "Out of pre-defined hunting location...");

        if (fbPlatform) {
            if (secureConnection) {
                displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='https://www.mousehuntgame.com/canvas/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
            }
            else {
                displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='http://www.mousehuntgame.com/canvas/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
            }
        }
        else if (hiFivePlatform) {
            if (secureConnection) {
                displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='https://mousehunt.hi5.hitgrab.com/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
            }
            else {
                displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='http://mousehunt.hi5.hitgrab.com/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
            }
        }
        else if (mhPlatform) {
            if (secureConnection) {
                displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='https://www.mousehuntgame.com/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
            }
            else {
                displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='http://www.mousehuntgame.com/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
            }
        }

        displayKingRewardSumTime(null);

        // pause script
    }
    else if (baitQuantity === 0) {
        // update timer
        displayTimer("No more cheese!", "Cannot hunt without the cheese...", "Cannot hunt without the cheese...");
        displayLocation(huntLocation);
        displayKingRewardSumTime(null);

        // pause the script
    }
    else {
        // update location
        displayLocation(huntLocation);

        var isHornSounding = false;

        // check if the horn image is visible
        var headerElement = (isNewUI) ? document.getElementById('mousehuntHud').firstChild : document.getElementById('header');
        if (headerElement) {
            var headerStatus = headerElement.getAttribute('class');
			headerStatus = headerStatus.toLowerCase();
            if (headerStatus.indexOf("hornready") != -1) {
                // if the horn image is visible, why do we need to wait any more, sound the horn!
                soundHorn();

                // make sure the timer don't run twice!
                isHornSounding = true;
            }
            headerStatus = undefined;
        }
        headerElement = undefined;

        if (isHornSounding === false) {
            // start timer
            window.setTimeout(function () { countdownTimer(); }, timerRefreshInterval * 1000);
        }

        isHornSounding = undefined;
		eventLocationCheck('action()');
		mapHunting();
    }
}

function countdownTimer() {
	try {
		if (isKingReward) {
			// update timer
			displayTimer("King's Reward!", "King's Reward!", "King's Reward!");
			displayKingRewardSumTime("Now");

			// record last king's reward time
			var nowDate = new Date();
			setStorage("lastKingRewardDate", nowDate.toString());
			nowDate = undefined;
			lastKingRewardSumTime = 0;

			if(isNewUI){
				console.plog('reload the page when KR');
				reloadPage(false);
			}
			else{
				// reload the page so that the sound can be play
				// simulate mouse click on the camp button
				fireEvent(document.getElementsByClassName(strCampButton)[0].firstChild, 'click');
			}
			
			// reload the page if click on the camp button fail
			window.setTimeout(function () { reloadWithMessage("Fail to click on camp button. Reloading...", false); }, 5000);
		}
		else if (pauseAtInvalidLocation && (huntLocation != currentLocation)) {
			// update timer
			displayTimer("Out of pre-defined hunting location...", "Out of pre-defined hunting location...", "Out of pre-defined hunting location...");
			if (fbPlatform) {
				if (secureConnection) {
					displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='https://www.mousehuntgame.com/canvas/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
				}
				else {
					displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='http://www.mousehuntgame.com/canvas/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
				}
			}
			else if (hiFivePlatform) {
				if (secureConnection) {
					displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='https://mousehunt.hi5.hitgrab.com/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
				}
				else {
					displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='http://mousehunt.hi5.hitgrab.com/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
				}
			}
			else if (mhPlatform) {
				if (secureConnection) {
					displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='https://www.mousehuntgame.com/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
				}
				else {
					displayLocation("<font color='red'>" + currentLocation + "</font> [<a onclick='window.localStorage.removeItem(\"huntLocation\");' href='http://www.mousehuntgame.com/\'>Hunt Here</a>] - <i>Script pause because you had move to a different location recently, click hunt here to continue hunt at this location.</i>");
				}
			}
			displayKingRewardSumTime(null);

			// pause script
		}
		else if (baitQuantity === 0) {
			// update timer
			displayTimer("No more cheese!", "Cannot hunt without the cheese...", "Cannot hunt without the cheese...");
			displayLocation(huntLocation);
			displayKingRewardSumTime(null);

			// pause the script
		}
		else {
			var dateNow = new Date();
			var intervalTime = timeElapsed(lastDateRecorded, dateNow);
			lastDateRecorded = undefined;
			lastDateRecorded = dateNow;
			dateNow = undefined;

			if (enableTrapCheck) checkTime -= intervalTime;
			
			// update time
			hornTime -= intervalTime;
			if (lastKingRewardSumTime != -1) {
				lastKingRewardSumTime += intervalTime;
			}
			
			intervalTime = undefined;

			if (hornTime <= 0) {
				// blow the horn!
				hornTime = 0;
				if(getBaitQuantity() > 0)
					soundHorn();
				else
					displayTimer("No more cheese!", "Cannot hunt without the cheese...", "Cannot hunt without the cheese...");
			}
			else if (enableTrapCheck && checkTime <= 0) {
				// trap check!
				trapCheck();
			}
			else {
				if (enableTrapCheck) {
					// update timer
					if (!aggressiveMode) {
						displayTimer("Horn: " + timeformat(hornTime) + " | Check: " + timeformat(checkTime),
							timeformat(hornTime) + "  <i>(included extra " + timeformat(hornTimeDelay) + " delay & +/- 5 seconds different from MouseHunt timer)</i>",
							timeformat(checkTime) + "  <i>(included extra " + timeformat(checkTimeDelay) + " delay)</i>");
					}
					else {
						displayTimer("Horn: " + timeformat(hornTime) + " | Check: " + timeformat(checkTime),
							timeformat(hornTime) + "  <i>(lot faster than MouseHunt timer)</i>",
							timeformat(checkTime) + "  <i>(included extra " + timeformat(checkTimeDelay) + " delay)</i>");
					}
				}
				else {
					// update timer
					if (!aggressiveMode) {
						displayTimer("Horn: " + timeformat(hornTime),
							timeformat(hornTime) + "  <i>(included extra " + timeformat(hornTimeDelay) + " delay & +/- 5 seconds different from MouseHunt timer)</i>",
							"-");

						// check if user manaually sounded the horn
						var scriptNode = document.getElementById("scriptNode");
						if (scriptNode) {
							var isHornSounded = scriptNode.getAttribute("soundedHornAtt");
							if (isHornSounded == "true") {
								// sound horn function do the rest
								soundHorn();

								// stop loopping
								return;
							}
							isHornSounded = undefined;
						}
						scriptNode = undefined;
					}
					else {
						displayTimer("Horn: " + timeformat(hornTime),
							timeformat(hornTime) + "  <i>(lot faster than MouseHunt timer)</i>",
							"-");

						// agressive mode should sound the horn whenever it is possible to do so.
						var headerElement = (isNewUI) ? document.getElementById('mousehuntHud').firstChild : document.getElementById('header');
						if (headerElement) {
							var headerStatus = headerElement.getAttribute('class');
							headerStatus = headerStatus.toLowerCase();
							// the horn image appear before the timer end
							if (headerStatus.indexOf("hornready") != -1) {
								// who care, blow the horn first!
								soundHorn();

								headerElement = undefined;

								// skip all the code below
								return;
							}
						}
						headerElement = undefined;
					}
				}

				// set king reward sum time
				displayKingRewardSumTime(timeFormatLong(lastKingRewardSumTime));

				window.setTimeout(function () { (countdownTimer)(); }, timerRefreshInterval * 1000);
			}
		}
	}
	catch (e) {
		console.perror('countdownTimer',e.message);
	}
}

function reloadPage(soundHorn) {
    // reload the page
    if (fbPlatform) {
        // for Facebook only

        if (secureConnection) {
            if (soundHorn) {
                window.location.href = "https://www.mousehuntgame.com/canvas/turn.php";
            }
            else {
                window.location.href = "https://www.mousehuntgame.com/canvas/";
            }
        }
        else {
            if (soundHorn) {
                window.location.href = "http://www.mousehuntgame.com/canvas/turn.php";
            }
            else {
                window.location.href = "http://www.mousehuntgame.com/canvas/";
            }
        }
    }
    else if (hiFivePlatform) {
        // for Hi5 only

        if (secureConnection) {
            if (soundHorn) {
                window.location.href = "https://mousehunt.hi5.hitgrab.com/turn.php";
            }
            else {
                window.location.href = "https://mousehunt.hi5.hitgrab.com/";
            }
        }
        else {
            if (soundHorn) {
                window.location.href = "http://mousehunt.hi5.hitgrab.com/turn.php";
            }
            else {
                window.location.href = "http://mousehunt.hi5.hitgrab.com/";
            }
        }
    }
    else if (mhPlatform) {
        // for mousehunt game only

        if (secureConnection) {
            if (soundHorn) {
                window.location.href = "https://www.mousehuntgame.com/turn.php";
            }
            else {
                window.location.href = "https://www.mousehuntgame.com/";
            }
        }
        else {
            if (soundHorn) {
                window.location.href = "http://www.mousehuntgame.com/turn.php";
            }
            else {
                window.location.href = "http://www.mousehuntgame.com/";
            }
        }
    }

    soundHorn = undefined;
}

function reloadWithMessage(msg, soundHorn) {
    // display the message
    displayTimer(msg, msg, msg, msg);

    // reload the page
    reloadPage(soundHorn);

    msg = undefined;
    soundHorn = undefined;
}

// ################################################################################################
//   Timer Function - Start
// ################################################################################################

function embedTimer(targetPage) {
    if (showTimerInPage) {
        var headerElement;
        if (fbPlatform || hiFivePlatform || mhPlatform) {
            headerElement = document.getElementById('noscript');
        }
        else if (mhMobilePlatform) {
            headerElement = document.getElementById('mobileHorn');
        }

        if (headerElement) {
            var timerDivElement = document.createElement('div');

            var hr1Element = document.createElement('hr');
            timerDivElement.appendChild(hr1Element);
            hr1Element = null;

            // show bot title and version
            var titleElement = document.createElement('div');
            titleElement.setAttribute('id', 'titleElement');
            if (targetPage && aggressiveMode) {
        