import updateParticipantCount from './onDraw/updateParticipantCount';
import resetChart from './onDraw/resetChart';
import extendYDomain from './onDraw/extendYDomain';
import updateBottomMargin from './onDraw/updateBottomMargin';

export default function onDraw() {
    //Annotate participant count.
    updateParticipantCount.call(this);

    //Clear current multiples.
    resetChart.call(this);

    //Extend y-domain to avoid obscuring minimum and maximum points.
    extendYDomain.call(this);

    //Update bottom margin for tick label rotation.
    updateBottomMargin.call(this);
}
