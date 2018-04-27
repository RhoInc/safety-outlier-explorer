export default function updateControlInputs() {
    //If data do not have normal range variables update normal range method setting and options.
    if (
        Object.keys(this.raw_data[0]).indexOf(this.config.normal_col_low) < 0 ||
        Object.keys(this.raw_data[0]).indexOf(this.config.normal_col_high) < 0
    ) {
        if (this.config.normal_range_method === 'LLN-ULN')
            this.config.normal_range_method = 'Standard Deviation';
        this.controls.config.inputs
            .find(input => input.option === 'normal_range_method')
            .values.splice(1, 1);
    }
}
