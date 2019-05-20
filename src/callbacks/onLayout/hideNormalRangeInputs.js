import { select } from 'd3';

export default function hideNormalRangeInputs() {
    const context = this;
    const controls = this.controls.wrap.selectAll('.control-group');

    //Normal range method control
    const normalRangeMethodControl = controls.filter(d => d.label === 'Method');

    //Normal range inputs
    const normalRangeInputs = controls
        .filter(
            d =>
                [
                    'normal_range_sd',
                    'normal_range_quantile_low',
                    'normal_range_quantile_high'
                ].indexOf(d.option) > -1
        )
        .style('display', d =>
            (this.config.normal_range_method !== 'Standard Deviation' &&
                d.option === 'normal_range_sd') ||
            (this.config.normal_range_method !== 'Quantiles' &&
                ['normal_range_quantile_low', 'normal_range_quantile_high'].indexOf(d.option) > -1)
                ? 'none'
                : 'inline-table'
        );

    //Set significant digits to .01.
    normalRangeInputs.select('input').attr('step', 0.01);

    normalRangeMethodControl.on('change', function() {
        const normal_range_method = select(this)
            .select('option:checked')
            .text();

        normalRangeInputs.style('display', d =>
            (normal_range_method !== 'Standard Deviation' && d.option === 'normal_range_sd') ||
            (normal_range_method !== 'Quantiles' &&
                ['normal_range_quantile_low', 'normal_range_quantile_high'].indexOf(d.option) > -1)
                ? 'none'
                : 'inline-table'
        );
    });
}
