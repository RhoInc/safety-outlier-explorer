import updateParticipantCount from './onDraw/updateParticipantCount';
import resetChart from './onDraw/resetChart';
import updateBottomMargin from './onDraw/updateBottomMargin';

export default function onDraw() {
    //Annotate participant count.
    updateParticipantCount(this, '#participant-count');

    //Clear current multiples.
    resetChart.call(this);

    //Update bottom margin for tick label rotation.
    updateBottomMargin.call(this);
}
