import identifyControls from './onLayout/identifyControls';
import labelXaxisOptions from './onLayout/labelXaxisOptions';
import addYdomainResetButton from './onLayout/addYdomainResetButton';
import groupControls from './onLayout/groupControls';
import hideNormalRangeInputs from './onLayout/hideNormalRangeInputs';
import customizeGroupByControl from './onLayout/customizeGroupByControl';
import addParticipantCountContainer from './onLayout/addParticipantCountContainer';
import addRemovedRecordsContainer from './onLayout/addRemovedRecordsContainer';
import addBorderAboveChart from './onLayout/addBorderAboveChart';
import addSmallMultiplesContainer from './onLayout/addSmallMultiplesContainer';

export default function onLayout() {
    identifyControls.call(this); // Distinguish controls to insert y-axis reset button in the correct position.
    labelXaxisOptions.call(this);
    addYdomainResetButton.call(this);
    groupControls.call(this); // Group related controls visually.
    hideNormalRangeInputs.call(this); // Hide normal range input controls depending on the normal range method.
    customizeGroupByControl.call(this);
    addParticipantCountContainer.call(this);
    addRemovedRecordsContainer.call(this);
    addBorderAboveChart.call(this);
    addSmallMultiplesContainer.call(this);
}
