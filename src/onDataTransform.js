
export default function onDataTransform(){
	var config = this.config;
	var units = this.filtered_data[0][config.unit_col];
    var measure = this.filtered_data[0][config.measure_col];
    this.config.y.label = measure+" level ("+units+")";
    this.config.x.label = this.config.x.column;
}