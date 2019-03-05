import participant from './defineSets/participant';
import visit from './defineSets/visit';
import measure from './defineSets/measure';

export default function defineSets() {
    participant.call(this);
    visit.call(this);
    measure.call(this);
}
