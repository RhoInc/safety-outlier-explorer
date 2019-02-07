import { set } from 'd3';

export default function removeUnscheduledVisits() {
    if (!this.config.unscheduled_visits) {
        if (this.config.unscheduled_visit_values)
            this.config.x.domain = this.config.x.domain.filter(
                visit => this.config.unscheduled_visit_values.indexOf(visit) < 0
            );
        else if (this.config.unscheduled_visit_regex)
            this.config.x.domain = this.config.x.domain.filter(
                visit => !this.config.unscheduled_visit_regex.test(visit)
            );
    }
}
