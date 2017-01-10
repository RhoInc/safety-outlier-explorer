import { set } from 'd3';
import { dataOps } from 'webcharts';

export default function onInit(){
    const config = this.config;
    const allMeasures = set(this.raw_data.map(m => m[config.measure_col])).values();
    this.controls.config.inputs.filter(f => f.value_col === config.measure_col)[0].start = config.start_value || allMeasures[0];

    //warning for non-numeric endpoints
    var catMeasures = allMeasures
        .filter(f => {
            var measureVals = this.raw_data
                .filter(d => d[config.measure_col] === f);

            return dataOps.getValType(measureVals, config.value_col) !== "continuous";
        });
    if(catMeasures.length){
        console.warn(catMeasures.length + " non-numeric endpoints have been removed: "+catMeasures.join(", "))    
    }
    
    //delete non-numeric endpoints
    var numMeasures = allMeasures
        .filter(f => {
            var measureVals = this.raw_data
                .filter(d => d[config.measure_col] === f );

            return dataOps.getValType(measureVals, config.value_col) === "continuous";
        });

    this.super_raw_data = this.raw_data;
    this.raw_data = this.raw_data.filter(f => numMeasures.indexOf(f[config.measure_col]) > -1 );
};
