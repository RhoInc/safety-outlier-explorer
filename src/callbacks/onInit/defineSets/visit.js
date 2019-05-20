import { set, ascending } from 'd3';

export default function visit() {
    //ordinal
    this.config.time_cols
        .filter(time_col => time_col.type === 'ordinal')
        .forEach(time_settings => {
            let visits, visitOrder;

            //Given an ordering variable sort a unique set of visits by the ordering variable.
            if (
                time_settings.order_col &&
                this.raw_data[0].hasOwnProperty(time_settings.order_col)
            ) {
                //Define a unique set of visits with visit order concatenated.
                visits = set(
                    this.raw_data.map(
                        d => `${d[time_settings.order_col]}|${d[time_settings.value_col]}`
                    )
                ).values();

                //Sort visits.
                visitOrder = visits
                    .sort((a, b) => {
                        const aOrder = a.split('|')[0],
                            bOrder = b.split('|')[0],
                            diff = +aOrder - +bOrder;
                        return diff ? diff : ascending(a, b);
                    })
                    .map(visit => visit.split('|')[1]);
            } else {
                //Otherwise sort a unique set of visits alphanumerically.
                //Define a unique set of visits.
                visits = set(this.raw_data.map(d => d[time_settings.value_col])).values();

                //Sort visits;
                visitOrder = visits.sort();
            }

            //Set x-axis domain.
            if (time_settings.order) {
                //If a visit order is specified, use it and concatenate any unspecified visits at the end.
                time_settings.order = time_settings.order.concat(
                    visitOrder.filter(visit => time_settings.order.indexOf(visit) < 0)
                );
            }
            //Otherwise use data-driven visit order.
            else time_settings.order = visitOrder;

            //Define domain.
            time_settings.domain = time_settings.order;
        });
}
