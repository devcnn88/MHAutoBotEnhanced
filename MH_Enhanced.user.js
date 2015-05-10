// ==UserScript==
// @name        MouseHunt AutoBot Enhanced Edition
// @author      Ooi Keng Siang, CnN
// @version    	1.28.18
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
// ==/UserScript==

// == Basic User Preference Setting (Begin) ==
// // The variable in this section contain basic option will normally edit by most user to suit their own preference
// // Reload MouseHunt page manually if edit this script while running it for immediate effect.

// // Extra delay time before sounding the horn. (in seconds)
// // Default: 5 - 180
var hornTimeDelayMin = 10;
var hornTimeDelayMax = 30;

// // Bot aggressively by ignore all safety measure such as check horn image visible before sounding it. (true/false)
// // Note: Highly recommended to turn off because it increase the chances of getting caugh in botting.
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

// // Reload the the page according to kingPauseTimeMax when encounter King Reward. (true/false)
// // Note: No matter how many time you refresh, the King's Reward won't go away unless you resolve it manually.
var reloadKingReward = false;

// // Duration of pausing the script before reload the King's Reward page (in seconds)
// // Note: It only take effect if reloadKingReward = true;
var kingPauseTimeMax = 3600;

// // The script will pause if player at different location that hunt location set before. (true/false)
// // Note: Make sure you set showTimerInPage to true in order to know what is happening.
var pauseAtInvalidLocation = false;

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

// // Best weapon/base pre-determined by user. Edit ur best weapon/trap in ascending order. e.g. [best, better, good]
var bestPhysical = ['Chrome MonstroBot', 'Sandstorm MonstroBot', 'Sandtail Sentinel'];
var bestTactical = ['Sphynx Wrath'];
var bestHydro = ['School of Sharks', 'Rune Shark Trap', 'Chrome Phantasmic Oasis Trap', 'Phantasmic Oasis Trap', 'Oasis Water Node Trap'];
var bestArcane = ['Grand Arcanum Trap', 'Arcane Blast Trap', 'Arcane Capturing Rod Of Nev'];
var bestShadow = ['Clockwork Portal Trap', 'Reaper\'s Perch', 'Clockapult of Time', 'Clockapult of Winter Past'];
var bestForgotten = ['Tarannosaurus Rex Trap', 'The Forgotten Art of Dance'];
var bestDraconic = ['Dragon Lance', 'Ice Maiden'];
var bestRiftLuck = ['Multi-Crystal Laser', 'Crystal Tower'];
var bestRiftPower = ['Focused Crystal Laser', 'Crystal Tower'];
var bestPowerBase = ['Golden Tournament Base', 'Spellbook Base'];
var bestLuckBase = ['Rift Base', 'Horse Jade Base'];
var bestAttBasae = ['Birthday Drag', 'Cheesecake Base'];
var bestSalt = ['Super Salt', 'Grub Salt'];
var wasteCharm = ['Tarnished', 'Wealth'];
var redSpongeCharm = ['Red Double', 'Red Sponge'];
var yellowSpongeCharm = ['Yellow Double', 'Yellow Sponge'];
var spongeCharm = ['Double Sponge', 'Sponge'];
var chargeCharm = ['Eggstra Charge', 'Eggscavator'];

// == Advance User Preference Setting (End) ==





// WARNING - Do not modify the code below unless you know how to read and write the script.

// All global variable declaration and default value
var scriptVersion = "1.28.18 Enhanced Edition";
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
var kingPauseTime;
var baitQuantity = -1;
var huntLocation;
var currentLocation;
var today = new Date();
var checkTime;// = (today.getMinutes() >= trapCheckTimeDiff) ? 3600 + (trapCheckTimeDiff * 60) - (today.getMinutes() * 60 + today.getSeconds()) : (trapCheckTimeDiff * 60) - (today.getMinutes() * 60 + today.getSeconds());
// today = undefined;
var hornRetryMax = 10;
var hornRetry = 0;
var nextActiveTime = 900;
var timerInterval = 2;
var checkMouseResult = null;
var mouseList = [];
var eventLocation;
var arming = false;
var best = 0;
var maxSaltCharged = 24;

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

// start executing script
// var test = (window.top != window.self);
// var browser = browserDetection();
// if (browser == 'firefox') {
	// console.debug(test);
	// if (test) {
		// return;
	// }
// }
//window.addEventListener("load", exeScript, false);
exeScript();

function exeScript() {
	console.debug("exeScript() Start");
    // check the trap check setting first
	browser = browserDetection();
	trapCheckTimeDiff = GetTrapCheckTime();
	// try {
		// var passiveElement = document.getElementsByClassName('passive');
		// if (passiveElement.length > 0) {
			// var time = passiveElement[0].textContent;			
			// time = time.substr(time.indexOf('m -') - 4, 2);				
			// trapCheckTimeDiff = parseInt(time);				
			// setStorage("TrapCheckTimeOffset", time);			
		// }
		// else throw 'passiveElement not found'
	// }
	// catch (e) {
		// console.debug(e);
		// var tempStorage = getStorage('TrapCheckTimeOffset');
		// if (tempStorage == null) {
		    // tempStorage = 00;		    
			// setStorage("TrapCheckTimeOffset", tempStorage);
		// }
		// trapCheckTimeDiff = 00;
	// }    
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
		case 'Halloween 2014':
			Halloween2014(); break;	 
		case 'All LG Area':
			general(); break;
		case 'Sunken City':
			SunkenCity(); break;
        default:
            break;
    }
}

function Halloween2014()
{
	var currentLocation = getPageVariable("user.location");
	console.debug(currentLocation);
	if (currentLocation.indexOf("Haunted Terrortories") > -1)
	{
		var areaName = document.getElementsByClassName('halloween2014Hud-areaDetails-name')[0].innerHTML;
		var warning = document.getElementsByClassName('halloween2014Hud-areaDetails-warning active').length;
		var isWarning = (warning > 0) ? true : false;
		console.debug('Current Area Name: ' + areaName + " Warning: " + isWarning);
		if (isWarning)
		{
			var trickContainer = document.getElementsByClassName('halloween2014Hud-bait trick_cheese clear-block')[0];
			var treatContainer = document.getElementsByClassName('halloween2014Hud-bait treat_cheese clear-block')[0];
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

function general() {
    var location = getPageVariable('user.location');
    console.debug('Current Location: ' + location);
    switch (location)
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

function SunkenCity() {
	var zone = document.getElementsByClassName('zoneName')[0].innerText;
	console.debug('Current Zone: ' + zone);
	switch (zone)
	{
		case 'Sand Dollar Sea Bar':
		case 'Pearl Patch':
		case 'Sunken Treasure':
		case 'Monster Trench':
		case 'Lair of the Ancients':
		case 'Deep Oxygen Stream':
		case 'Oxygen Stream':
		case 'Magma Flow':
			checkThenArm(null, 'trinket', 'Empowered Anchor' );
			checkThenArm(null, 'bait', 'SUPER');
			break;
		case 'Sunken City':
			checkThenArm(null, 'bait', 'Fishy Fromage');
			break;
		default:			
			checkThenArm('best', 'trinket', wasteCharm);
			checkThenArm(null, 'bait', 'Gouda');
			break;
	}
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
		{
			checkThenArm(null, 'trinket', 'Sponge');
		}
        else
        {
            checkThenArm('best', 'trinket', spongeCharm);
        }
    }
    else
    {
        // Pouring
		console.debug('Pouring...');
        if (getPageVariable('user.trinket_name').indexOf('Sponge') > -1)
        {
            disarmTrap('trinket');
        }
    }    
    return;
}

function lostCity() {
	var isCursed = (document.getElementsByClassName('stateBlessed hidden').length > 0);
    console.debug('Cursed = ' + isCursed);
    
	//disarm searcher charm when cursed is lifted    
    if (!isCursed) {
        if (getPageVariable('user.trinket_name').indexOf('Searcher') > -1) {
            disarmTrap('trinket');
        }
    }
    else {
        checkThenArm(null, 'trinket', 'Searcher');
    }
	checkThenArm('best', 'weapon', bestArcane);
    return;
}

function sandDunes() {
    var hasStampede = getPageVariable('user.quests.QuestSandDunes.minigame.has_stampede');
    console.debug('Has Stampede = ' + hasStampede);

    //disarm grubling chow charm when there is no stampede
    if (hasStampede == 'false')
    {
        if (getPageVariable('user.trinket_name').indexOf('Chow') > -1) {
            disarmTrap('trinket');
        }
    }
    else {
        checkThenArm(null, 'trinket', 'Grubling Chow');
    }
	checkThenArm('best', 'weapon', bestShadow);
    return;
}

function twistedGarden() {
    var red = parseInt(document.getElementsByClassName('itemImage red')[0].innerText);
    var yellow = parseInt(document.getElementsByClassName('itemImage yellow')[0].innerText);
    var charmArmed = getPageVariable('user.trinket_name');
    console.debug('Red: ' + red + ' Yellow: ' + yellow);
    if (red < 10)
    {
        if (red <= 8) {
            checkThenArm('best', 'trinket', redSpongeCharm);
        }
        else {
            checkThenArm(null, 'trinket', 'Red Sponge');
        }
    }
    else if (red == 10 && yellow < 10)
    {
        if (yellow <=8) {
            checkThenArm('best', 'trinket', yellowSpongeCharm);
        }
        else {
            checkThenArm(null, 'trinket', 'Yellow Sponge');
        }
    }
    else {
        if (charmArmed.indexOf('Red') > -1 || charmArmed.indexOf('Yellow') > -1) {
            disarmTrap('trinket');
        }
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
        if (charmArmed.indexOf('Bravery') > -1 || charmArmed.indexOf('Shine') > -1 || charmArmed.indexOf('Clarity') > -1) {
            disarmTrap('trinket');
        }
        checkThenArm(null, "trinket", "Super Luck");
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
                return;
            }
        }
    }
	checkThenArm('best', 'weapon', bestArcane);
    return;
}

function sandCrypts() {
    var salt = parseInt(document.getElementsByClassName('salt_charms')[0].innerText);
    console.debug('Salted: ' + salt);
    if (salt >= maxSaltCharged) {        
        checkThenArm(null, 'trinket', 'Grub Scent');
    }
    else {
        checkThenArm('best', 'trinket', bestSalt);
    }
	checkThenArm('best', 'weapon', bestShadow);
    return;
}

function retrieveMouseList() {
    fireEvent(document.getElementById('effectiveness'), 'click');
    var sec = 5;
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
                    sec = 5;
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
    if (category == "charm") {
        category = "trinket";
    }

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
    var index;
    var sec = 5;
    var intervalCTATI = setInterval(
        function ()
        {
            if (armTrap(sort, name) == true)
            {
                clearInterval(intervalCTATI);
                arming = false;
                intervalCTATI = null;
                return;
            }
            else
            {
                --sec;
                if (sec <= 0)
                {
                    clickTrapSelector(trap);
                    sec = 5;
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

    if (sort == 'best')
    {
        var nameArray = name;
        name = name[0];
    }
    
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
                    return true;
                }
            }
        }
        console.debug(name + " not found");
        if (sort == 'best')
        {
            nameArray.shift();
            if (nameArray.length > 0)
            {
                return armTrap(sort, nameArray);
            }
            else
            {
                console.debug('No traps found');
                return false;
            }            
        }
    }
    return false;
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
			console.debug(GetHornTime());
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
					isKingReward = (hasPuzzleString == 'false') ? false : true;

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
	if (header != null && header.textContent.indexOf('reward') > -1) {
		return true;
	}
	else return false;
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
		if (tempLocation.length > 0) {
			return tempLocation[0].textContent;
		}
		else return "";
	}
	else {
		tempLocation = document.getElementById('hud_location');
		if (tempLocation != null) {
			return tempLocation.textContent;
		}
		else return "";
		
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
        notifyMe('King\'s Reward - ' + getPageVariable('user.username'), 'https://raw.githubusercontent.com/devcnn88/MHAutoBotEnhanced/master/mht48.png', 'King Reward');
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
            if (reloadKingReward) {
                preferenceHTMLStr += '<tr>';
                preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
                preferenceHTMLStr += '<a title="Reload the the page according to King Reward Resume Time when encount King Reward"><b>King Reward Resume</b></a>';
                preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '<td style="height:24px">';
                preferenceHTMLStr += '<input type="radio" id="KingRewardResumeInputTrue" name="KingRewardResumeInput" value="true" onchange="if (document.getElementById(\'KingRewardResumeInputTrue\').checked == true) { document.getElementById(\'KingRewardResumeTimeInput\').disabled=\'\'; }" checked="checked"/> True';
                preferenceHTMLStr += '   ';
                preferenceHTMLStr += '<input type="radio" id="KingRewardResumeInputFalse" name="KingRewardResumeInput" value="false" onchange="if (document.getElementById(\'KingRewardResumeInputFalse\').checked == true) { document.getElementById(\'KingRewardResumeTimeInput\').disabled=\'disabled\'; }"/> False';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '</tr>';
                preferenceHTMLStr += '<tr>';
                preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
                preferenceHTMLStr += '<a title="Duration of pausing the script before reload the King\'s Reward page (in seconds)"><b>King Reward Resume Time</b></a>';
                preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '<td style="height:24px">';
                preferenceHTMLStr += '<input type="text" id="KingRewardResumeTimeInput" name="KingRewardResumeTimeInput" value="' + kingPauseTimeMax.toString() + '"/> seconds';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '</tr>';
            }
            else {
                preferenceHTMLStr += '<tr>';
                preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
                preferenceHTMLStr += '<a title="Reload the the page according to King Reward Resume Time when encounter King Reward"><b>King Reward Resume</b></a>';
                preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '<td style="height:24px">';
                preferenceHTMLStr += '<input type="radio" id="KingRewardResumeInputTrue" name="KingRewardResumeInput" value="true" onchange="if (document.getElementById(\'KingRewardResumeInputTrue\').checked == true) { document.getElementById(\'KingRewardResumeTimeInput\').disabled=\'\'; }"/> True';
                preferenceHTMLStr += '   ';
                preferenceHTMLStr += '<input type="radio" id="KingRewardResumeInputFalse" name="KingRewardResumeInput" value="false" onchange="if (document.getElementById(\'KingRewardResumeInputFalse\').checked == true) { document.getElementById(\'KingRewardResumeTimeInput\').disabled=\'disabled\'; }" checked="checked"/> False';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '</tr>';
                preferenceHTMLStr += '<tr>';
                preferenceHTMLStr += '<td style="height:24px; text-align:right;">';
                preferenceHTMLStr += '<a title="Duration of pausing the script before reload the King\'s Reward page (in seconds)"><b>King Reward Resume Time</b></a>';
                preferenceHTMLStr += '&nbsp;&nbsp;:&nbsp;&nbsp;';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '<td style="height:24px">';
                preferenceHTMLStr += '<input type="text" id="KingRewardResumeTimeInput" name="KingRewardResumeTimeInput" disabled="disabled" value="' + kingPauseTimeMax.toString() + '"/> seconds';
                preferenceHTMLStr += '</td>';
                preferenceHTMLStr += '</tr>';
            }
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
			preferenceHTMLStr += '<option value="Halloween 2014">Halloween 2014</option>';
			preferenceHTMLStr += '<option value="Sunken City">Sunken City</option>';
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
				if (document.getElementById(\'KingRewardResumeInputTrue\').checked == true) { window.localStorage.setItem(\'KingRewardResume\', \'true\'); } else { window.localStorage.setItem(\'KingRewardResume\', \'false\'); }	\
				window.localStorage.setItem(\'KingRewardResumeTime\', document.getElementById(\'KingRewardResumeTimeInput\').value);	\
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
    var aggressiveModeTemp = getStorage("AggressiveMode");
    if (aggressiveModeTemp == undefined || aggressiveModeTemp == null) {
        setStorage("AggressiveMode", aggressiveMode.toString());
    }
    else if (aggressiveModeTemp == true || aggressiveModeTemp.toLowerCase() == "true") {
        aggressiveMode = true;
    }
    else {
        aggressiveMode = false;
    }
    aggressiveModeTemp = undefined;

    var hornTimeDelayMinTemp = getStorage("HornTimeDelayMin");
    var hornTimeDelayMaxTemp = getStorage("HornTimeDelayMax");
    if (hornTimeDelayMinTemp == undefined || hornTimeDelayMinTemp == null || hornTimeDelayMaxTemp == undefined || hornTimeDelayMaxTemp == null) {
        setStorage("HornTimeDelayMin", hornTimeDelayMin);
        setStorage("HornTimeDelayMax", hornTimeDelayMax);
    }
    else {
        hornTimeDelayMin = parseInt(hornTimeDelayMinTemp);
        hornTimeDelayMax = parseInt(hornTimeDelayMaxTemp);
    }
    hornTimeDelayMinTemp = undefined;
    hornTimeDelayMaxTemp = undefined;

    var trapCheckTemp = getStorage("TrapCheck");
    if (trapCheckTemp == undefined || trapCheckTemp == null) {
        setStorage("TrapCheck", enableTrapCheck.toString());
    }
    else if (trapCheckTemp == true || trapCheckTemp.toLowerCase() == "true") {
        enableTrapCheck = true;
    }
    else {
        enableTrapCheck = false;
    }
    trapCheckTemp = undefined;

    var trapCheckTimeDelayMinTemp = getStorage("TrapCheckTimeDelayMin");
    var trapCheckTimeDelayMaxTemp = getStorage("TrapCheckTimeDelayMax");
    if (trapCheckTimeDelayMinTemp == undefined || trapCheckTimeDelayMinTemp == null || trapCheckTimeDelayMaxTemp == undefined || trapCheckTimeDelayMaxTemp == null) {
        setStorage("TrapCheckTimeDelayMin", checkTimeDelayMin);
        setStorage("TrapCheckTimeDelayMax", checkTimeDelayMax);
    }
    else {
        checkTimeDelayMin = parseInt(trapCheckTimeDelayMinTemp);
        checkTimeDelayMax = parseInt(trapCheckTimeDelayMaxTemp);
    }
    trapCheckTimeDelayMinTemp = undefined;
    trapCheckTimeDelayMaxTemp = undefined;

    var playKingRewardSoundTemp = getStorage("PlayKingRewardSound");
    if (playKingRewardSoundTemp == undefined || playKingRewardSoundTemp == null) {
        setStorage("PlayKingRewardSound", isKingWarningSound.toString());
    }
    else if (playKingRewardSoundTemp == true || playKingRewardSoundTemp.toLowerCase() == "true") {
        isKingWarningSound = true;
    }
    else {
        isKingWarningSound = false;
    }
    playKingRewardSoundTemp = undefined;

    var kingRewardResumeTemp = getStorage("KingRewardResume");
    if (kingRewardResumeTemp == undefined || kingRewardResumeTemp == null) {
        setStorage("KingRewardResume", reloadKingReward.toString());
    }
    else if (kingRewardResumeTemp == true || kingRewardResumeTemp.toLowerCase() == "true") {
        reloadKingReward = true;
    }
    else {
        reloadKingReward = false;
    }
    kingRewardResumeTemp = undefined;

    var kingRewardResumeTimeTemp = getStorage("KingRewardResumeTime");
    if (kingRewardResumeTimeTemp == undefined || kingRewardResumeTimeTemp == null) {
        setStorage("KingRewardResumeTime", kingPauseTimeMax);
    }
    else {
        kingPauseTimeMax = parseInt(kingRewardResumeTimeTemp);
    }
    kingRewardResumeTimeTemp = undefined;

    var pauseLocationTemp = getStorage("PauseLocation");
    if (pauseLocationTemp == undefined || pauseLocationTemp == null) {
        setStorage("PauseLocation", pauseAtInvalidLocation.toString());
    }
    else if (pauseLocationTemp == true || pauseLocationTemp.toLowerCase() == "true") {
        pauseAtInvalidLocation = true;
    }
    else {
        pauseAtInvalidLocation = false;
    }
    pauseLocationTemp = undefined;

    var dischargeTemp = getStorage("discharge");
    if (dischargeTemp == undefined || dischargeTemp == null) {
        setStorage("discharge", true.toString());
    }
    else if (dischargeTemp == true || dischargeTemp.toLowerCase() == "true") {
        discharge = true;
    }
    else {
        discharge = false;
    }
    dischargeTemp = undefined;

    var eventTemp = getStorage('eventLocation');
    if (eventTemp == undefined || eventTemp == null) {
        setStorage('eventLocation', 'None');
        eventTemp = getStorage('eventLocation');
    }
    eventLocation = eventTemp;
    eventTemp = undefined;
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
//   Ad Function - Start
// ################################################################################################

function addGoogleAd() {
    // search for existing ad element and remove it
    var existingAutoBotAdElement = document.getElementById('autoBotAdDiv');
    if (existingAutoBotAdElement) {
        existingAutoBotAdElement.parentNode.removeChild(existingAutoBotAdElement);
        existingAutoBotAdElement = null;
    }

    // add a new ad element
    var headerElement;
    if (fbPlatform || hiFivePlatform || mhPlatform) {
        headerElement = document.getElementById('noscript');
    }
    else if (mhMobilePlatform) {
        headerElement = document.getElementById('mobileHorn');
    }

    if (headerElement) {
        var autoBotAdDivElement = document.createElement('div');
        autoBotAdDivElement.setAttribute('id', 'autoBotAdDiv');
        autoBotAdDivElement.innerHTML = '<script type="text/javascript"><!-- \
			google_ad_client = "ca-pub-0646444153861496"; \
			google_ad_slot = "5069542056"; \
			google_ad_width = 728;google_ad_height = 90; \
			//--> \
			</script> \
			<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>';

        headerElement.parentNode.insertBefore(autoBotAdDivElement, headerElement);
        timerDivElement = null;
    }
}

// ################################################################################################
//   Ad Function - End
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
	
    /* if (hornButtonLink.length > 0) {
        hornButtonLink = hornButtonLink[0].firstChild;
    }
    else {
        strHornButton = 'mousehuntHud-huntersHorn-container';
        strCampButton = 'camp active';
        hornButtonLink = document.getElementsByClassName(strHornButton)[0].firstChild;
    } */
    
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
    nowDate = null;

    if (kingPauseTimeMax <= 0) {
        kingPauseTimeMax = 1;
    }

    kingPauseTime = kingPauseTimeMax;
    kingRewardCountdownTimer();
}

function playKingRewardSound() {
	console.debug('isKingWarningSound: ' + isKingWarningSound);
    if (isKingWarningSound) {
		unsafeWindow.hornAudio = new Audio('https://raw.githubusercontent.com/devcnn88/MHAutoBotEnhanced/master/resources/Girtab.mp3');
		hornAudio.loop = true;
        hornAudio.play();        
    }
}

function kingRewardCountdownTimer() {
    var dateNow = new Date();
    var intervalTime = timeElapsed(lastDateRecorded, dateNow);
    lastDateRecorded = null;
    lastDateRecorded = dateNow;
    dateNow = null;

    if (reloadKingReward) {
        kingPauseTime -= intervalTime;
    }

    if (lastKingRewardSumTime != -1) {
        lastKingRewardSumTime += intervalTime;
    }

    intervalTime = null;

    if (kingPauseTime <= 0) {
        // update timer
        displayTimer("King's Reward - Reloading...", "Reloading...", "Reloading...");

        // simulate mouse click on the camp button
        var campElement = document.getElementsByClassName(strCampButton)[0].firstChild;
        fireEvent(campElement, 'click');
        campElement = null;

        // reload the page if click on the camp button fail
        window.setTimeout(function () { reloadWithMessage("Fail to click on camp button. Reloading...", false); }, 5000);
    }
    else {
        if (reloadKingReward) {
            // update timer
            displayTimer("King's Reward - Reload in " + timeformat(kingPauseTime),
				"Reloading in " + timeformat(kingPauseTime),
				"Reloading in " + timeformat(kingPauseTime));
        }

        // set king reward sum time
        displayKingRewardSumTime(timeFormatLong(lastKingRewardSumTime));

        if (!checkResumeButton()) {
            window.setTimeout(function () { (kingRewardCountdownTimer)() }, timerRefreshInterval * 1000);
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
