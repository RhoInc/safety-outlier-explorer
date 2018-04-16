import identifyControls from './onLayout/identifyControls';
import labelXaxisOptions from './onLayout/labelXaxisOptions';
import addYdomainResetButton from './onLayout/addYdomainResetButton';
import groupControls from './onLayout/groupControls';
import hideNormalRangeInputs from './onLayout/hideNormalRangeInputs';
import addParticipantCountContainer from './onLayout/addParticipantCountContainer';
import addSmallMultiplesContainer from './onLayout/addSmallMultiplesContainer';

export default function onLayout() {
    // Distinguish controls to insert y-axis reset button in the correct position.
    identifyControls.call(this);

    //Label x-axis options.
    labelXaxisOptions.call(this);

    //Add a button to reset the y-domain
    addYdomainResetButton.call(this);

    //Group related controls visually.
    groupControls.call(this);

    //Hide normal range input controls depending on the normal range method.
    hideNormalRangeInputs.call(this);

    //Add participant count container.
    addParticipantCountContainer.call(this);

    //Add container for small multiples.
    addSmallMultiplesContainer.call(this);
}
