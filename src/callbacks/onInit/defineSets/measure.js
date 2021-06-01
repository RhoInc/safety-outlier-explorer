import { dataOps } from 'webcharts';

export default function measure() {
    // Define set of measure values as they appear in the data.
    this.measures = this.initial_data[0].hasOwnProperty(this.config.measure_order_col)
        ? [...new Set(this.initial_data.map(d => +d[this.config.measure_order_col])).values()]
              .sort((a, b) => a - b)
              .map(
                  value =>
                      this.initial_data.find(d => +d[this.config.measure_order_col] === value)[
                          this.config.measure_col
                      ]
              )
        : [...new Set(this.initial_data.map(d => d[this.config.measure_col])).values()].sort(
              dataOps.naturalSorter
          );

    // Define set of measure values with units (in ADaM units are already attached; in SDTM units are captured in a separate variable).
    this.soe_measures = this.initial_data[0].hasOwnProperty(this.config.measure_order_col)
        ? [...new Set(this.initial_data.map(d => +d[this.config.measure_order_col])).values()]
              .sort((a, b) => a - b)
              .map(
                  value =>
                      this.initial_data.find(d => +d[this.config.measure_order_col] === value)
                          .soe_measure
              ) // sort measures by measure order
        : [...new Set(this.initial_data.map(d => d.soe_measure)).values()].sort(
              dataOps.naturalSorter
          ); // sort measures alphabetically
}
