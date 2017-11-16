export function updateYDomain(chart){
  var yMinSelect = chart.controls.wrap.selectAll('.control-group')
      .filter(f => f.option === 'y.domain[0]')
      .select('input')

  var yMaxSelect = chart.controls.wrap.selectAll('.control-group')
      .filter(f => f.option === 'y.domain[1]')
      .select('input')

  var range = [yMinSelect.node().value,yMaxSelect.node().value]
  chart.config.y.domain = range;
  chart.y_dom = range;
}
