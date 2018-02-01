import updateParticipantCount from './onDraw/updateParticipantCount';

export default function onDraw() {
    //Annotate participant count.
    updateParticipantCount(this, '#participant-count');
}
