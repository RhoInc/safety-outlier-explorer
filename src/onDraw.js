import updateParticipantCount from './onDraw/updateParticipantCount';
import resetChart from './onDraw/resetChart';

export default function onDraw() {
    //Annotate participant count.
    updateParticipantCount(this, '#participant-count');

    //Clear current multiples.
    resetChart.call(this);
}
