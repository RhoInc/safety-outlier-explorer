export default function removeUnscheduledVists() {
    if (!this.config.unscheduled_visits)
        this.current_data.forEach(d => {
            d.values = d.values.filter(di => this.config.x.domain.indexOf(di.key) > -1);
        });
}
