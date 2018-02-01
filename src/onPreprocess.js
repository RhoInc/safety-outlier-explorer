import getCurrentMeasure from './onPreprocess/getCurrentMeasure';
import defineMeasureData from './onPreprocess/defineMeasureData';
import setXdomain from './onPreprocess/setXdomain';
import setYdomain from './onPreprocess/setYdomain';
import updateYaxisLimitControls from './onPreprocess/updateYaxisLimitControls';
import setYaxisLabel from './onPreprocess/setYaxisLabel';
import updateYaxisResetButton from './onPreprocess/updateYaxisResetButton';

export default function onPreprocess() {
    // 1. Capture currently selected measure.
    getCurrentMeasure.call(this);

    // 2. Filter data on currently selected measure.
    defineMeasureData.call(this);

    // 3a Set x-domain given current visit settings.
    setXdomain.call(this);

    // 3b Set y-domain given currently selected measure.
    setYdomain.call(this);

    // 3c Set y-axis label to current measure.
    setYaxisLabel.call(this);

    // 4a Update y-axis reset button when measure changes.
    updateYaxisResetButton.call(this);

    // 4b Update y-axis limit controls to match y-axis domain.
    updateYaxisLimitControls.call(this);
}
