import { set } from 'd3';
import { getValType } from './util/getValType';

export default function onInit() {
    const context = this,
        config = this.config,
        allMeasures = set(this.raw_data.map(m => m[config.measure_col])).values();

    //warning for non-numeric endpoints
    var catMeasures = allMeasures.filter(f => {
        var measureVals = this.raw_data.filter(d => d[config.measure_col] === f);

        return getValType(measureVals, config.value_col) !== 'continuous';
    });
    if (catMeasures.length) {
        console.warn(
            `${catMeasures.length}${''} non-numeric endpoint${
                catMeasures.length > 1 ? 's have' : ' has'
            }${''} been removed:${catMeasures.join(', ')}`
        );
    }

    //delete non-numeric endpoints
    var numMeasures = allMeasures.filter(f => {
        var measureVals = this.raw_data.filter(d => d[config.measure_col] === f);

        return getValType(measureVals, config.value_col) === 'continuous';
    });

    this.controls.config.inputs.filter(f => f.value_col === config.measure_col)[0].start =
        config.start_value || numMeasures[0];

    //count the number of unique ids in the data set
    this.populationCount = set(this.raw_data.map(d => d[this.config.id_col])).values().length;
    this.raw_data = this.raw_data.filter(f => numMeasures.indexOf(f[config.measure_col]) > -1);

    // Remove filters for variables with 0 or 1 levels
    var chart = this;

    this.controls.config.inputs = this.controls.config.inputs.filter(function(d) {
        if (d.type != 'subsetter') {
            return true;
        } else {
            var levels = set(chart.raw_data.map(f => f[d.value_col])).values();
            if (levels.length < 2) {
                console.warn(
                    d.value_col + ' filter not shown since the variable has less than 2 levels'
                );
            }
            return levels.length >= 2;
        }
    });
}
