let UserActivity = function (newConfig) {
  let countDownTimer; // countdown timer (setInterval)
  let inactiveSessionTimer; // user session (setTimeout)
  // const WARNING_TIMEOUT = 720000 // (12 minutes)
  // const MAX_TIMEOUT = 900000 // (15 minutues)
  let isActive = true;

  // configuration object used to initialise
  // user activity monitor
  const defaultConfig = {
    WARNING_TIMEOUT: 180000,
    MAX_TIMEOUT: 4000,
    WARNING_CALLBACK: () => {},
    MAX_TIMEOUT_CALLBACK: () => {},
  };

  let config = { ...defaultConfig, ...newConfig };

  // initialise user activity detection
  resetTimer();

  let activityEventsList = [
    "mousedown",
    "mousemove",
    "keypress",
    "scroll",
    "touchstart",
  ];

  // override default event list with event list from
  // configuration if provided
  if (newConfig.hasOwnProperty("activityEventsList")) {
    activityEventsList = newConfig.activityEventsList;
  }

  activityEventsList.forEach(function (name) {
    document.addEventListener(name, resetTimer, true);
  });

  /**
   * resets user activity and session timers
   * after user interaction is detected
   * @return {undefined} - no return value defined
   */
  function resetTimer() {
    isActive = true;
    clearTimeout(countDownTimer);
    clearTimeout(inactiveSessionTimer);
    inactiveSessionTimer = window.setTimeout(function () {
      startCountDownTimer(config.WARNING_TIMEOUT / 1000);
    }, config.WARNING_TIMEOUT);
    console.log("resetTimer ", isActive);
  }

  /**
   * public method for user activity status
   * @return {boolean} - returns true if user activity is detected
   */
  function isUserActive() {
    return isActive;
  }

  /**
   * Start count down timer, usining an initial duration
   * formats and publishes a countdown in minutes and seconds
   * @param {number} duration - duration in milliseconds
   * @return {undefined} - no return value defined
   */
  function startCountDownTimer(duration) {
    console.log("duraction ", duration);
    let timer = duration,
      minutes,
      seconds;

    countDownTimer = window.setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      // generate custom event containing
      // countdown for subscribers to
      // implement their own renderer
      // allows for integration with
      // VanillaJS, Vue, React, Angular and Svelte
      publishEvent("USER_ACTIVITY_WARNING", {
        minutes: minutes,
        seconds: seconds,
      });

      if (minutes === 0 && seconds === 0) {
        window.clearTimeout(countDownTimer);
        publishEvent("USER_ACTIVITY_TIMEOUT", null);
      }

      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  }

  /**
   * Event publish, dispatches a Custom Event so that
   * subscribers can render a countdown of minutes and seconds
   * @param {string} eventName - event name
   * @param {object} timeRemaining - object containing minutes and seconds remaining
   * @return {undefined} - no return value defined
   */
  function publishEvent(eventName, timeRemaining) {
    let timeStamp = new Date().toLocaleString();
    // let eventDetail = eventObj.detail;
    let syntheticEvent = new CustomEvent(eventName, {
      bubbles: true, // bubbling to allow an event from a child element, to support an ancestor catching it (optionally, with data)
      detail: {
        eventName,
        eventSource: eventName,
        timeStamp,
        timeRemaining: timeRemaining, // in milliseconds
      },
    });

    // publish global event
    window.dispatchEvent(syntheticEvent);
  }

  console.log("config.WARNING_TIMEOUT  ", config.WARNING_TIMEOUT);

  return {
    isUserActive: isUserActive,
  };
};

/* event subscription examples */

/*
  window.addEventListener('USER_ACTIVITY_WARNING', (e) => {
    console.log("data e.detail.timeRemaining", e.detail.timeRemaining);
  });

  window.addEventListener('USER_ACTIVITY_TIMEOUT', (e) => {
    console.log("ACTIVITY_TIMEOUT");
    console.log("data e.detail", e.detail);
  });
*/

export default UserActivity;
