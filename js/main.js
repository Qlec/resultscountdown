'use strict';

const MS_IN_DAY = 1000 * 60 * 60 * 24;
const MS_IN_HOUR = 1000 * 60 * 60;
const MS_IN_MINUTE = 1000 * 60;
const MS_IN_SECOND = 1000;

// Count down to April 12, 2024 6:00 PM
const timeToCountTo = new Date(2024, 3, 12, 18);

function updateCountdownDisplay() {
    // Define date object and find difference in ms between now and the date
    const currentTime = new Date();
    const msUntilDateReached = timeToCountTo - currentTime;

    // If the date has been reached, display a message and return
    if (msUntilDateReached <= 0) {
        document.querySelector('#countdown-display').innerText 
            = 'Results are out now!';
        return;
    }

    // Number of days, hours, etc. until the date is reached
    const countdown = {
        days: 
            Math.floor(msUntilDateReached / MS_IN_DAY),
        hours: 
            Math.floor((msUntilDateReached % MS_IN_DAY) / MS_IN_HOUR),
        minutes: 
            Math.floor((msUntilDateReached % MS_IN_HOUR) / MS_IN_MINUTE),
        seconds: 
            Math.floor((msUntilDateReached % MS_IN_MINUTE) / MS_IN_SECOND),
        // milliseconds: msUntilDateReached % MS_IN_SECOND,
    };

    // Each item is a unit of time, e.g. "5 days", "2 hours", etc.
    const itemsToOutput = [];
    for (const unit in countdown) {
        let textToOutput = '';

        textToOutput += countdown[unit];
        textToOutput += ' ';
        // If it's 1 hour, 1 day, etc., don't use the plural form.
        // Milliseconds is fine though so as to not cause weird flashing.
        if (countdown[unit] === 1 && unit !== 'milliseconds') {
            textToOutput += unit.slice(0, -1);
        } else {
            textToOutput += unit;
        }

        itemsToOutput.push(textToOutput);
    }

    // Joins the items with commas and adds a period at the end
    // Adds this string to the countdown display
    document.querySelector('#countdown-display').innerText 
        = itemsToOutput.join(', ') + '.';

    // Request the next frame
    window.requestAnimationFrame(updateCountdownDisplay);
}

// Start constantly updating the countdown display
window.requestAnimationFrame(updateCountdownDisplay);
