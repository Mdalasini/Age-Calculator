const form = document.getElementById('form')

form.addEventListener("submit", (e)=> {
    e.preventDefault()

    const formData = new FormData(form);

    const day = Number(formData.get('day'))
    const month = Number(formData.get('month'))
    const year = Number(formData.get('year')) 

    const birthDate = createDateObject(day, month, year)
    const age = calculateAge(birthDate)
    updateAgeDisplay(age)
})

/**
 * Creates a Date object from the given day, month, and year.
 *
 * @param {number} day Day of the month (1-31).
 * @param {number} month Month of the year (1-12).
 * @param {number} year Year.
 * @returns {Date} A Date object representing the specified date, or null if the date is invalid.
 */
function createDateObject(day, month, year) {
    // Validate date input
    if (
      !Number.isInteger(day) ||
      !Number.isInteger(month) ||
      !Number.isInteger(year) ||
      day < 1 ||
      day > 31 ||
      month < 1 ||
      month > 12
    ) {
      return null; // Return null for invalid input
    }
  
    // Create the Date object (month is 0-indexed)
    const date = new Date(year, month - 1, day);
  
    // Check if the created Date object is valid (handles cases like February 30th)
    if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
      return null; // Return null for invalid date
    }
  
    return date;
}


/**
 * Calculates the exact age in years, months, and days.
 * 
 * @param {Date} dateOfBirth 
 * @returns {object} An object containing the age in years, months, and days
 */
function calculateAge(birthDate) {
    var today = new Date()

    // Calculate years
    var years;
    if (today.getMonth() > birthDate.getMonth() || (today.getMonth() == birthDate.getMonth() && today.getDate() >= birthDate.getDate())) {
        years = today.getFullYear() - birthDate.getFullYear();
    }else {
        years = today.getFullYear() - birthDate.getFullYear() - 1;
    }

    // Calculate months
    var months;
    if (today.getDate() >= birthDate.getDate()) {
        months = today.getMonth() - birthDate.getMonth();
    }else if (today.getDate() < birthDate.getDate()) {
        months = today.getMonth() - birthDate.getMonth() - 1;
    }
    // make month positive
    months = months < 0 ? months + 12 : months;

    // Calculate days
    var days;
    // days of months in a year
    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (today.getDate() >= birthDate.getDate()) {
        days = today.getDate() - birthDate.getDate();
    } else {
        days = today.getDate() - birthDate.getDate() + monthDays[birthDate.getMonth()];
    }

    return {
        years: Number(years),
        months: Number(months),
        days: Number(days),
    }
}

/**
 * Updates the innerText of elements with specified IDs based on the age object.
 *
 * @param {object} age An object containing age in years (years), months (months), and days (days).
 * @returns {void}
 */
function updateAgeDisplay(age) {
    // Check if age object is valid
    if (typeof age !== "object" || !age.hasOwnProperty("years") || !age.hasOwnProperty("months") || !age.hasOwnProperty("days")) {
      console.error("Invalid age object provided.");
      return;
    }
  
    // Get references to the elements
    const yearElement = document.getElementById("yearValue");
    const monthElement = document.getElementById("monthValue");
    const dayElement = document.getElementById("dayValue");
  
    // Check if elements exist
    if (!yearElement || !monthElement || !dayElement) {
      console.error("Elements with IDs 'yearValue', 'monthValue', and 'dayValue' not found.");
      return;
    }
  
    // Update innerText of elements
    var duration = 1
    // Year
    console.log(yearElement.innerText === '--')
    animateNumber(yearElement, yearElement.innerText, age.years, duration);

    // Month
    animateNumber(monthElement, monthElement.innerText, age.months, duration);

    // Day
    animateNumber(dayElement, dayElement.innerText, age.days, duration);
}

/**
 * Animates the transition of an element's inner text from a start number to a target number
 * with a slow start, ramp-up, and slow-down effect.
 *
 * @param {HTMLElement} element The HTML element whose inner text will be animated.
 * @param {number | string} startVal The starting value of the animation, either a number or "--" to be treated as zero.
 * @param {number} endVal The target value of the animation.
 * @param {number} duration The duration of the animation in seconds.
 * @returns {void}
 */
function animateNumber(element, startVal, endVal, duration) {
    if (typeof element !== "object" || !(element instanceof HTMLElement)) {
      throw new Error("Invalid element provided.");
    }
  
    if (typeof endVal !== "number") {
      throw new Error("End value must be a number.");
    }
  
    if (duration <= 0) {
      throw new Error("Duration must be a positive number.");
    }
  
    // Handle starting value as "--"
    let numbericStartVal;
    if (startVal === "--") {
      numbericStartVal = 0;
    } else {
        try {
            numbericStartVal = parseFloat(startVal)
        } catch (error) {
            throw new Error("Invalid start value. Must be a number or a string that can be converted to a number")
        }
    }
  
    const totalSteps = Math.floor(duration * 60); // 60 steps per second
    const incrementPerStep = (endVal - numbericStartVal) / totalSteps;
    let currentVal = numbericStartVal;
    let step = 0;
  
    const easingFunction = (t) => t * t * (3 - 2 * t); // Ease in and ease out easing function
  
    const intervalId = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      const easedProgress = easingFunction(progress);
      const newStepValue = Math.round(numbericStartVal + easedProgress * (endVal - numbericStartVal)); // Round to integer
  
      element.innerText = newStepValue;
  
      if (step === totalSteps) {
        clearInterval(intervalId);
      }
    }, 1000 / 60); // 60 FPS
}
  
  
  
  