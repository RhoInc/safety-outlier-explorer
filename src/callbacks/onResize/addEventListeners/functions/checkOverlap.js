import { select } from 'd3';
import clearSelected from './clearSelected';
import highlightSelected from './highlightSelected';
import smallMultiples from './smallMultiples';
import clearHovered from './clearHovered';
import highlightHovered from './highlightHovered';

export default function checkOverlap(d, chart) {
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

    // Get the position of the clicked point
    const click_x = d3
        .select(this)
        .select('circle')
        .attr('cx');
    const click_y = d3
        .select(this)
        .select('circle')
        .attr('cy');
    const click_r = d3
        .select(this)
        .select('circle')
        .attr('r');
    const click_id = d.values.raw[0][chart.config.id_col];

    // See if any other points overlap
    chart.overlap_ids = chart.points
        .filter(function(f) {
            const point_id = f.values.raw[0][chart.config.id_col];
            const point_x = d3
                .select(this)
                .select('circle')
                .attr('cx');
            const point_y = d3
                .select(this)
                .select('circle')
                .attr('cy');
            const distance_x2 = Math.pow(click_x - point_x, 2);
            const distance_y2 = Math.pow(click_y - point_y, 2);
            const distance = Math.sqrt(distance_x2 + distance_y2);

            const max_distance = click_r * 2;
            const overlap = distance <= max_distance;
            const diff_id = point_id != click_id;
            return diff_id & overlap;
        })
        .data()
        .map(d => d.values.raw[0][chart.config.id_col]);

    // If there are overlapping points, add a note in the details section.
    if (chart.overlap_ids.length) {
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
