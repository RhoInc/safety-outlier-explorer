import addOverlayEventListener from './addEventListeners/addOverlayEventListener';
import addLineEventListeners from './addEventListeners/addLineEventListeners';
import addPointEventListeners from './addEventListeners/addPointEventListeners';

export default function addEventListeners() {
    addOverlayEventListener.call(this);
    addLineEventListeners.call(this);
    addPointEventListeners.call(this);
}
