import updateParticipantCount from './onDraw/updateParticipantCount';
import clearSmallMultiples from './onDraw/clearSmallMultiples';

export default function onDraw() {
    //Annotate participant count.
    updateParticipantCount(this, '#participant-count');

    //Clear current multiples.
    clearSmallMultiples.call(this);
}
