import identifyControls from './onLayout/identifyControls';
import labelXaxisOptions from './onLayout/labelXaxisOptions';
import addYdomainResetButton from './onLayout/addYdomainResetButton';
import classYdomainControls from './onLayout/classYdomainControls';
import addParticipantCountContainer from './onLayout/addParticipantCountContainer';
import addSmallMultiplesContainer from './onLayout/addSmallMultiplesContainer';

export default function onLayout() {
    // Distinguish controls to insert y-axis reset button in the correct position.
    identifyControls.call(this);

    //Label x-axis options.
    labelXaxisOptions.call(this);

    //Add a button to reset the y-domain
    addYdomainResetButton.call(this);

    //Add .y-axis class to y-domain controls.
    classYdomainControls.call(this);

    //Add participant count container.
    addParticipantCountContainer.call(this);

    //Add container for small multiples.
    addSmallMultiplesContainer.call(this);
}
