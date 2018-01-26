import removeVisitsWithoutData from './setXdomain/removeVisitsWithoutData';
import removeUnscheduledVisits from './setXdomain/removeUnscheduledVisits';

export default function setXdomain() {
    this.config.x.domain = this.config.x.order;
    removeVisitsWithoutData.call(this);
    removeUnscheduledVisits.call(this);
}
