import updateMeasureFilter from './checkControls/updateMeasureFilter';
import removeFilters from './checkControls/removeFilters';
import updateNormalRangeControl from './checkControls/updateNormalRangeControl';

export default function checkControls() {
    updateMeasureFilter.call(this);
    removeFilters.call(this);
    updateNormalRangeControl.call(this);
}
