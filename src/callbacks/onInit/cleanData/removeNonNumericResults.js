export default function removeNonNumericResults() {
    //Filter out non-numeric results.
    const numericResults = this.raw_data.filter(d => /^-?[0-9.]+$/.test(d[this.config.value_col]));
    this.removedRecords.nonNumeric = this.raw_data.length - numericResults.length;
    if (this.removedRecords.nonNumeric > 0)
        console.warn(
            `${this.removedRecords.nonNumeric} record${
                this.removedRecords.nonNumeric > 1
                    ? 's with a non-numeric result have'
                    : ' with a non-numeric result has'
            } been removed.`
        );

    //Update data.
    this.raw_data = numericResults;
}
