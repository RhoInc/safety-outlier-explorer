import attachMarks from './onResize/attachMarks';
import maintainHighlight from './onResize/maintainHighlight';
import drawNormalRange from './onResize/drawNormalRange';
import addEventListeners from './onResize/addEventListeners';
import addBoxPlot from './onResize/addBoxPlot';
import adjustTicks from './onResize/adjustTicks';

export default function onResize() {
    //Attach mark groups to central chart object.
    attachMarks.call(this);

    //Maintain mark highlighting.
    maintainHighlight.call(this);

    //Draw normal range.
    drawNormalRange.call(this);

    //Add event listeners to lines, points, and overlay.
    addEventListeners.call(this);

    //Draw a marginal box plot.
    addBoxPlot.call(this);

    //Rotate tick marks to prevent text overlap.
    adjustTicks.call(this);
}
