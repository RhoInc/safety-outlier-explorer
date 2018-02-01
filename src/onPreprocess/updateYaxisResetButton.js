export default function updateYaxisResetButton() {
    //Update tooltip of y-axis domain reset button.
    if (this.currentMeasure !== this.previousMeasure)
        this.controls.wrap
            .selectAll('.y-axis')
            .property(
                'title',
                `Initial Limits: [${this.config.y.domain[0]} - ${this.config.y.domain[1]}]`
            );
}
