import clone from '../../../../util/clone';
import { createControls } from 'webcharts';
import { createChart } from 'webcharts';

export default function defineSmallMultiples() {
    //Define small multiples settings.
    const multiples_settings = Object.assign(
        {},
        clone(this.config),
        clone(Object.getPrototypeOf(this.config))
    );
    multiples_settings.x.domain = null;
    multiples_settings.y.domain = null;
    multiples_settings.resizable = false;
    multiples_settings.scale_text = false;

    if (multiples_settings.multiples_sizing.width)
        multiples_settings.width = multiples_settings.multiples_sizing.width;
    if (multiples_settings.multiples_sizing.height)
        multiples_settings.height =
            multiples_settings.multiples_sizing.height +
            (multiples_settings.margin.bottom ? multiples_settings.margin.bottom : 0);

    multiples_settings.margin = { bottom: multiples_settings.margin.bottom || 20 };

    //Add participant dropdown.
    multiples_settings.selected_id = this.selected_id;
    const participantDropdown = createControls(
        this.wrap.select('.multiples').node(),
        {
            inputs: [
                {
                    type: 'dropdown',
                    option: 'selected_id',
                    values: this.IDOrder.map(d => d.ID),
                    require: true,
                }
            ]
        },
    );

    //Initialize small multiples.
    this.multiples = createChart(
        this.wrap.select('.multiples').node(),
        multiples_settings,
        participantDropdown,
    );
}
