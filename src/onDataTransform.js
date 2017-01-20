export default function onDataTransform() {
  //Define y-axis label.
    this.config.y.label =
        this.filtered_data[0][this.config.measure_col] + ' level (' +
        this.filtered_data[0][this.config.unit_col] + ')';
}
