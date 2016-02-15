// ==UserScript==
// @name        MouseHunt AutoBot Enhanced Edition
// @author      Ooi Keng Siang, CnN
// @version    	1.29.27
// @namespace   http://ooiks.com/blog/mousehunt-autobot, https://devcnn.wordpress.com/
// @description Ooiks: An advance user script to automate sounding the hunter horn in MouseHunt application in Facebook with MouseHunt version 3.0 (Longtail) supported and many other features. CnN: An enhanced version to sound horn based on selected algorithm of event or location.
// @include		http://mousehuntgame.com/*
// @include		https://mousehuntgame.com/*
// @include		http://www.mousehuntgame.com/*
// @include		https://www.mousehuntgame.com/*
// @include		http://apps.facebook.com/mousehunt/*
// @include		https://apps.facebook.com/mousehunt/*
// @include		http://hi5.com/friend/games/MouseHunt*
// @include		http://mousehunt.hi5.hitgrab.com/*
// @grant		unsafeWindow
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

// // The script will pause if player at different location that hunt location set before. (true/false)
// // Note: Make sure you set showTimerInPage to true in order to know what is happening.
var pauseAtInvalidLocation = false;

// // Time to wait after trap selector clicked (in second)
var secWait = 7;

// // Stop trap arming after X retry
var armTrapRetry = 3;

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

// // Best weapon/base/charm/bait pre-determined by user. Edit ur best weapon/base/charm/bait in ascending order. e.g. [best, better, good]
var bestPhysical = ['Chrome MonstroBot', 'Sandstorm MonstroBot', 'Sandtail Sentinel', 'Enraged RhinoBot'];
var bestTactical = ['Chrome Sphynx Wrath', 'Sphynx Wrath'];
var bestHydro = ['School of Sharks', 'Rune Shark Trap', 'Chrome Phantasmic Oasis Trap', 'Phantasmic Oasis Trap', 'Oasis Water Node Trap', 'Chrome Sphynx Wrath'];
var bestArcane = ['Event Horizon', 'Grand Arcanum Trap', 'Arcane Blast Trap', 'Arcane Capturing Rod Of Nev'];
var bestShadow = ['Temporal Turbine', 'Clockwork Portal Trap', 'Reaper\'s Perch', 'Clockapult of Time', 'Clockapult of Winter Past'];
var bestForgotten = ['Tarannosaurus Rex Trap', 'The Forgotten Art of Dance'];
var bestDraconic = ['Dragon Lance', 'Ice Maiden'];
var bestRiftLuck = ['Multi-Crystal Laser', 'Crystal Tower'];
var bestRiftPower = ['Focused Crystal Laser', 'Crystal Tower'];
var bestPowerBase = ['Tidal Base', 'Golden Tournament Base', 'Spellbook Base'];
var bestLuckBase = ['Fissure Base', 'Rift Base', 'Depth Charge Base', 'Monkey Jade Base', 'Sheep Jade Base', 'Horse Jade Base', 'Snake Jade Base', 'Dragon Jade Base', 'Papyrus Base'];
var bestAttBasae = ['Birthday Drag', 'Cheesecake Base'];
var wasteCharm = ['Tarnished', 'Wealth'];

// // Fiery Warpath Preference
var bestFWWave4Weapon = ['Warden Slayer Trap', 'Chrome MonstroBot', 'Sandstorm MonstroBot', 'Sandtail Sentinel', 'Enraged RhinoBot'];
var commanderCharm = ['Super Warpath Commander\'s', 'Warpath Commander\'s'];

// // Living Garden Preference
var bestLGBase = ['Hothouse Base'];
bestLGBase = bestLGBase.concat(bestLuckBase);
var bestSalt = ['Super Salt', 'Grub Salt'];
var redSpongeCharm = ['Red Double', 'Red Sponge'];
var yellowSpongeCharm = ['Yellow Double', 'Yellow Sponge'];
var spongeCharm = ['Double Sponge', 'Sponge'];
var maxSaltCharged = 25;	// Sand Crypts maximum salt for King Grub

// // Sunken City Preference
var bestSCBase = bestLuckBase.slice();
var indexDC = bestSCBase.indexOf('Depth Charge Base');
if (indexDC > -1)
{
	var temp = bestSCBase[0];
	bestSCBase[0] = bestSCBase[indexDC];
	bestSCBase[indexDC] = temp;	
}
else
{
	bestSCBase = ['Depth Charge Base'];
	bestSCBase = bestSCBase.concat(bestLuckBase);
}

var scOxyBait = ['Fishy Fromage', 'Gouda'];
var scAnchorTreasure = ['Golden Anchor', 'Empowered Anchor'];
var scAnchorDanger = ['Spiked Anchor', 'Empowered Anchor'];
var scOxygen = ['Oxygen Burst', 'Empowered Anchor'];

// // Spring Egg Hunt 
var chargeCharm = ['Eggstra Charge', 'Eggscavator'];

// // Sunken City constant variables.
// // DON'T edit this variable if you don't know what are you editing
var ZONE_DEFAULT = 1;
var ZONE_LOOT = 2;
var ZONE_TREASURE = 4;
var ZONE_DANGER = 8;
var ZONE_OXYGEN = 16;

// == Advance User Preference Setting (End) ==



// WARNING - Do not modify the code below unless you know how to read and write the script.

// All global variable declaration and default value
var scriptVersion = "1.29.27 Enhanced Edition";
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
var eventLocation = "None";
var discharge = false;
var arming = false;
var best = 0;
var kingsRewardRetry = 0;

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

function FinalizePuzzleImageAnswer(answer)
{
	if (answer.length != 5)
    {
	    //Get a new puzzle
	    if (kingsRewardRetry > kingsRewardRetryMax)
	    {
	        kingsRewardRetry = 0;
			setStorage("KingsRewardRetry", kingsRewardRetry);
			alert('Max retry. Pls solve it manually.');
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
                    return;
                }
            }
	    }	    
    }
    else
    {        
		//Submit answer		
        var puzzleAns = document.getElementById("puzzle_answer");		
		if (!puzzleAns)
		{
			console.debug("puzzleAns: " + puzzleAns);
			return;
		}
		puzzleAns.value = "";
        puzzleAns.value = answer;
        var puzzleSubmit = document.getElementById("puzzle_submit");
		if (!puzzleSubmit)
		{
			console.debug("puzzleSubmit: " + puzzleSubmit);
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
	console.debug("Event origin: " + event.origin);	

	if (event.origin.indexOf("mhcdn") > -1 || event.origin.indexOf("mousehuntgame") > -1 || event.origin.indexOf("dropbox") > -1)
	{
		if (event.data.indexOf("~") > -1)
		{						
			var result = event.data.substring(0, event.data.indexOf("~"));			
			var processedImg = event.data.substring(event.data.indexOf("~") + 1, event.data.length);			
			var now = new Date();
			var strKR = "KR-" + now.toLocaleString();
			strKR = strKR.replace(", ", "-");
			strKR = strKR.replace(" ", "-");
			strKR += "-" + result;
			setStorage(strKR, processedImg);
			FinalizePuzzleImageAnswer(result);
		}		
	}		
}

window.addEventListener("message", receiveMessage, false);
if (debugKR)
	CallKRSolver();

exeScript();

function exeScript() {
	console.debug("exeScript() Start");
	browser = browserDetection();
    // check the trap check setting first	
	trapCheckTimeDiff = GetTrapCheckTime();
	   
    if (trapCheckTimeDiff == 60 || trapCheckTimeDiff == 0) {
        trapCheckTimeDiff = 00;
    }    
    else if (trapCheckTimeDiff < 0 || trapCheckTimeDiff > 60) {
        // invalid value, just disable the trap check
        enableTrapCheck = false;
    }

    if (showTimerInTitle) {
        // check if they are running in iFrame
        if (window.location.href.indexOf("apps.facebook.com/mousehunt/") != -1) {
            var contentElement = document.getElementById('pagelet_canvas_content');
            if (contentElement) {
                var breakFrameDivElement = document.createElement('div');
                breakFrameDivElement.setAttribute('id', 'breakFrameDivElement');
                breakFrameDivElement.innerHTML = "Timer cannot show on title page. You can <a href='http://www.mousehuntgame.com/canvas/'>run MouseHunt without iFrame (Facebook)</a> to enable timer on title page";
                contentElement.parentNode.insertBefore(breakFrameDivElement, contentElement);
            }
            contentElement = undefined;
        }
        else if (window.location.href.indexOf("hi5.com/friend/games/MouseHunt") != -1) {
            var contentElement = document.getElementById('apps-canvas-body');
            if (contentElement) {
                var breakFrameDivElement = document.createElement('div');
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
        if (version != null && version == "mobile") {
            // from mousehunt game mobile version
            mhMobilePlatform = true;
        }
        else {
            // from mousehunt game standard version
            mhPlatform = true
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
                window.setTimeout(function () { reloadPage(false) }, errorReloadTime * 1000);
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
                window.setTimeout(function () { reloadPage(false) }, errorReloadTime * 1000);
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
                window.setTimeout(function () { reloadPage(false) }, errorReloadTime * 1000);
            }
        }
        else {
            // not in huntcamp, just show the title of autobot version
            embedTimer(false);
        }
    }
	console.debug("exeScript() End");
	return;
}

function GetTrapCheckTime() {	
	try {
		var passiveElement = document.getElementsByClassName('passive');
		if (passiveElement.length > 0) {
			var time = passiveElement[0].textContent;			
			time = time.substr(time.indexOf('m -') - 4, 2);				
			setStorage("TrapCheckTimeOffset", time);
			return parseInt(time);				
		}
		else throw 'passiveElement not found'
	}
	catch (e) {
		console.debug(e);
		var tempStorage = getStorage('TrapCheckTimeOffset');
		if (tempStorage == null) {
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
                    checkThenArm('best', 'base', bestPowerBase);
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
    console.debug('Algorithm Selected: ' + eventLocation + ' Call From: ' + caller);
    switch (eventLocation)
    {
        case 'Charge Egg 2015':
            checkCharge(12); break;
        case 'Charge Egg 2015(17)':
            checkCharge(17); break;
		case 'Burroughs Rift(Red)':
			BurroughRift(19, 20); break;
		case 'Burroughs Rift(Green)':
			BurroughRift(6, 18); break;  
		case 'Burroughs Rift(Yellow)':
			BurroughRift(1, 5); break;  
		case 'Halloween 2015':
			Halloween2015(); break;	 
		case 'All LG Area':
			LGGeneral(); break;
		case 'Sunken City':
			SunkenCity(false); break;
		case 'Sunken City Aggro':
			SunkenCity(true); break;
        default:
            break;
    }
}

function GetCurrentLocation()
{
	var location = getPageVariable('user.location');
    console.debug('Current Location: ' + location);
	return location;
}

function GetMaxPopulation(population)
{
    var max = 0;
    for (var i = 0; i < population.length; i++)
    {
        if (population[i] > max)
            max = population[i];        
    }
    return max;
}

function Halloween2015()
{	
	if (GetCurrentLocation().indexOf("Haunted Terrortories") > -1)
	{
		var areaName = document.getElementsByClassName('halloweenHud-areaDetails-name')[0].innerHTML;
		var warning = document.getElementsByClassName('halloweenHud-areaDetails-warning active').length;
		var isWarning = (warning > 0);
		console.debug('Current Area Name: ' + areaName + " Warning: " + isWarning);
		if (isWarning)
		{
			var trickContainer = document.getElementsByClassName('halloweenHud-bait trick_cheese clear-block')[0];
			var treatContainer = document.getElementsByClassName('halloweenHud-bait treat_cheese clear-block')[0];
			if (trickContainer.children[2].getAttribute('class') == 'armNow active')
			{
				console.debug('Currently armed: Trick cheese, Going to arm Treat cheese');
				fireEvent(treatContainer.children[2], 'click');
			}
			else
			{
				console.debug('Currently armed: Treat cheese, Going to arm Trick cheese');
				fireEvent(trickContainer.children[2], 'click');
			}
		}
	}
}

function BurroughRift(minMist, maxMist)
{
	//Tier 0: 0 Mist Canisters
	//Tier 1/Yellow: 1-5 Mist Canisters
	//Tier 2/Green: 6-18 Mist Canisters
	//Tier 3/Red: 19-20 Mist Canisters
	if (GetCurrentLocation().indexOf('Burroughs Rift') < 0)
		return;
	
	var currentMistQuantity = parseInt(document.getElementsByClassName('mistQuantity')[0].innerText);
	var isMisting = getPageVariable('user.quests.QuestRiftBurroughs.is_misting');
	var mistButton = document.getElementsByClassName('mistButton')[0];
	console.debug('Current Mist Quantity: ' + currentMistQuantity);
	console.debug('Is Misting: ' + isMisting);
	console.debug('Min Mist: ' + minMist + " Max Mist: " + maxMist);
	if(currentMistQuantity >= maxMist && isMisting == 'true')
	{
		console.debug('Stop mist...');
		fireEvent(mistButton, 'click');
	}
	else if(currentMistQuantity <= minMist && isMisting == 'false')
	{
		console.debug('Start mist...');
		fireEvent(mistButton, 'click');
	}
	return;
}

function LGGeneral() {
    switch (GetCurrentLocation())
    {        
        case 'Living Garden':
            livingGarden(); break;
        case 'Lost City':
            lostCity(); break;
        case 'Sand Dunes':
            sandDunes(); break;
        case 'Twisted Garden':
            twistedGarden(); break;
        case 'Cursed City':
            cursedCity(); break;
        case 'Sand Crypts':
            sandCrypts(); break;
        default:
            break;
    }
}

function SunkenCity(isAggro) {
	if (GetCurrentLocation().indexOf("Sunken City") < 0)
		return;
	
	var zone = document.getElementsByClassName('zoneName')[0].innerText;	
	console.debug('Current Zone: ' + zone);
	var currentZone = GetSunkenCityZone(zone);
	checkThenArm('best', 'weapon', bestHydro);	
	if (currentZone == 0)
	{
		checkThenArm('best', 'base', bestLuckBase);
		checkThenArm('best', 'bait', scOxyBait);
		return;
	}
	
	checkThenArm('best', 'base', bestSCBase);
	var distance = parseInt(getPageVariable('user.quests.QuestSunkenCity.distance'));
	console.debug('Dive Distance(m): ' + distance);
	var charmArmed = getPageVariable("user.trinket_name");
	var charmElement = document.getElementsByClassName('charm');	
	var isEACArmed = (charmArmed.indexOf('Empowered Anchor') > -1);	
	var isWJCArmed = (charmArmed.indexOf('Water Jet') > -1);	
	if (currentZone == ZONE_OXYGEN || currentZone == ZONE_TREASURE)
	{
		if (!isAggro)
		{
			// arm Empowered Anchor Charm
			if (!isEACArmed)
			{
				if (parseInt(charmElement[0].innerText) > 0)
					fireEvent(charmElement[0], 'click');
			}
		}
		else
		{
			if (currentZone == ZONE_OXYGEN)
				checkThenArm('best', 'trinket', scOxygen);
			else
				checkThenArm('best', 'trinket', scAnchorTreasure);
		}
		
		checkThenArm(null, 'bait', 'SUPER');	
	}	
	else if (currentZone == ZONE_DANGER)
	{		
		if (distance >= 10000)
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
				checkThenArm('best', 'trinket', scAnchorDanger);
		}
		else
		{
			DisarmSCSpecialCharm(charmArmed);
		}
		checkThenArm(null, 'bait', 'Gouda');
	}
	else if ((currentZone == ZONE_DEFAULT) && isAggro)
	{
		var depth = parseInt(getPageVariable('user.quests.QuestSunkenCity.zones[1].length'));
		if (depth >= 500)
		{			
			var nextZoneName = getPageVariable('user.quests.QuestSunkenCity.zones[2].name');
			var nextZoneLeft = parseInt(getPageVariable('user.quests.QuestSunkenCity.zones[2].left'));
			var nextZone = GetSunkenCityZone(nextZoneName);
			var distanceToNextZone = parseInt((nextZoneLeft - 80) / 0.6);
			console.debug('Distance to next zone(m): ' + distanceToNextZone);
			if (distanceToNextZone >= 480 || (distanceToNextZone >= 230 && nextZone == ZONE_DEFAULT))
			{
				// arm Water Jet Charm
				if (!isWJCArmed)
				{
					if (parseInt(charmElement[1].innerText) > 0)
						fireEvent(charmElement[1], 'click');
				}
			}			
			else
			{
				DisarmSCSpecialCharm(charmArmed);
			}
		}
		checkThenArm(null, 'bait', 'Gouda');
	}
	else
	{		
		DisarmSCSpecialCharm(charmArmed);
		checkThenArm(null, 'bait', 'Gouda');
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
			returnZone = ZONE_TREASURE;
			break;
		case 'Feeding Grounds':
		case 'Carnivore Cove':
		case 'Monster Trench':
		case 'Lair of the Ancients':
			returnZone = ZONE_DANGER;
			break;
		case 'Deep Oxygen Stream':
		case 'Oxygen Stream':
		case 'Magma Flow':
			returnZone = ZONE_OXYGEN;
			break;		
		case 'Coral Reef':
		case 'Coral Garden':
		case 'Coral Castle':
		case 'School of Mice':
		case 'Mermouse Den':
		case 'Lost Ruins':
		case 'Rocky Outcrop':
		case 'Shipwreck':
		case 'Haunted Shipwreck':
			returnZone = ZONE_LOOT;
			break;
		case 'Shallow Shoals':
		case 'Sea Floor':
		case 'Murky Depths':
			returnZone = ZONE_DEFAULT;
			break;
		default:
			returnZone = 0;			
			break;
	}
	return returnZone;
}

function livingGarden() {
    var pourEstimate = document.getElementsByClassName('pourEstimate')[0];
    if (pourEstimate.innerText != "")
    {
        // Not pouring
		console.debug('Filling...');
        var estimateHunt = parseInt(pourEstimate.innerText);
        console.debug('Estimate Hunt: ' + estimateHunt);
        if (estimateHunt >= 35)
        {
            console.debug('Going to click Pour...');
			var pourButton = document.getElementsByClassName('pour')[0];								
			fireEvent(pourButton, 'click');
			var confirmButton = document.getElementsByClassName('confirm button')[0];
			fireEvent(confirmButton, 'click');
			if (getPageVariable('user.trinket_name').indexOf('Sponge') > -1)
            {                
				console.debug('Going to disarm');
				disarmTrap('trinket');
            }
        }
		else if (estimateHunt >= 28)
			checkThenArm(null, 'trinket', 'Sponge');
        else
            checkThenArm('best', 'trinket', spongeCharm);
    }
    else
    {
        // Pouring
		console.debug('Pouring...');
        if (getPageVariable('user.trinket_name').indexOf('Sponge') > -1)
            disarmTrap('trinket');
    }
	checkThenArm('best', 'weapon', bestHydro);
	checkThenArm('best', 'base', bestLGBase);
    return;
}

function lostCity() {
	var isCursed = (document.getElementsByClassName('stateBlessed hidden').length > 0);
    console.debug('Cursed = ' + isCursed);
    
	//disarm searcher charm when cursed is lifted    
    if (!isCursed) {
        if (getPageVariable('user.trinket_name').indexOf('Searcher') > -1)
            disarmTrap('trinket');
    }
    else
        checkThenArm(null, 'trinket', 'Searcher');
	
	checkThenArm('best', 'weapon', bestArcane);
	checkThenArm('best', 'base', bestLGBase);
    return;
}

function sandDunes() {
    var hasStampede = getPageVariable('user.quests.QuestSandDunes.minigame.has_stampede');
    console.debug('Has Stampede = ' + hasStampede);

    //disarm grubling chow charm when there is no stampede
    if (hasStampede == 'false')
    {
        if (getPageVariable('user.trinket_name').indexOf('Chow') > -1)
            disarmTrap('trinket');
    }
    else
        checkThenArm(null, 'trinket', 'Grubling Chow');
	
	checkThenArm('best', 'weapon', bestShadow);
	checkThenArm('best', 'base', bestLGBase);
    return;
}

function twistedGarden() {
    var red = parseInt(document.getElementsByClassName('itemImage red')[0].innerText);
    var yellow = parseInt(document.getElementsByClassName('itemImage yellow')[0].innerText);
    var charmArmed = getPageVariable('user.trinket_name');
    console.debug('Red: ' + red + ' Yellow: ' + yellow);
    if (red < 10)
    {
        if (red <= 8)
            checkThenArm('best', 'trinket', redSpongeCharm);
        else
            checkThenArm(null, 'trinket', 'Red Sponge');
    }
    else if (red == 10 && yellow < 10)
    {
        if (yellow <=8)
            checkThenArm('best', 'trinket', yellowSpongeCharm);
        else
            checkThenArm(null, 'trinket', 'Yellow Sponge');
    }
    else {
        if (charmArmed.indexOf('Red') > -1 || charmArmed.indexOf('Yellow') > -1)
            disarmTrap('trinket');
    }
	
	checkThenArm('best', 'weapon', bestHydro);
    return;
}

function cursedCity() {
    var cursed = getPageVariable('user.quests.QuestLostCity.minigame.is_cursed');
    var curses = [];
    var charmArmed = getPageVariable('user.trinket_name');
    if (cursed == 'false')
    {
        if (charmArmed.indexOf('Bravery') > -1 || charmArmed.indexOf('Shine') > -1 || charmArmed.indexOf('Clarity') > -1)
            disarmTrap('trinket');
    }
    else
    {
        for (var i = 0; i < 3; ++i)
        {
            curses[i] = getPageVariable('user.quests.QuestLostCity.minigame.curses[' + i + '].active');
            if (curses[i] == 'true')
            {
                switch (i)
                {
                    case 0:
                        console.debug("Fear Active");
						checkThenArm(null, "trinket", "Bravery"); break;
                    case 1:
                        console.debug("Darkness Active");
						checkThenArm(null, "trinket", "Shine"); break;
                    case 2:
						console.debug("Mist Active");
                        checkThenArm(null, "trinket", "Clarity"); break;
                    default:
                        break;
                }
                break;
            }
        }
    }
	
	checkThenArm('best', 'weapon', bestArcane);
	checkThenArm('best', 'base', bestLGBase);
    return;
}

function sandCrypts() {
    var salt = parseInt(document.getElementsByClassName('salt_charms')[0].innerText);
    console.debug('Salted: ' + salt);
    if (salt >= maxSaltCharged)
        checkThenArm(null, 'trinket', 'Grub Scent');
    else {
		if ((maxSaltCharged - salt) == 1)
			checkThenArm(null, 'trinket', 'Grub Salt');		
		else
			checkThenArm('best', 'trinket', bestSalt);
    }
	
	checkThenArm('best', 'weapon', bestShadow);
	checkThenArm('best', 'base', bestLGBase);
    return;
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

function checkCharge(stopDischargeAt) {
    try {
        var charge = parseInt(document.getElementsByClassName("chargeQuantity")[0].innerText);
		console.debug('Current Charge: ' + charge);
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
        return console.debug(e.message);
    }
}

function checkThenArm(sort, category, name)   //category = weapon/base/charm/trinket/bait
{
    if (category == "charm")
        category = "trinket";

    var trapArmed;
    var userVariable = getPageVariable("user." + category + "_name");
    if (sort == 'best')
    {
        for (var i = 0; i < name.length; i++)
        {
            if (userVariable.indexOf(name[i]) == 0)
            {
                trapArmed = true;
                break;
            }
        }
    }
    else
    {        
        trapArmed = (userVariable.indexOf(name) == 0);
    }

    if (!trapArmed)
    {
        var intervalCTA = setInterval(
            function ()
            {
                if (arming == false)
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
            armStatus = armTrap(sort, name);
			if (armStatus != LOADING)
            {
                clearInterval(intervalCTATI);
                arming = false;
                intervalCTATI = null;
				if (armStatus == NOT_FOUND && trap == 'trinket')
					disarmTrap('trinket');
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
function armTrap(sort, name) {
    var tagGroupElement = document.getElementsByClassName('tagGroup');
    var tagElement;
    var nameElement;
	var nameArray = name;
	
    if (sort == 'best')
        name = name[0];
    
    if (tagGroupElement.length > 0)
    {
        console.debug('Try to arm ' + name);
        for (var i = 0; i < tagGroupElement.length; ++i)
        {
            tagElement = tagGroupElement[i].getElementsByTagName('a');
            for (var j = 0; j < tagElement.length; ++j)
            {
                nameElement = tagElement[j].getElementsByClassName('name')[0].innerText;
                if (nameElement.indexOf(name) == 0)
                {
                    fireEvent(tagElement[j], 'click');
                    console.debug(name + ' armed');
					return ARMED;
                }
            }
        }
        console.debug(name + " not found");
        if (sort == 'best')
        {
            nameArray.shift();
            if (nameArray.length > 0)
                return armTrap(sort, nameArray);
			else
				return NOT_FOUND;
        }
		else
			return NOT_FOUND;
    }
	else
		return LOADING;
}

function clickTrapSelector(strSelect) //strSelect = weapon/base/charm/trinket/bait
{
    if (strSelect == "base") {
        fireEvent(document.getElementsByClassName('trapControlThumb')[0], 'click');
    }
    else if (strSelect == "weapon") {
        fireEvent(document.getElementsByClassName('trapControlThumb')[1], 'click');
    }
    else if (strSelect == "charm" || strSelect == "trinket") {
        fireEvent(document.getElementsByClassName('trapControlThumb')[2], 'click');
    }
    else if (strSelect == "bait") {
        fireEvent(document.getElementsByClassName('trapControlThumb')[3], 'click');
    }
    else {
        return (console.debug("Invalid trapSelector"));
    }
    arming = true;
    return (console.debug("Trap selector: " + strSelect + " clicked"));
}

function objToString(obj, str) {
    return str = obj.data;
}

function retrieveDataFirst() {
    console.debug("retrieveDataFirst() Start");
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
					isKingReward = !(hasPuzzleString == 'false');

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
			if (huntLocationCookie == undefined || huntLocationCookie == null) {
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
			if (lastKingRewardDate == undefined || lastKingRewardDate == null) {
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
		console.debug("retrieveDataFirst() End - " + retrieveSuccess);
		return (retrieveSuccess);
	}
	catch (e) {
		console.debug("Error - " + e);
	}
	finally {
		retrieveSuccess = undefined;
	}	
}

function GetHornTime() {
	var huntTimerElement = document.getElementById('huntTimer');
	if (huntTimerElement != null) {
		huntTimerElement = huntTimerElement.textContent;
		if (huntTimerElement.length == 4) huntTimerElement = '0' + huntTimerElement;
		var totalSec;
		if (isNewUI) {
			var strTemp = new Date().toDateString() + ' 00:' + huntTimerElement;
			var huntingTime = new Date(strTemp);
			totalSec = huntingTime.getMinutes() * 60 + huntingTime.getSeconds();
		}
		else {
			var temp = parseInt(huntTimerElement);			
			if (!isNaN(temp)) {
				totalSec = temp * 60;
			}
			else {
				totalSec = 0;				
			}			
		}
		return totalSec;
	}
	else {
		return 900;	
	}
}

function getKingRewardStatus() {
	var headerOrHud = (isNewUI) ? document.getElementById('mousehuntHud') : document.getElementById('header');
	if (header != null) {
		var textContentLowerCase = header.textContent.toLowerCase();
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
	if (hudBaitQuantity != null) {
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
		if (tempLocation != null)
			return tempLocation.textContent;
		else
			return "";
	}
}

function retrieveData() {
	try {
		// get next horn time
		console.debug("retrieveData() Start");
		browser = browserDetection();
		if (!(browser == 'firefox' || browser == 'opera' || browser == 'chrome')) {
			window.setTimeout(function () { reloadWithMessage("Browser not supported. Reloading...", false); }, 60000);
		}
		
		currentLocation = getCurrentLocation();
		isKingReward = getKingRewardStatus();
		baitQuantity = getBaitQuantity();
		nextActiveTime = GetHornTime();

		if (nextActiveTime == "" || isNaN(nextActiveTime)) {
			// fail to retrieve data, might be due to slow network

			// reload the page to see it fix the problem
			window.setTimeout(function () { reloadWithMessage("Fail to retrieve data. Reloading...", false); }, 5000);
		}
		else {
			// got the timer right!

			// calculate the delay
			hornTimeDelay = hornTimeDelayMin + Math.round(Math.random() * (hornTimeDelayMax - hornTimeDelayMin));

			if (!aggressiveMode) {
				// calculation base on the js in Mousehunt
				var additionalDelayTime = Math.ceil(nextActiveTime * 0.1);
				if (timerInterval != "" && !isNaN(timerInterval) && timerInterval == 1) {
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
		console.debug("retrieveData() End");
	}
	catch (e) {
		console.debug(e);
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
            var minStr = journalDateStr.substring(midIndex + 1, 2);
            var hourSysStr = journalDateStr.substring(spaceIndex + 1, 2);

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
    else if (baitQuantity == 0) {
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

        if (isHornSounding == false) {
            // start timer
            window.setTimeout(function () { countdownTimer() }, timerRefreshInterval * 1000);
        }

        isHornSounding = undefined;
    }
    eventLocationCheck('action()');
}

function countdownTimer() {
	try {
		if (isKingReward) {
			// update timer
			displayTimer("King's Reward!", "King's Reward!", "King's Reward");
			displayKingRewardSumTime("Now");

			// record last king's reward time
			var nowDate = new Date();
			setStorage("lastKingRewardDate", nowDate.toString());
			nowDate = undefined;
			lastKingRewardSumTime = 0;

			// reload the page so that the sound can be play
			// simulate mouse click on the camp button
			fireEvent(document.getElementsByClassName(strCampButton)[0].firstChild, 'click');

			// reload the page if click on camp button fail
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
		else if (baitQuantity == 0) {
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
				soundHorn();
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

				window.setTimeout(function () { (countdownTimer)() }, timerRefreshInterval * 1000);
			}
		}
	}
	catch (e) {
		console.debug(e);
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
                titleElement.innerHTML = "<a href=\"http://devcnn.wordpress.com\" target=\"_blank\"><b>MouseHunt AutoBot (version " + scriptVersion + ")</b></a> - <font color='red'>Aggressive Mode</font>";
            }
            else {
                titleElement.innerHTML = "<a href=\"http://devcnn.wordpress.com\" target=\"_blank\"><b>MouseHunt AutoBot (version " + scriptVersion + ")</b></a>";
            }
            timerDivElement.appendChild(titleElement);
            titleElement = null;

            if (targetPage) {
                nextHornTimeElement = document.createElement('div');
                nextHornTimeElement.setAttribute('id', 'nextHornTimeElement');
                nextHornTimeElement.innerHTML = "<b>Next Hunter Horn Time:</b> Loading...";
                timerDivElement.appendChild(nextHornTimeElement);

                checkTimeElement = document.createElement('div');
                checkTimeElement.setAttribute('id', 'checkTimeElement');
                checkTimeElement.innerHTML = "<b>Next Trap Check Time:</b> Loading...";
                timerDivElement.appendChild(checkTimeElement);

                if (pauseAtInvalidLocation) {
                    // location information only display when enable this feature
                    travelElement = document.createElement('div');
                    travelElement.setAttribute('id', 'travelElement');
                    travelElement.innerHTML = "<b>Target Hunt Location:</b> Loading...";
                    timerDivElement.appendChild(travelElement);
                }

                var lastKingRewardDate = getStorage("lastKingRewardDate");
                var lastDateStr;
                if (lastKingRewardDate == undefined || lastKingRewardDate == null) {
                    lastDateStr = "-";
                }
                else {
                    var lastDate = new Date(lastKingRewardDate);
                    lastDateStr = lastDate.toDateString() + " " + lastDate.toTimeString().substring(0, 8);
                    lastDate = null;
                }

                kingTimeElement = document.createElement('div');
                kingTimeElement.setAttribute('id', 'kingTimeElement');
                kingTimeElement.innerHTML = "<b>Last King's Reward:</b> " + lastDateStr + " ";
                timerDivElement.appendChild(kingTimeElement);

                lastKingRewardSumTimeElement = document.createElement('font');
                lastKingRewardSumTimeElement.setAttribute('id', 'lastKingRewardSumTimeElement');
                lastKingRewardSumTimeElement.innerHTML = "(Loading...)";
                kingTimeElement.appendChild(lastKingRewardSumTimeElement);

                lastKingRewardDate = null;
                lastDateStr = null;

                if (showLastPageLoadTime) {
                    var nowDate = new Date();

                    // last page load time
                    var loadTimeElement = document.createElement('div');
                    loadTimeElement.setAttribute('id', 'loadTimeElement');
                    loadTimeElement.innerHTML = "<b>Last Page Load: </b>" + nowDate.toDateString() + " " + nowDate.toTimeString().substring(0, 8);
                    timerDivElement.appendChild(loadTimeElement);

                    loadTimeElement = null;
                    nowDate = null;
                }
            }
            else {
                // player currently navigating other page instead of hunter camp
                var helpTextElement = document.createElement('div');
                helpTextElement.setAttribute('id', 'helpTextElement');
                if (fbPlatform) {
                    if (secureConnection) {
                        helpTextElement.innerHTML = "<b>Note:</b> MouseHunt AutoBot will only run at <a href='https://www.mousehuntgame.com/canvas/'>Hunter Camp</a>. This is to prevent the bot from interfering user's activity.";
                    }
                    else {
                        helpTextElement.innerHTML = "<b>Note:</b> MouseHunt AutoBot will only run at <a href='http://www.mousehuntgame.com/canvas/'>Hunter Camp</a>. This is to prevent the bot from interfering user's activity.";
                    }
                }
                else if (hiFivePlatform) {
                    if (secureConnection) {
                        helpTextElement.innerHTML = "<b>Note:</b> MouseHunt AutoBot will only run at <a href='https://mousehunt.hi5.hitgrab.com/'>Hunter Camp</a>. This is to prevent the bot from interfering user's activity.";
                    }
                    else {
                        helpTextElement.innerHTML = "<b>Note:</b> MouseHunt AutoBot will only run at <a href='http://mousehunt.hi5.hitgrab.com/'>Hunter Camp</a>. This is to prevent the bot from interfering user's activity.";
                    }
                }
                else if (mhPlatform) {
                    if (secureConnection) {
                        helpTextElement.innerHTML = "<b>Note:</b> MouseHunt AutoBot will only run at <a href='https://www.mousehuntgame.com/'>Hunter Camp</a>. This is to prevent the bot from interfering user's activity.";
                    }
                    else {
                        helpTextElement.innerHTML = "<b>Note:</b> MouseHunt AutoBot will only run at <a href='http://www.mousehuntgame.com/'>Hunter Camp</a>. This is to prevent the bot from interfering user's activity.";
                    }
                }
                else if (mhMobilePlatform) {
                    if (secureConnection) {
                        helpTextElement.innerHTML = "<b>Note:</b> Mobile version of Mousehunt is not supported currently. Please use the <a href='https://www.mousehuntgame.com/?switch_to=standard'>standard version of MouseHunt</a>.";
                    }
                    else {
                        helpTextElement.innerHTML = "<b>Note:</b> Mobile version of Mousehunt is not supported currently. Please use the <a href='http://www.mousehuntgame.com/?switch_to=standard'>standard version of MouseHunt</a>.";
                    }
                }
                timerDivElement.appendChild(helpTextElement);

                helpTextElement = null;
            }

            var showPreference = getStorage('showPreference');
            if (showPreference == undefined || showPreference == null) {
                showPreference = false;
                setStorage("showPreference", showPreference);
            }

            var showPreferenceLinkDiv = document.createElement('div');
            showPreferenceLinkDiv.setAttribute('id', 'showPreferenceLinkDiv');
            showPreferenceLinkDiv.setAttribute('style', 'text-align:right');
            timerDivElement.appendChild(showPreferenceLinkDiv);

            var showPreferenceSpan = document.createElement('span');
            var showPreferenceLinkStr = '<a id="showPreferenceLink" name="showPreferenceLink" onclick="if (document.getElementById(\'showPreferenceLink\').innerHTML == \'<b>[Hide Preference]</b>\') { document.getElementById(\'preferenceDiv\').style.display=\'none\';  document.getElementById(\'showPreferenceLink\').innerHTML=\'<b>[Show Preference]</b>\'; } else { document.getElementById(\'preferenceDiv\').style.display=\'block\'; document.getElementById(\'showPreferenceLink\').innerHTML=\'<b>[Hide Preference]</b>\'; }">';
            if (showPreference == true)
                showPreferenceLinkStr += '<b>[Hide Preference]</b>';
            else
                showPreferenceLinkStr += '<b>[Show Preference]</b>';
            showPreferenceLinkStr += '</a>';
            showPreferenceLinkStr += '&nbsp;&nbsp;&nbsp;';
            showPreferenceSpan.innerHTML = showPreferenceLinkStr;
            showPreferenceLinkDiv.appendChild(showPreferenceSpan);
            showPreferenceLinkStr = null;
            showPreferenceSpan = null;
            showPreferenceLinkDiv = null;

            var hr2Element = document.createElement('hr');
            timerDivElement.appendChild(hr2Element);
            hr2Element = null;

            var preferenceHTMLStr = '<table border="0" width="100%">';
            if (aggressiveMode) {
                preferenceHTMLStr += '<tr>';
                preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
                preferenceHTMLStr += '<a title="Bot aggressively by ignore all safety measure such as check horn image visible before sounding it">';
                preferenceHTMLStr += '<b>Aggressive Mode</b>';
                preferenceHTMLStr += '</a>';
                preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '<td style="height:24px">';
                preferenceHTMLStr += '<input type="radio" id="AggressiveModeInputTrue" name="AggressiveModeInput" value="true" onchange="if (document.getElementById(\'AggressiveModeInputTrue\').checked == true) { document.getElementById(\'HornTimeDelayMinInput\').disabled=\'disabled\'; document.getElementById(\'HornTimeDelayMaxInput\').disabled=\'disabled\';}" checked="checked"/> True';
                preferenceHTMLStr += '   ';
                preferenceHTMLStr += '<input type="radio" id="AggressiveModeInputFalse" name="AggressiveModeInput" value="false" onchange="if (document.getElementById(\'AggressiveModeInputFalse\').checked == true) { document.getElementById(\'HornTimeDelayMinInput\').disabled=\'\'; document.getElementById(\'HornTimeDelayMaxInput\').disabled=\'\';}"/> False';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '</tr>';
                preferenceHTMLStr += '<tr>';
                preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
                preferenceHTMLStr += '<a title="Extra delay time before sounding the horn (in seconds)">';
                preferenceHTMLStr += '<b>Horn Time Delay</b>';
                preferenceHTMLStr += '</a>';
                preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '<td style="height:24px">';
                preferenceHTMLStr += '<input type="text" id="HornTimeDelayMinInput" name="HornTimeDelayMinInput" disabled="disabled" value="' + hornTimeDelayMin.toString() + '"/> seconds';
                preferenceHTMLStr += ' ~ ';
                preferenceHTMLStr += '<input type="text" id="HornTimeDelayMaxInput" name="HornTimeDelayMaxInput" disabled="disabled" value="' + hornTimeDelayMax.toString() + '"/> seconds';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '</tr>';
            }
            else {
                preferenceHTMLStr += '<tr>';
                preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
                preferenceHTMLStr += '<a title="Bot aggressively by ignore all safety measure such as check horn image visible before sounding it">';
                preferenceHTMLStr += '<b>Aggressive Mode</b>';
                preferenceHTMLStr += '</a>';
                preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '<td style="height:24px">';
                preferenceHTMLStr += '<input type="radio" id="AggressiveModeInputTrue" name="AggressiveModeInput" value="true" onchange="if (document.getElementById(\'AggressiveModeInputTrue\').checked == true) { document.getElementById(\'HornTimeDelayMinInput\').disabled=\'disabled\'; document.getElementById(\'HornTimeDelayMaxInput\').disabled=\'disabled\';}"/> True';
                preferenceHTMLStr += '   ';
                preferenceHTMLStr += '<input type="radio" id="AggressiveModeInputFalse" name="AggressiveModeInput" value="false" onchange="if (document.getElementById(\'AggressiveModeInputFalse\').checked == true) { document.getElementById(\'HornTimeDelayMinInput\').disabled=\'\'; document.getElementById(\'HornTimeDelayMaxInput\').disabled=\'\';}" checked="checked"/> False';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '</tr>';
                preferenceHTMLStr += '<tr>';
                preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
                preferenceHTMLStr += '<a title="Extra delay time before sounding the horn (in seconds)">';
                preferenceHTMLStr += '<b>Horn Time Delay</b>';
                preferenceHTMLStr += '</a>&nbsp;&nbsp;:&nbsp;&nbsp;';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '<td style="height:24px">';
                preferenceHTMLStr += '<input type="text" id="HornTimeDelayMinInput" name="HornTimeDelayMinInput" value="' + hornTimeDelayMin.toString() + '"/> seconds';
                preferenceHTMLStr += ' ~ ';
                preferenceHTMLStr += '<input type="text" id="HornTimeDelayMaxInput" name="HornTimeDelayMaxInput" value="' + hornTimeDelayMax.toString() + '"/> seconds';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '</tr>';
            }
            if (enableTrapCheck) {
                preferenceHTMLStr += '<tr>';
                preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
                preferenceHTMLStr += '<a title="Enable trap check once an hour"><b>Trap Check</b></a>';
                preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '<td style="height:24px">';
                preferenceHTMLStr += '<input type="radio" id="TrapCheckInputTrue" name="TrapCheckInput" value="true" onchange="if (document.getElementById(\'TrapCheckInputTrue\').checked == true) { document.getElementById(\'TrapCheckTimeDelayMinInput\').disabled=\'\'; document.getElementById(\'TrapCheckTimeDelayMaxInput\').disabled=\'\';}" checked="checked"/> True';
                preferenceHTMLStr += '   ';
                preferenceHTMLStr += '<input type="radio" id="TrapCheckInputFalse" name="TrapCheckInput" value="false" onchange="if (document.getElementById(\'TrapCheckInputFalse\').checked == true) { document.getElementById(\'TrapCheckTimeDelayMinInput\').disabled=\'disabled\'; document.getElementById(\'TrapCheckTimeDelayMaxInput\').disabled=\'disabled\';}"/> False';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '</tr>';
                preferenceHTMLStr += '<tr>';
                preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
                preferenceHTMLStr += '<a title="Extra delay time to trap check (in seconds)"><b>Trap Check Time Delay</b></a>';
                preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '<td style="height:24px">';
                preferenceHTMLStr += '<input type="text" id="TrapCheckTimeDelayMinInput" name="TrapCheckTimeDelayMinInput" value="' + checkTimeDelayMin.toString() + '"/> seconds';
                preferenceHTMLStr += ' ~ ';
                preferenceHTMLStr += '<input type="text" id="TrapCheckTimeDelayMaxInput" name="TrapCheckTimeDelayMaxInput" value="' + checkTimeDelayMax.toString() + '"/> seconds';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '</tr>';
            }
            else {
                preferenceHTMLStr += '<tr>';
                preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
                preferenceHTMLStr += '<a title="Enable trap check once an hour"><b>Trap Check</b></a>';
                preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '<td style="height:24px">';
                preferenceHTMLStr += '<input type="radio" id="TrapCheckInputTrue" name="TrapCheckInput" value="true" onchange="if (document.getElementById(\'TrapCheckInputTrue\').checked == true) { document.getElementById(\'TrapCheckTimeDelayMinInput\').disabled=\'\'; document.getElementById(\'TrapCheckTimeDelayMaxInput\').disabled=\'\';}"/> True';
                preferenceHTMLStr += '   ';
                preferenceHTMLStr += '<input type="radio" id="TrapCheckInputFalse" name="TrapCheckInput" value="false" onchange="if (document.getElementById(\'TrapCheckInputFalse\').checked == true) { document.getElementById(\'TrapCheckTimeDelayMinInput\').disabled=\'disabled\'; document.getElementById(\'TrapCheckTimeDelayMaxInput\').disabled=\'disabled\';}" checked="checked"/> False';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '</tr>';
                preferenceHTMLStr += '<tr>';
                preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
                preferenceHTMLStr += '<a title="Extra delay time to trap check (in seconds)"><b>Trap Check Time Delay</b></a>';
                preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '<td style="height:24px">';
                preferenceHTMLStr += '<input type="text" id="TrapCheckTimeDelayMinInput" name="TrapCheckTimeDelayMinInput" disabled="disabled" value="' + checkTimeDelayMin.toString() + '"/> seconds';
                preferenceHTMLStr += ' ~ ';
                preferenceHTMLStr += '<input type="text" id="TrapCheckTimeDelayMaxInput" name="TrapCheckTimeDelayMaxInput" disabled="disabled" value="' + checkTimeDelayMax.toString() + '"/> seconds';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '</tr>';
            }
			
            if (isKingWarningSound) {
                preferenceHTMLStr += '<tr>';
                preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
                preferenceHTMLStr += '<a title="Play sound when encounter king\'s reward"><b>Play King Reward Sound</b></a>';
                preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '<td style="height:24px">';
                preferenceHTMLStr += '<input type="radio" id="PlayKingRewardSoundInputTrue" name="PlayKingRewardSoundInput" value="true" checked="checked"/> True';
                preferenceHTMLStr += '   ';
                preferenceHTMLStr += '<input type="radio" id="PlayKingRewardSoundInputFalse" name="PlayKingRewardSoundInput" value="false" /> False';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '</tr>';
            }
            else {
                preferenceHTMLStr += '<tr>';
                preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
                preferenceHTMLStr += '<a title="Play sound when encounter king\'s reward"><b>Play King Reward Sound</b></a>';
                preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '<td style="height:24px">';
                preferenceHTMLStr += '<input type="radio" id="PlayKingRewardSoundInputTrue" name="PlayKingRewardSoundInput" value="true" /> True';
                preferenceHTMLStr += '   ';
                preferenceHTMLStr += '<input type="radio" id="PlayKingRewardSoundInputFalse" name="PlayKingRewardSoundInput" value="false" checked="checked"/> False';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '</tr>';
            }
			
            preferenceHTMLStr += '<tr>';
            preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
			preferenceHTMLStr += '<a title="Solve King Reward automatically"><b>Auto Solve King Reward</b></a>';
            preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
            preferenceHTMLStr += '</td>';
            preferenceHTMLStr += '<td style="height:24px">';
			if (isAutoSolve) {
				preferenceHTMLStr += '<input type="radio" id="AutoSolveKRInputTrue" name="AutoSolveKRInput" value="true" onchange="if (document.getElementById(\'AutoSolveKRInputTrue\').checked == true) { document.getElementById(\'AutoSolveKRDelayMinInput\').disabled=\'\'; document.getElementById(\'AutoSolveKRDelayMaxInput\').disabled=\'\';}" checked="checked"/> True';
                preferenceHTMLStr += '   ';
                preferenceHTMLStr += '<input type="radio" id="AutoSolveKRInputFalse" name="AutoSolveKRInput" value="false" onchange="if (document.getElementById(\'AutoSolveKRInputFalse\').checked == true) { document.getElementById(\'AutoSolveKRDelayMinInput\').disabled=\'disabled\'; document.getElementById(\'AutoSolveKRDelayMaxInput\').disabled=\'disabled\';}"/> False';
            }
            else {
                preferenceHTMLStr += '<input type="radio" id="AutoSolveKRInputTrue" name="AutoSolveKRInput" value="true" onchange="if (document.getElementById(\'AutoSolveKRInputTrue\').checked == true) { document.getElementById(\'AutoSolveKRDelayMinInput\').disabled=\'\'; document.getElementById(\'AutoSolveKRDelayMaxInput\').disabled=\'\';}"/> True';
                preferenceHTMLStr += '   ';
                preferenceHTMLStr += '<input type="radio" id="AutoSolveKRInputFalse" name="AutoSolveKRInput" value="false" onchange="if (document.getElementById(\'AutoSolveKRInputFalse\').checked == true) { document.getElementById(\'AutoSolveKRDelayMinInput\').disabled=\'disabled\'; document.getElementById(\'AutoSolveKRDelayMaxInput\').disabled=\'disabled\';}" checked="checked"/> False';                
            }
            preferenceHTMLStr += '</td>';
            preferenceHTMLStr += '</tr>';
            preferenceHTMLStr += '<tr>';
            preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
			preferenceHTMLStr += '<a title="Extra delay time to solve King Reward (in seconds)"><b>Auto Solve King Reward Delay</b></a>';
            preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
            preferenceHTMLStr += '</td>';
            preferenceHTMLStr += '<td style="height:24px">';
			if (isAutoSolve) {
                preferenceHTMLStr += '<input type="text" id="AutoSolveKRDelayMinInput" name="AutoSolveKRDelayMinInput" value="' + krDelayMin.toString() + '"/> seconds';
                preferenceHTMLStr += ' ~ ';
                preferenceHTMLStr += '<input type="text" id="AutoSolveKRDelayMaxInput" name="AutoSolveKRDelayMaxInput" value="' + krDelayMax.toString() + '"/> seconds';                
            }
            else {
                preferenceHTMLStr += '<input type="text" id="AutoSolveKRDelayMinInput" name="AutoSolveKRDelayMinInput" disabled="disabled" value="' + krDelayMin.toString() + '"/> seconds';
                preferenceHTMLStr += ' ~ ';
                preferenceHTMLStr += '<input type="text" id="AutoSolveKRDelayMaxInput" name="AutoSolveKRDelayMaxInput" disabled="disabled" value="' + krDelayMax.toString() + '"/> seconds';
            }
            preferenceHTMLStr += '</td>';
            preferenceHTMLStr += '</tr>';
			
            if (pauseAtInvalidLocation) {
                preferenceHTMLStr += '<tr>';
                preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
                preferenceHTMLStr += '<a title="The script will pause if player at different location that hunt location set before"><b>Remember Location</b></a>';
                preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '<td style="height:24px">';
                preferenceHTMLStr += '<input type="radio" id="PauseLocationInputTrue" name="PauseLocationInput" value="true" checked="checked"/> True';
                preferenceHTMLStr += '   ';
                preferenceHTMLStr += '<input type="radio" id="PauseLocationInputFalse" name="PauseLocationInput" value="false" /> False';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '</tr>';
            }
            else {
                preferenceHTMLStr += '<tr>';
                preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
                preferenceHTMLStr += '<a title="The script will pause if player at different location that hunt location set before"><b>Remember Location</b></a>';
                preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '<td style="height:24px">';
                preferenceHTMLStr += '<input type="radio" id="PauseLocationInputTrue" name="PauseLocationInput" value="true"/> True';
                preferenceHTMLStr += '   ';
                preferenceHTMLStr += '<input type="radio" id="PauseLocationInputFalse" name="PauseLocationInput" value="false" checked="checked"/> False';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '</tr>';
            }

            preferenceHTMLStr += '<tr>';
            preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
            preferenceHTMLStr += '<a title="Select the script algorithm based on certain event / location"><b>Event or Location</b></a>';
            preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
            preferenceHTMLStr += '</td>';
            preferenceHTMLStr += '<td style="height:24px">';
            preferenceHTMLStr += '<select name="algo" onChange="window.localStorage.setItem(\'eventLocation\', value); document.getElementById(\'event\').value=window.localStorage.getItem(\'eventLocation\');">';
            preferenceHTMLStr += '<option value="None" selected>None</option>';
            preferenceHTMLStr += '<option value="Charge Egg 2015">Charge Egg 2015</option>';
            preferenceHTMLStr += '<option value="Charge Egg 2015(17)">Charge Egg 2015(17)</option>';
			preferenceHTMLStr += '<option value="Burroughs Rift(Red)">Burroughs Rift(Red)</option>';
			preferenceHTMLStr += '<option value="Burroughs Rift(Green)">Burroughs Rift(Green)</option>';
			preferenceHTMLStr += '<option value="Burroughs Rift(Yellow)">Burroughs Rift(Yellow)</option>';
			preferenceHTMLStr += '<option value="Halloween 2015">Halloween 2015</option>';
			preferenceHTMLStr += '<option value="Sunken City">Sunken City</option>';
			preferenceHTMLStr += '<option value="Sunken City Aggro">Sunken City Aggro</option>';
            preferenceHTMLStr += '<option value="All LG Area">All LG Area</option>';
            preferenceHTMLStr += '</select> Current Selection : ';
            preferenceHTMLStr += '<input type="text" id="event" name="event" value="' + eventLocation + '"/>';
            preferenceHTMLStr += '</td>';
            preferenceHTMLStr += '</tr>';

            preferenceHTMLStr += '<tr>';
            preferenceHTMLStr += '<td style="height:24px; text-align:right;" colspan="2">';
            preferenceHTMLStr += '(Changes only take place after user save the preference) ';
            preferenceHTMLStr += '<input type="button" id="PreferenceSaveInput" value="Save" onclick="	\
				if (document.getElementById(\'AggressiveModeInputTrue\').checked == true) { window.localStorage.setItem(\'AggressiveMode\', \'true\'); } else { window.localStorage.setItem(\'AggressiveMode\', \'false\'); }	\
				window.localStorage.setItem(\'HornTimeDelayMin\', document.getElementById(\'HornTimeDelayMinInput\').value); window.localStorage.setItem(\'HornTimeDelayMax\', document.getElementById(\'HornTimeDelayMaxInput\').value);	\
				if (document.getElementById(\'TrapCheckInputTrue\').checked == true) { window.localStorage.setItem(\'TrapCheck\', \'true\'); } else { window.localStorage.setItem(\'TrapCheck\', \'false\'); }	\
				window.localStorage.setItem(\'TrapCheckTimeDelayMin\', document.getElementById(\'TrapCheckTimeDelayMinInput\').value); window.localStorage.setItem(\'TrapCheckTimeDelayMax\', document.getElementById(\'TrapCheckTimeDelayMaxInput\').value);	\
				if (document.getElementById(\'PlayKingRewardSoundInputTrue\').checked == true) { window.localStorage.setItem(\'PlayKingRewardSound\', \'true\'); } else { window.localStorage.setItem(\'PlayKingRewardSound\', \'false\'); }	\
				if (document.getElementById(\'AutoSolveKRInputTrue\').checked == true) { window.localStorage.setItem(\'AutoSolveKR\', \'true\'); } else { window.localStorage.setItem(\'AutoSolveKR\', \'false\'); }	\
				window.localStorage.setItem(\'AutoSolveKRDelayMin\', document.getElementById(\'AutoSolveKRDelayMinInput\').value); window.localStorage.setItem(\'AutoSolveKRDelayMax\', document.getElementById(\'AutoSolveKRDelayMaxInput\').value);	\
				if (document.getElementById(\'PauseLocationInputTrue\').checked == true) { window.localStorage.setItem(\'PauseLocation\', \'true\'); } else { window.localStorage.setItem(\'PauseLocation\', \'false\'); }	\
				';
            if (fbPlatform) {
                if (secureConnection)
                    preferenceHTMLStr += 'window.location.href=\'https://www.mousehuntgame.com/canvas/\';"/>';
                else
                    preferenceHTMLStr += 'window.location.href=\'http://www.mousehuntgame.com/canvas/\';"/>';
            }
            else if (hiFivePlatform) {
                if (secureConnection)
                    preferenceHTMLStr += 'window.location.href=\'https://www.mousehunt.hi5.hitgrab.com/\';"/>';
                else
                    preferenceHTMLStr += 'window.location.href=\'http://www.mousehunt.hi5.hitgrab.com/\';"/>';
            }
            else if (mhPlatform) {
                if (secureConnection)
                    preferenceHTMLStr += 'window.location.href=\'https://www.mousehuntgame.com/\';"/>';
                else
                    preferenceHTMLStr += 'window.location.href=\'http://www.mousehuntgame.com/\';"/>';
            }
            preferenceHTMLStr += '&nbsp;&nbsp;&nbsp;</td>';
            preferenceHTMLStr += '</tr>';
            preferenceHTMLStr += '</table>';

            var preferenceDiv = document.createElement('div');
            preferenceDiv.setAttribute('id', 'preferenceDiv');
            if (showPreference == true)
                preferenceDiv.setAttribute('style', 'display: block');
            else
                preferenceDiv.setAttribute('style', 'display: none');
            preferenceDiv.innerHTML = preferenceHTMLStr;
            timerDivElement.appendChild(preferenceDiv);
            preferenceHTMLStr = null;
            showPreference = null;

            var hr3Element = document.createElement('hr');
            preferenceDiv.appendChild(hr3Element);
            hr3Element = null;
            preferenceDiv = null;

            // embed all msg to the page
            headerElement.parentNode.insertBefore(timerDivElement, headerElement);

            timerDivElement = null;
        }
        headerElement = null;
    }

    targetPage = null;

}

function loadPreferenceSettingFromStorage() {
    aggressiveMode = getStorageToVariableBool("AggressiveMode", aggressiveMode);
	hornTimeDelayMin = getStorageToVariableInt("HornTimeDelayMin", hornTimeDelayMin);
	hornTimeDelayMax = getStorageToVariableInt("HornTimeDelayMax", hornTimeDelayMax);
	enableTrapCheck = getStorageToVariableBool("TrapCheck", enableTrapCheck);
	checkTimeDelayMin = getStorageToVariableInt("TrapCheckTimeDelayMin", checkTimeDelayMin);
	checkTimeDelayMiax = getStorageToVariableInt("TrapCheckTimeDelayMax", checkTimeDelayMax);	
	isKingWarningSound = getStorageToVariableBool("PlayKingRewardSound", isKingWarningSound);
	isAutoSolve = getStorageToVariableBool("AutoSolveKR", isAutoSolve);
	krDelayMin = getStorageToVariableInt("AutoSolveKRDelayMin", krDelayMin);
	krDelayMax = getStorageToVariableInt("AutoSolveKRDelayMax", krDelayMax);	
	kingsRewardRetry = getStorageToVariableInt("KingsRewardRetry", kingsRewardRetry);	
	pauseAtInvalidLocation = getStorageToVariableBool("PauseLocation", pauseAtInvalidLocation);
    discharge = getStorageToVariableBool("discharge", discharge);
	eventLocation = getStorageToVariableStr("eventLocation", "None");
}

function getStorageToVariableInt(storageName, defaultInt)
{
	var temp = getStorage(storageName);    
	var tempInt = defaultInt;
    if (temp == undefined || temp == null) {
        setStorage(storageName, defaultInt);        
    }
    else {
        tempInt = parseInt(temp);        
    }
	return tempInt;    
}

function getStorageToVariableStr(storageName, defaultStr)
{
	var temp = getStorage(storageName);
    if (temp == undefined || temp == null) {
        setStorage(storageName, defaultStr);
        temp = defaultStr;
    }
    return temp;    
}

function getStorageToVariableBool(storageName, defaultBool)
{
	var temp = getStorage(storageName);
    if (temp == undefined || temp == null) {
        setStorage(storageName, defaultBool.toString());
		return defaultBool;
    }
    else if (temp == true || temp.toLowerCase() == "true") {
        return true;
    }
    else {
        return false;
    }
}

function displayTimer(title, nextHornTime, checkTime) {
    if (showTimerInTitle) {
        document.title = title;
    }

    if (showTimerInPage) {
        nextHornTimeElement.innerHTML = "<b>Next Hunter Horn Time:</b> " + nextHornTime;
        checkTimeElement.innerHTML = "<b>Next Trap Check Time:</b> " + checkTime;
    }

    title = null;
    nextHornTime = null;
    checkTime = null;
}

function displayLocation(locStr) {
    if (showTimerInPage && pauseAtInvalidLocation) {
        travelElement.innerHTML = "<b>Hunt Location:</b> " + locStr;
    }

    locStr = null;
}

function displayKingRewardSumTime(timeStr) {
    if (showTimerInPage) {
        if (timeStr) {
            lastKingRewardSumTimeElement.innerHTML = "(" + timeStr + ")";
        }
        else {
            lastKingRewardSumTimeElement.innerHTML = "";
        }
    }

    timeStr = null;
}

// ################################################################################################
//   Timer Function - End
// ################################################################################################

// ################################################################################################
//   Horn Function - Start
// ################################################################################################

function soundHorn() {
	var isAtCampPage = (isNewUI)? (document.getElementById('journalContainer') != null) : (document.getElementById('huntingTips') != null) ;
	console.debug("At Camp Page: " + isAtCampPage);
	if (!isAtCampPage) {
		displayTimer("Not At Camp Page", "Not At Camp Page", "Not At Camp Page");
		return;
	}
	
	// update timer
    displayTimer("Ready to Blow The Horn...", "Ready to Blow The Horn...", "Ready to Blow The Horn...");

    var scriptNode = document.getElementById("scriptNode");
    if (scriptNode) {
        scriptNode.setAttribute("soundedHornAtt", "false");
    }
    scriptNode = null;

    if (!aggressiveMode) {
        // safety mode, check the horn image is there or not before sound the horn
        var headerElement = (isNewUI) ? document.getElementById('mousehuntHud').firstChild : document.getElementById('header');
        if (headerElement) {
            // need to make sure that the horn image is ready before we can click on it
            var headerStatus = headerElement.getAttribute('class');
			headerStatus = headerStatus.toLowerCase();
            if (headerStatus.indexOf("hornready") != -1) {
                // found the horn image, let's sound the horn!

                // update timer
                displayTimer("Blowing The Horn...", "Blowing The Horn...", "Blowing The Horn...");

                // simulate mouse click on the horn
                var hornElement = document.getElementsByClassName(strHornButton)[0].firstChild;
                fireEvent(hornElement, 'click');
                hornElement = null;

                // clean up
                headerElement = null;
                headerStatus = null;

                // double check if the horn was already sounded
                window.setTimeout(function () { afterSoundingHorn() }, 5000);
            }
            else if (headerStatus.indexOf("hornsounding") != -1 || headerStatus.indexOf("hornsounded") != -1) {
                // some one just sound the horn...

                // update timer
                displayTimer("Synchronizing Data...", "Someone had just sound the horn. Synchronizing data...", "Someone had just sound the horn. Synchronizing data...");

                // clean up
                headerElement = null;
                headerStatus = null;

                // load the new data
                window.setTimeout(function () { afterSoundingHorn() }, 5000);
            }
            else if (headerStatus.indexOf("hornwaiting") != -1) {
                // the horn is not appearing, let check the time again

                // update timer
                displayTimer("Synchronizing Data...", "Hunter horn is not ready yet. Synchronizing data...", "Hunter horn is not ready yet. Synchronizing data...");

                // sync the time again, maybe user already click the horn
                retrieveData();

                checkJournalDate();

                // clean up
                headerElement = null;
                headerStatus = null;

                // loop again
                window.setTimeout(function () { countdownTimer() }, timerRefreshInterval * 1000);
            }
            else {
                // some one steal the horn!

                // update timer
                displayTimer("Synchronizing Data...", "Hunter horn is missing. Synchronizing data...", "Hunter horn is missing. Synchronizing data...");

                // try to click on the horn
                var hornElement = document.getElementsByClassName(strHornButton)[0].firstChild;
                fireEvent(hornElement, 'click');
                hornElement = null;

                // clean up
                headerElement = null;
                headerStatus = null;

                // double check if the horn was already sounded
                window.setTimeout(function () { afterSoundingHorn() }, 5000);
            }
        }
        else {
            // something wrong, can't even found the header...

            // clean up
            headerElement = null;

            // reload the page see if thing get fixed
            reloadWithMessage("Fail to find the horn header. Reloading...", false);
        }

    }
    else {
        // aggressive mode, ignore whatever horn image is there or not, just sound the horn!

        // simulate mouse click on the horn
        fireEvent(document.getElementsByClassName(strHornButton)[0].firstChild, 'click');

        // double check if the horn was already sounded
        window.setTimeout(function () { afterSoundingHorn() }, 3000);
    }
}

function afterSoundingHorn() {
    var scriptNode = document.getElementById("scriptNode");
    if (scriptNode) {
        scriptNode.setAttribute("soundedHornAtt", "false");
    }
    scriptNode = null;

    var headerElement = (isNewUI) ? document.getElementById('mousehuntHud').firstChild : document.getElementById('header');
    if (headerElement) {
        // double check if the horn image is still visible after the script already sound it
        var headerStatus = headerElement.getAttribute('class');
		headerStatus = headerStatus.toLowerCase();
        if (headerStatus.indexOf("hornready") != -1) {
            // seen like the horn is not functioning well

            // update timer
            displayTimer("Blowing The Horn Again...", "Blowing The Horn Again...", "Blowing The Horn Again...");

            // simulate mouse click on the horn
            var hornElement = document.getElementsByClassName(strHornButton)[0].firstChild;
            fireEvent(hornElement, 'click');
            hornElement = null;

            // clean up
            headerElement = null;
            headerStatus = null;

            // increase the horn retry counter and check if the script is caugh in loop
            ++hornRetry;
            if (hornRetry > hornRetryMax) {
                // reload the page see if thing get fixed
                reloadWithMessage("Detected script caught in loop. Reloading...", true);

                // reset the horn retry counter
                hornRetry = 0;
            }
            else {
                // check again later
                window.setTimeout(function () { afterSoundingHorn() }, 1000);
            }
        }
        else if (headerStatus.indexOf("hornsounding") != -1) {
            // the horn is already sound, but the network seen to slow on fetching the data

            // update timer
            displayTimer("The horn sounding taken extra longer than normal...", "The horn sounding taken extra longer than normal...", "The horn sounding taken extra longer than normal...");

            // clean up
            headerElement = null;
            headerStatus = null;

            // increase the horn retry counter and check if the script is caugh in loop
            ++hornRetry;
            if (hornRetry > hornRetryMax) {
                // reload the page see if thing get fixed
                reloadWithMessage("Detected script caught in loop. Reloading...", true);

                // reset the horn retry counter
                hornRetry = 0;
            }
            else {
                // check again later
                window.setTimeout(function () { afterSoundingHorn() }, 3000);
            }
        }
        else {
            // everything look ok

            // update timer
            displayTimer("Horn sounded. Synchronizing Data...", "Horn sounded. Synchronizing data...", "Horn sounded. Synchronizing data...");

            // reload data
            retrieveData();

            // clean up
            headerElement = null;
            headerStatus = null;

            // script continue as normal
            window.setTimeout(function () { countdownTimer() }, timerRefreshInterval * 1000);

            // reset the horn retry counter
            hornRetry = 0;
        }
    }
    // eventLocationCheck('afterSoundingHorn()');
}

function embedScript() {
    // create a javascript to detect if user click on the horn manually
    var scriptNode = document.createElement('script');
    scriptNode.setAttribute('id', 'scriptNode');
    scriptNode.setAttribute('type', 'text/javascript');
    scriptNode.setAttribute('soundedHornAtt', 'false');
    scriptNode.innerHTML = '														\
		function soundedHorn()														\
		{																			\
			var scriptNode = document.getElementById("scriptNode");					\
			if (scriptNode)															\
			{																		\
				scriptNode.setAttribute("soundedHornAtt", "true");					\
			}																		\
			scriptNode = null;														\
		}																			\
		';

    // find the head node and insert the script into it
    var headerElement;
    if (fbPlatform || hiFivePlatform || mhPlatform) {
        headerElement = document.getElementById('noscript');
    }
    else if (mhMobilePlatform) {
        headerElement = document.getElementById('mobileHorn');
    }
    headerElement.parentNode.insertBefore(scriptNode, headerElement);
    scriptNode = null;
    headerElement = null;

    // change the function call of horn
	var testNewUI = document.getElementById('header');
	if (testNewUI != null) {
		// old UI
		isNewUI = false;
		strHornButton = 'hornbutton';
		strCampButton = 'campbutton';
	}
	else {
		// new UI
		isNewUI = true;
		strHornButton = 'mousehuntHud-huntersHorn-container';
        strCampButton = 'camp';
		alert("New UI might not work properly with this script. Use at your own risk");
	}
	
	var hornButtonLink = document.getElementsByClassName(strHornButton)[0].firstChild;
    var oriStr = hornButtonLink.getAttribute('onclick').toString();
    var index = oriStr.indexOf('return false;');
    var modStr = oriStr.substring(0, index) + 'soundedHorn();' + oriStr.substring(index);
    hornButtonLink.setAttribute('onclick', modStr);

    hornButtonLink = null;
    oriStr = null;
    index = null;
    modStr = null;
}

// ################################################################################################
//   Horn Function - End
// ################################################################################################



// ################################################################################################
//   King's Reward Function - Start
// ################################################################################################

function kingRewardAction() {
    // update timer
    displayTimer("King's Reward!", "King's Reward", "King's Reward!");
    displayLocation("-");

    // play music if needed
    playKingRewardSound();

    // focus on the answer input
    var inputElementList = document.getElementsByTagName('input');
    if (inputElementList) {
        var i;
        for (i = 0; i < inputElementList.length; ++i) {
            // check if it is a resume button
            if (inputElementList[i].getAttribute('name') == "puzzle_answer") {
                inputElementList[i].focus();
                break;
            }
        }
        i = null;
    }
    inputElementList = null;

    // record last king's reward time
    var nowDate = new Date();
    setStorage("lastKingRewardDate", nowDate.toString());

	if (!isAutoSolve)
	{
		var intervalCRB = setInterval(
			function ()
			{
				if (checkResumeButton())
				{
					clearInterval(intervalCRB);
					intervalCRB = null;
					return;
				}
			}, 1000);
		return;
	}		
	
	var krDelaySec = krDelayMin + Math.floor(Math.random() * (krDelayMax - krDelayMin));		
	var krStopHourNormalized = krStopHour;
	var krStartHourNormalized = krStartHour;
	if (krStopHour > krStartHour) // e.g. Stop to Start => 22 to 06
	{
		var offset = 24 - krStopHour;
		krStartHourNormalized = krStartHour + offset;
		krStopHourNormalized = 0;		
		nowDate.setHours(nowDate.getHours() + offset);
    }

	if (nowDate.getHours() >= krStopHourNormalized && nowDate.getHours() < krStartHourNormalized)
	{
		var krDelayMinute = krStartHourDelayMin + Math.floor(Math.random() * (krStartHourDelayMax - krStartHourDelayMin));
		krDelaySec += krStartHour * 3600 - (nowDate.getHours() * 3600 + nowDate.getMinutes() * 60 + nowDate.getSeconds());
		krDelaySec += krDelayMinute * 60;
		var timeNow = new Date();
		setStorage("Time to start delay", timeNow.toString());
		setStorage("Delay time", timeformat(krDelaySec))
		kingRewardCountdownTimer(krDelaySec, true);
	}
	else
	{
		if (kingsRewardRetry > 0)
			krDelaySec /= (kingsRewardRetry * 2);
		kingRewardCountdownTimer(krDelaySec, false);		
	}		
}

function playKingRewardSound() {
    if (isKingWarningSound) {
		unsafeWindow.hornAudio = new Audio('https://raw.githubusercontent.com/devcnn88/MHAutoBotEnhanced/master/resources/Girtab.mp3');
		hornAudio.loop = true;
        hornAudio.play();        
    }
}

function kingRewardCountdownTimer(interval, isReloadToSolve)
{   	
	var strTemp = (isReloadToSolve) ? "Reload to solve KR in " : "Solve KR in (extra few sec delay) ";
	strTemp = strTemp + timeformat(interval);	
	displayTimer(strTemp, strTemp, strTemp);
	strTemp = null;
	interval -= timerRefreshInterval;
	if (interval < 0)
	{
		if (isReloadToSolve)
		{
			// simulate mouse click on the camp button
			var campElement = document.getElementsByClassName(strCampButton)[0].firstChild;
			fireEvent(campElement, 'click');
			campElement = null;

			// reload the page if click on the camp button fail
			window.setTimeout(function () { reloadWithMessage("Fail to click on camp button. Reloading...", false); }, 5000);
		}
		else
		{
			var intervalCRB = setInterval(
				function ()
				{
					if (checkResumeButton())
					{
						clearInterval(intervalCRB);
						intervalCRB = null;
						return;
					}
				}, 1000);
			CallKRSolver();
		}		
	}
	else
	{		
        if (!checkResumeButton()) {
            window.setTimeout(function () { kingRewardCountdownTimer(interval, isReloadToSolve); }, timerRefreshInterval * 1000);
        }
    }
}

function checkResumeButton() {
    var found = false;

    var linkElementList = document.getElementsByTagName('img');
    if (linkElementList) {
        var i;
        for (i = 0; i < linkElementList.length; ++i) {
            // check if it is a resume button
            if (linkElementList[i].getAttribute('src').indexOf("resume_hunting_blue.gif") != -1) {
                // found resume button

                // simulate mouse click on the horn
                var resumeElement = linkElementList[i].parentNode;
                fireEvent(resumeElement, 'click');
                resumeElement = null;

                // reload url if click fail
                window.setTimeout(function () { reloadWithMessage("Fail to click on resume button. Reloading...", false); }, 6000);

                // recheck if the resume button is click because some time even the url reload also fail
                window.setTimeout(function () { checkResumeButton(); }, 10000);

                found = true;
                break;
            }
        }
        i = null;
    }

    linkElementList = null;

    try {
        return (found);
    }
    finally {
        found = null;
    }
}

function CallKRSolver()
{
	var frame = document.createElement('iframe');
	frame.setAttribute("id", "myFrame");
	var img = document.getElementById('puzzleImage');	
	if (debugKR)
		frame.src = "https://photos-4.dropbox.com/t/2/AAArkp_yNcE-_gLkppu3xeeV2p-y0q0Ml0AhZ0RfCIlYpQ/12/127673959/png/32x32/1/_/1/2/download.png/EM-6pmIYjboGIAcoBw/VXDBwjXQ2NNK6ShussiKls1sCUQSTjvkn3wM5g4Jcro?size=640x480&size_mode=2";
	else
		frame.src = img.src;	
	document.body.appendChild(frame);	
}

function CheckKRAnswerCorrectness()
{	
	var pageMsg = document.getElementById('pagemessage');
	if (pageMsg && pageMsg.innerText.toLowerCase().indexOf("unable to claim reward") > -1) // KR answer not correct, re-run OCR
	{
		if (kingsRewardRetry > kingsRewardRetryMax)
	    {
	        kingsRewardRetry = 0;
			setStorage("KingsRewardRetry", kingsRewardRetry);			
			alert('Max retry. Pls solve it manually.');
			return;
	    }
		++kingsRewardRetry;
		setStorage("KingsRewardRetry", kingsRewardRetry);
		CallKRSolver();
	}
	else
		window.setTimeout(function () { CheckKRAnswerCorrectness(); }, 1000);
}

// ################################################################################################
//   King's Reward Function - End
// ################################################################################################



// ################################################################################################
//   Trap Check Function - Start
// ################################################################################################

function trapCheck() {
    // update timer
    displayTimer("Checking The Trap...", "Checking trap now...", "Checking trap now...");

    // simulate mouse click on the camp button
    var campElement = document.getElementsByClassName(strCampButton)[0].firstChild;
    fireEvent(campElement, 'click');
    campElement = null;

    // reload the page if click on camp button fail
    // window.setTimeout(function () { reloadWithMessage("Fail to click on camp button. Reloading...", false); }, 5000);
	retrieveData();
	window.setTimeout(function () { countdownTimer() }, timerRefreshInterval * 1000);
    // eventLocationCheck();
}

function CalculateNextTrapCheckInMinute() {   
    if (enableTrapCheck) {
        var now = new Date();
        var temp = (trapCheckTimeDiff * 60) - (now.getMinutes() * 60 + now.getSeconds());
        checkTimeDelay = checkTimeDelayMin + Math.round(Math.random() * (checkTimeDelayMax - checkTimeDelayMin));
        checkTime = (now.getMinutes() >= trapCheckTimeDiff) ? 3600 + temp : temp;
        checkTime += checkTimeDelay;
        now = undefined;
        temp = undefined;
    }
}

// ################################################################################################
//   Trap Check Function - End
// ################################################################################################


// ################################################################################################
//   General Function - Start
// ################################################################################################

function browserDetection() {
    var browserName = "unknown";

    var userAgentStr = navigator.userAgent.toString().toLowerCase();
    if (userAgentStr.indexOf("firefox") >= 0) {
        browserName = "firefox";
    }
    else if (userAgentStr.indexOf("opera") >= 0) {
        browserName = "opera";
    }
    else if (userAgentStr.indexOf("chrome") >= 0) {
        browserName = "chrome";
    }
    userAgentStr = null;

    try {
        return (browserName);
    }
    finally {
        browserName = null;
    }
}

function setStorage(name, value) {
    // check if the web browser support HTML5 storage
    if ('localStorage' in window && window['localStorage'] !== null) {
        window.localStorage.setItem(name, value);
    }

    name = undefined;
    value = undefined;
}

function removeStorage(name) {
    // check if the web browser support HTML5 storage
    if ('localStorage' in window && window['localStorage'] !== null) {
        window.localStorage.removeItem(name);
    }
    name = undefined;
}

function getStorage(name) {
    // check if the web browser support HTML5 storage
    if ('localStorage' in window && window['localStorage'] !== null) {
        return (window.localStorage.getItem(name));
    }
    name = undefined;
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }

            var cookieString = unescape(document.cookie.substring(c_start, c_end));

            // clean up
            c_name = null;
            c_start = null;
            c_end = null;

            try {
                return cookieString;
            }
            finally {
                cookieString = null;
            }
        }
        c_start = null;
    }
    c_name = null;
    return null;
}

function disarmTrap(trapSelector) {
    clickTrapSelector(trapSelector);
    var x;
    var intervalDT = setInterval(
        function () {
            x = document.getElementsByClassName(trapSelector + ' canDisarm');
            if (x.length > 0) {
                for (var i = 0; i < x.length; ++i) {
                    if (x[i].getAttribute('title').indexOf('Click to disarm') > -1) {
                        fireEvent(x[i], 'click');
						arming = false;
                        clearInterval(intervalDT);
                        intervalDT = null;
                        return (console.debug('Disarmed'));
                    }
                }

            }
        }, 1000);
    return;
}

function fireEvent(element, event) {
    if (document.createEventObject) {
        // dispatch for IE
        var evt = document.createEventObject();

        try {
            return element.fireEvent('on' + event, evt);
        }
        finally {
            element = null;
            event = null;
            evt = null;
        }
    }
    else {
        // dispatch for firefox + others
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(event, true, true); // event type,bubbling,cancelable

        try {
            return !element.dispatchEvent(evt);
        }
        finally {
            element = null;
            event = null;
            evt = null;
        }
    }
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
		console.debug('Error getPageVariable - ' + e.message);
		return "";
	}	
}

function timeElapsed(dateA, dateB) {
    var elapsed = 0;

    var secondA = Date.UTC(dateA.getFullYear(), dateA.getMonth(), dateA.getDate(), dateA.getHours(), dateA.getMinutes(), dateA.getSeconds());
    var secondB = Date.UTC(dateB.getFullYear(), dateB.getMonth(), dateB.getDate(), dateB.getHours(), dateB.getMinutes(), dateB.getSeconds());
    elapsed = (secondB - secondA) / 1000;

    secondA = null;
    secondB = null;
    dateA = null;
    dateB = null;

    try {
        return (elapsed);
    }
    finally {
        elapsed = null;
    }
}

function timeformat(time) {
    var timeString;
    var hr = Math.floor(time / 3600);
    var min = Math.floor((time % 3600) / 60);
    var sec = (time % 3600 % 60) % 60;

    if (hr > 0) {
        timeString = hr.toString() + " hr " + min.toString() + " min " + sec.toString() + " sec";
    }
    else if (min > 0) {
        timeString = min.toString() + " min " + sec.toString() + " sec";
    }
    else {
        timeString = sec.toString() + " sec";
    }

    time = null;
    hr = null;
    min = null;
    sec = null;

    try {
        return (timeString);
    }
    finally {
        timeString = null;
    }
}

function timeFormatLong(time) {
    var timeString;

    if (time != -1) {
        var day = Math.floor(time / 86400);
        var hr = Math.floor((time % 86400) / 3600);
        var min = Math.floor((time % 3600) / 60);

        if (day > 0) {
            timeString = day.toString() + " day " + hr.toString() + " hr " + min.toString() + " min ago";
        }
        else if (hr > 0) {
            timeString = hr.toString() + " hr " + min.toString() + " min ago";
        }
        else if (min > 0) {
            timeString = min.toString() + " min ago";
        }

        day = null;
        hr = null;
        min = null;
    }
    else {
        timeString = null;
    }

    time = null;

    try {
        return (timeString);
    }
    finally {
        timeString = null;
    }
}
// ################################################################################################
//   General Function - End
// ################################################################################################
