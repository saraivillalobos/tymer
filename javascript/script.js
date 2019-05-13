const domStrings = {
    skyTheme: 'sky',
    forestTheme: 'forest',
    riverTheme: 'river',
}

const domSelectors = {
    startButton: document.getElementById('start__button'),
    timerDisplay: document.querySelector('.timer__display'),
    customizeForm: document.querySelector('.customize__form'),
    timerIcon: document.querySelector('.timer__icon'),
    customizeIcon: document.querySelector('.customize__icon'),
    tipsIcon:document.querySelector('.tips__icon'),
    footerText: document.querySelectorAll('.footer__text'),
    creditsSelector: document.querySelector('.footer__text--p1'),    
    body: document.getElementById('body'),
    timerMins: document.getElementById('tmrminutes'),
    timerBreak: document.getElementById('tmrbreak'),
    timerHTML: document.querySelector('.timer__html'),
    sky: document.getElementById(domStrings.skyTheme),
    forest: document.getElementById(domStrings.forestTheme),
    river: document.getElementById(domStrings.riverTheme),
    popUpDiv: document.getElementById('body__blackscreen'),
    alertPopUp: document.getElementById('alertpopup'),
    alertSound: document.getElementById('alertsound'),
}

const init = () => {
    domSelectors.customizeForm.reset();
    domSelectors.sky.checked = true;
    domSelectors.timerHTML.innerHTML = `20:00`;
};

/*********************************************************** 
TIMER
***********************************************************/
const checkStatus = (status) => {
    status = domSelectors.startButton.innerHTML;
    status === `Start` ? checkTimer() : false;
};

const checkTimer = () => {
    let inputTime = domSelectors.timerMins.value;
    domSelectors.timerMins.value === '' ? startTimer(inputTime = (20 * 60)) : startTimer(inputTime * 60);
};

const checkBreakTime = (timerID, alertNotice) => {
    clearInterval(timerID); 
    inputTime = (domSelectors.timerBreak.value / 60);
    domSelectors.timerBreak.value === '' ? startTimer(inputTime = (1 * 60) / 2) : startTimer(inputTime * 60); 
    domSelectors.startButton.innerHTML = 'Break';
    styleOfBreak(alertNotice, inputTime);    
};

const startTimer = (inputTime) => {
    let timer = inputTime, minutes, seconds;
    startInterval(timer); 
    domSelectors.timerMins.disabled = true;
    domSelectors.timerBreak.disabled = true;
    domSelectors.startButton.innerHTML = 'Work';
};


const startInterval = (timer) => {
    let timerID;
    let alertNotice;
    const timeCalc = () => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        domSelectors.timerHTML.innerHTML = `${minutes}:${seconds}`;
        
        if (--timer < 0) {
            timer = inputTime;
        } else if (timer <= 0 &&  domSelectors.startButton.innerHTML === 'Work') {
            domSelectors.timerHTML.innerHTML = `00:00`;
            checkBreakTime(timerID, alertNotice = true); 
        }   else if (timer <= 0 && domSelectors.startButton.innerHTML === 'Break') {
            domSelectors.timerHTML.innerHTML = `00:00`;
            domSelectors.startButton.innerHTML = 'Work';
            clearInterval(timerID);            
            checkTimer();
        }      
    };
    return timerID = setInterval(timeCalc, 1000);
};

const styleOfBreak = (alertNotice) => {
    if (alertNotice && domSelectors.alertPopUp.checked === true && domSelectors.alertSound.checked === true) {
        popUpNotification();
        audioAlert();
    } else if (alertNotice && domSelectors.alertPopUp.checked === true)  {
        popUpNotification();
    } else if (alertNotice && domSelectors.alertSound.checked === true) {
       audioAlert();
    };
};

const audioAlert = () => {
    playSound();
};

const birdAlert = new Audio();

const playSound = () => {
    birdAlert.src = '/audio/sound-alert-sky.mp3';
    birdAlert.play();
};


const notificationPermissions = () => {
    debugger;
    if (!("Notification" in window)) {
        alert("This browser does not support system notifications");
    } else if (domSelectors.alertPopUp.checked === true) {
        Notification.requestPermission();
        Notification.permission = 'granted';
        let noticeOfNotification = new Notification("Hey there! You allowed notifications.");
    } else if (domSelectors.alertPopUp.checked === false) {
        Notification.permission = 'denied';
    };
};

const popUpNotification = () => {
    let breakNotification = new Notification("Take a break!");
};

const updateInputTime = () => {
    inputTime = domSelectors.timerMins.value;
    (inputTime < 10) ? domSelectors.timerHTML.innerHTML = `0${inputTime}:00` : domSelectors.timerHTML.innerHTML = `${inputTime}:00`;  
};


domSelectors.alertPopUp.addEventListener('click', notificationPermissions);

domSelectors.startButton.addEventListener('click', checkStatus);

domSelectors.timerMins.addEventListener('click', updateInputTime);

/*********************************************************** 
THEMES
***********************************************************/

//This  function checks which specific theme is chosen. Runs the changeTheme function and changeCredits function to display the correct colors, images and photograph.

const checkTheme = (theme) => {
    if (document.getElementById(theme).checked === true) {
        changeTheme(theme);
        changeCredits(theme);
    };
};

//Changes the themes color and photographs.

const changeTheme = (theme) => {

    const themeChanges = `var(--first-color-${theme})`;
    const themePicture = `url(../images/background-${theme}.jpg)`

    domSelectors.timerIcon.style.background = themeChanges;
    domSelectors.customizeIcon.style.background = themeChanges;
    domSelectors.tipsIcon.style.background = themeChanges;
    
    domSelectors.timerDisplay.style.backgroundImage = themePicture;
    domSelectors.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.70)), ${themePicture}`;

    domSelectors.footerText.forEach(el => {
        el.style.color = themeChanges;
    });
};

//Labels the correct credits with the appropriate theme photograph.

const changeCredits = (theme) => {
    const credits = `Photos provided by <a href="https://unsplash.com/" target="_blank">&nbsp;Unsplash.com</a>. Credits to `;
    
    if (theme === domStrings.forestTheme) {
        domSelectors.creditsSelector.innerHTML = `${credits} Timon Studler.`;
    } else if (theme === domStrings.riverTheme) {
        domSelectors.creditsSelector.innerHTML = `${credits} Ken Cheung.`;
    } else {
        domSelectors.creditsSelector.innerHTML = `${credits} Markos Mant.`;
    };
};

/*********************************************************** 
EVENT LISTENERS
***********************************************************/


domSelectors.sky.addEventListener('click', function() {
    checkTheme(domStrings.skyTheme);
});

domSelectors.forest.addEventListener('click', function() {
    checkTheme(domStrings.forestTheme);
});

domSelectors.river.addEventListener('click', function() {
    checkTheme(domStrings.riverTheme);
});

init();