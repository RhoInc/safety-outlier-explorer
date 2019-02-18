import clone from '../../../../../util/clone';
import { createControls } from 'webcharts';
import { createChart } from 'webcharts';

export default function defineSmallMultiples() {
    //Define small multiples settings.
    this.multiples.settings = Object.assign(
        {},
        clone(this.config),
        clone(Object.getPrototypeOf(this.config))
    );
    this.multiples.settings.x.domain = null;
    this.multiples.settings.y.domain = null;
    this.multiples.settings.resizable = false;
    this.multiples.settings.scale_text = false;

    if (this.multiples.settings.multiples_sizing.width)
        this.multiples.settings.width = this.multiples.settings.multiples_sizing.width;
    if (this.multiples.settings.multiples_sizing.height)
        this.multiples.settings.height =
            this.multiples.settings.multiples_sizing.height +
            (this.multiples.settings.margin.bottom ? this.multiples.settings.margin.bottom : 0);

    this.multiples.settings.margin = { bottom: this.multiples.settings.margin.bottom || 20 };

    //Add participant dropdown.
    this.multiples.settings.selected_id = this.selected_id;
    this.multiples.controls = createControls(this.multiples.container.node(), {
        inputs: [
            {
                type: 'dropdown',
                label: 'All Measures for',
                option: 'selected_id',
                values: this.IDOrder.map(d => d.ID),
                require: true
            }
        ]
    });

    //Initialize small multiples.
    this.multiples.chart = createChart(
        this.multiples.container.node(),
        this.multiples.settings,
        this.multiples.controls
    );
    this.multiples.chart.safetyOutlierExplorer = this;
}
