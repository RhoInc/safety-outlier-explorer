import countParticipants from './onInit/countParticipants';
import cleanData from './onInit/cleanData';
import addVariables from './onInit/addVariables';
import captureMeasures from './onInit/captureMeasures';
import defineVisitOrder from './onInit/defineVisitOrder';
import updateControlInputs from './onInit/updateControlInputs';
import checkFilters from './onInit/checkFilters';
import setInitialMeasure from './onInit/setInitialMeasure';

export default function onInit() {
    // 1. Count total participants prior to data cleaning.
    countParticipants.call(this);

    // 2. Drop missing values and remove measures with any non-numeric results.
    cleanData.call(this);

    // 3a Define additional variables.
    addVariables.call(this);

    // 3b Capture unique set of measures.
    captureMeasures.call(this);

    // 3c Define ordered x-axis domain with visit order variable.
    defineVisitOrder.call(this);

    // 3d Remove invalid control inputs.
    updateControlInputs.call(this);

    // 3e Remove filters for nonexistent or single-level variables.
    checkFilters.call(this);

    // 3f Choose the start value for the Test filter
    setInitialMeasure.call(this);
}
