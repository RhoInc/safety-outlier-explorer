import { nest, sum } from 'd3';

export default function removeMissingResults() {
    //Split data into records with missing and nonmissing results.
    const missingResults = [];
    const nonMissingResults = [];
    this.raw_data.forEach(d => {
        if (/^\s*$/.test(d[this.config.value_col])) missingResults.push(d);
        else nonMissingResults.push(d);
    });

    //Nest missing and nonmissing results by participant.
    const participantsWithMissingResults = nest()
        .key(d => d[this.config.id_col])
        .rollup(d => d.length)
        .entries(missingResults);
    const participantsWithNonMissingResults = nest()
        .key(d => d[this.config.id_col])
        .rollup(d => d.length)
        .entries(nonMissingResults);

    //Identify placeholder records, i.e. participants with a single missing result.
    this.removedRecords.placeholderRecords = participantsWithMissingResults
        .filter(
            d =>
                participantsWithNonMissingResults.map(d => d.key).indexOf(d.key) < 0 &&
                d.values === 1
        )
        .map(d => d.key);
    if (this.removedRecords.placeholderRecords.length)
        console.log(
            `${this.removedRecords.placeholderRecords.length} participants without results have been detected.`
        );

    //Count the number of records with missing results.
    this.removedRecords.missing = sum(
        participantsWithMissingResults.filter(
            d => this.removedRecords.placeholderRecords.indexOf(d.key) < 0
        ),
        d => d.values
    );
    if (this.removedRecords.missing > 0)
        console.warn(
            `${this.removedRecords.missing} record${
                this.removedRecords.missing > 1
                    ? 's with a missing result have'
                    : ' with a missing result has'
            } been removed.`
        );

    //Update data.
    this.raw_data = nonMissingResults;
}
