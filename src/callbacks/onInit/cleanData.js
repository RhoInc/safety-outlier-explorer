import removeMissingResults from './cleanData/removeMissingResults';
import removeNonNumericResults from './cleanData/removeNonNumericResults';

export default function cleanData() {
    this.removedRecords = {
        placeholderParticipants: null, // defined in './cleanData/removeMissingResults
        missing: null, // defined in './cleanData/removeMissingResults
        nonNumeric: null, // defined in './cleanData/removeNonNumericResults
        container: null // defined in ../onLayout/addRemovedRecordsContainer
    };
    removeMissingResults.call(this);
    removeNonNumericResults.call(this);
    this.initial_data = this.raw_data;
}
