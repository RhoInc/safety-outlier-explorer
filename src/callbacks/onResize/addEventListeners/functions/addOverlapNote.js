import { select } from 'd3';
import clearSelected from './clearSelected';
import highlightSelected from './highlightSelected';
import smallMultiples from './smallMultiples';
import clearHovered from './clearHovered';
import highlightHovered from './highlightHovered';
import checkPointOverlap from './checkPointOverlap';

export default function addOverlapNote(d, chart) {
    function showID(d) {
        //click an overlapping ID to see details for that participant
        const participantDropdown = chart.multiples.controls.wrap
            .style('margin', 0)
            .selectAll('.control-group')
            .filter(d => d.option === 'selected_id')
            .select('select')
            .property('value', d);

        //participantDropdown.on("change")() // Can't quite get this to work, so copy/pasting for now ...

        var context = chart;
        chart.multiples.id = d;
        clearSelected.call(context);
        context.selected_id = context.multiples.id;
        highlightSelected.call(context);
        smallMultiples.call(context);

        //Trigger participantsSelected event
        context.participantsSelected = [context.selected_id];
        context.events.participantsSelected.data = context.participantsSelected;
        context.wrap.node().dispatchEvent(context.events.participantsSelected);
    }

    chart.wrap.select('div.overlapNote').remove();

    // check for overlapping points
    chart.overlap_ids = checkPointOverlap.call(this, d, chart);

    // If there are overlapping points, add a note in the details section.

    if (chart.overlap_ids.length) {
        const click_id = d.values.raw[0][chart.config.id_col];
        const overlap_div = chart.wrap
            .insert('div', 'div.multiples')
            .attr('class', 'overlapNote')
            .style('background-color', '#eee')
            .style('border', '1px solid #999')
            .style('padding', '0.5em')
            .style('border-radius', '0.2em')
            .style('margin', '0 0.1em');

        overlap_div
            .append('span')
            .html(
                '<strong>Note</strong>: ' +
                    chart.overlap_ids.length +
                    ` point${chart.overlap_ids.length === 1 ? '' : 's'} overlap${
                        chart.overlap_ids.length === 1 ? 's' : ''
                    } the clicked point for <span class="idLink">` +
                    click_id +
                    '</span>. Click an ID for details: '
            );
        overlap_div
            .select('span.idLink')
            .datum(click_id)
            .style('color', 'blue')
            .style('text-decoration', 'underline')
            .style('cursor', 'pointer')
            .on('click', showID)
            .on('mouseover', d => {
                clearHovered.call(chart);
                chart.hovered_id = d;
                if (chart.hovered_id !== chart.selected_id) highlightHovered.call(chart);
            })
            .on('mouseout', d => {
                clearHovered.call(chart);
            });
        const overlap_ul = overlap_div
            .append('ul')
            .style('list-style', 'none')
            .style('padding', '0')
            .style('display', 'inline-block');

        overlap_ul
            .selectAll('li')
            .data(chart.overlap_ids)
            .enter()
            .append('li')
            .style('display', 'inline-block')
            .style('padding-right', '.5em')
            .attr('class', 'idLink')
            .style('color', 'blue')
            .style('text-decoration', 'underline')
            .style('cursor', 'pointer')
            .text(d => d)
            .on('click', showID)
            .on('mouseover', d => {
                clearHovered.call(chart);
                chart.hovered_id = d;
                if (chart.hovered_id !== chart.selected_id) highlightHovered.call(chart);
            })
            .on('mouseout', d => {
                clearHovered.call(chart);
            });
    }
}
