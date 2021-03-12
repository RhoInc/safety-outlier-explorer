import { select } from 'd3';

export default function customizeGroupByControl() {
    const context = this;

    const groupControl = this.controls.wrap.selectAll('.control-group.dropdown.group-by');
    if (groupControl.datum().values.length === 1) groupControl.style('display', 'none');
    else
        groupControl
            .selectAll('select')
            .on('change', function(d) {
                const label = select(this)
                    .selectAll('option:checked')
                    .text();
                const value_col = context.config.groups.find(group => group.label === label)
                    .value_col;
                //context.config.marks[0].per[0] = value_col;
                context.config.color_by = value_col;
                context.config.legend.label = label;

                if (context.config.color_by !== 'soe_none') {
                    delete context.config.marks.find(mark => mark.type === 'line').attributes
                        .stroke;
                    delete context.config.marks.find(mark => mark.type === 'circle').attributes
                        .fill;
                    delete context.config.marks.find(mark => mark.type === 'circle').attributes
                        .stroke;
                } else {
                    Object.assign(
                        context.config.marks.find(mark => mark.type === 'line').attributes,
                        context.config.line_attributes
                    );
                    Object.assign(
                        context.config.marks.find(mark => mark.type === 'circle').attributes,
                        context.config.point_attributes
                    );
                }

                context.draw();
            })
            .selectAll('option')
            .property('selected', d => d === this.config.legend.label);
}
