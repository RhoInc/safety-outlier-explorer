import clone from '../../../../util/clone';
import { createChart } from 'webcharts';

export default function defineSmallMultiples() {
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

    this.multiples = createChart(this.wrap.select('.multiples').node(), multiples_settings);
}
