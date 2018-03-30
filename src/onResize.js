import maintainHighlight from './onResize/maintainHighlight';
import drawNormalRange from './onResize/drawNormalRange';
import addEventListeners from './onResize/addEventListeners';
import addBoxPlot from './onResize/addBoxPlot';
import adjustTicks from './onResize/adjustTicks';

export default function onResize() {
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
