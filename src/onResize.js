import maintainHighlight from './onResize/maintainHighlight';
import drawNormalRange from './onResize/drawNormalRange';
import orderPoints from './onResize/orderPoints';
import addEventListeners from './onResize/addEventListeners';
import addBoxPlot from './onResize/addBoxPlot';
import adjustTicks from './onResize/adjustTicks';

export default function onResize() {
    //Maintain mark highlighting.
    maintainHighlight.call(this);

    //Draw normal range.
    drawNormalRange.call(this);

    //Add initial ordering to points; ordering will update as points are clicked.
    orderPoints.call(this);

    //Add event listeners to lines, points, and overlay.
    addEventListeners.call(this);

    //Draw a marginal box plot.
    addBoxPlot.call(this);

    //Rotate tick marks to prevent text overlap.
    adjustTicks.call(this);
}
