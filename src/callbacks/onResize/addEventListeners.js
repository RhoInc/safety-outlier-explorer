import addOverlayEventListener from './addEventListeners/addOverlayEventListener';
import addNormalRangeEventListener from './addEventListeners/addNormalRangeEventListener';
import addLineEventListeners from './addEventListeners/addLineEventListeners';
import addPointEventListeners from './addEventListeners/addPointEventListeners';

export default function addEventListeners() {
    addOverlayEventListener.call(this);
    addNormalRangeEventListener.call(this);
    addLineEventListeners.call(this);
    addPointEventListeners.call(this);
}
