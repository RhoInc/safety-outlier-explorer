import countParticipants from './onInit/countParticipants';
import cleanData from './onInit/cleanData';
import addVariables from './onInit/addVariables';
import defineSets from './onInit/defineSets';
import checkControls from './onInit/checkControls';
import initCustomEvents from './onInit/initCustomEvents';

export default function onInit() {
    // 1. Count number of unique participant IDs in data prior to data cleaning.
    countParticipants.call(this);

    // 2. Remove missing and non-numeric results.
    cleanData.call(this);

    // 3. Define additional variables.
    addVariables.call(this);

    // 4. Define participant, visit, and measure sets.
    defineSets.call(this);

    // 5. Check controls.
    checkControls.call(this);

    // 6. Initialize custom events
    initCustomEvents.call(this);
}
