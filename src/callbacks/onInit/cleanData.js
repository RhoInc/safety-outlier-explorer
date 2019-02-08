export default function cleanData() {
    //Remove missing and non-numeric data.
    const preclean = this.raw_data;
    const nPreclean = preclean.length;
    const nonMissing = this.raw_data.filter(d => !/^\s*$/.test(d[this.config.value_col]));
    const nNonMissing = nonMissing.length;
    const numeric = nonMissing.filter(d => /^-?[0-9.]+$/.test(d[this.config.value_col]));
    const nNumeric = numeric.length;

    this.nMissing = nPreclean - nNonMissing;
    console.log(this.nMissing);
    this.nNonNumeric = nNonMissing - nNumeric;
    console.log(this.nNonNumeric);
    const nRemoved = nMissing + nNonNumeric;

    //Warn user of removed records.
    if (this.nMissing > 0)
        console.warn(
            `${this.nMissing} missing result${
                this.nMissing > 1 ? 's have' : ' has'
            } been removed.`
        );
    if (this.nNonNumeric > 0)
        console.warn(
            `${this.nNonNumeric} non-numeric result${
                this.nNonNumeric > 1 ? 's have' : ' has'
            } been removed.`
        );
    this.initial_data = numeric;
    this.raw_data = numeric;
}
