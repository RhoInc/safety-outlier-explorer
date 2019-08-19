import checkPointOverlap from './checkPointOverlap';

export default function addOverlapTitle(d, chart) {
    // check for overlapping points
    var overlap = checkPointOverlap.call(this, d, chart);

    // If there are overlapping points, add a note in the details section.

    if (overlap.length > 0) {
        var titleEl = d3.select(this).select('title');
        var currentTitle = titleEl.text();
        var hasOverlapNote = currentTitle.search('overlapping'); //minor hack ...
        if (hasOverlapNote == -1) {
            var newTitle = currentTitle + '\nNumber of overlapping point(s) = ' + overlap.length;
            titleEl.text(newTitle);
        }
    }
}
