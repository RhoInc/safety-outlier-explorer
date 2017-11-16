export default function onPreprocess() {
  //Define x- and y-axis ranges based on currently selected measure.
    const config = this.config;
    const prevMeasure = this.currentMeasure
    this.currentMeasure = this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.value_col && d.value_col === config.measure_col)
        .select('option:checked')
        .text();
    const changedMeasureFlag = this.currentMeasure != prevMeasure

    const measure_data = this.raw_data
        .filter(d => d[config.measure_col] === this.currentMeasure);
    this.config.x.domain = (config.x.type === 'ordinal')
        ? d3.set   (measure_data.map(d =>  d[config.x.column ])).values()
        : d3.extent(measure_data,    d => +d[config.x.column ]);
    if(this.config.x.order){
      this.config.x.domain.sort(function(a,b){
        var aindex = config.x.order.indexOf(a)
        var bindex = config.x.order.indexOf(b)
        return aindex-bindex
      })
    }

    //set y domain based on range - and set initial values for axis controls
    if(changedMeasureFlag){
      this.config.y.domain = d3.extent(measure_data, d => +d[config.value_col]); //reset axis to full range when measure changes
    }

    this.controls.wrap.selectAll('.control-group')
      .filter(f => f.option === 'y.domain[0]')
      .select('input')
      .property("value",this.config.y.domain[0])

    this.controls.wrap.selectAll('.control-group')
      .filter(f => f.option === 'y.domain[1]')
      .select('input')
      .property("value",this.config.y.domain[1])
}
