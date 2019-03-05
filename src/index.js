import './util/polyfills';
import './util/moveTo';
import configuration from './configuration/index';
import { createChart, createControls } from 'webcharts';
import callbacks from './callbacks/index';

export default function safetyOutlierExplorer(element, settings) {
    //Merge user settings with default settings.
    const mergedSettings = Object.assign({}, configuration.settings, settings);

    //Sync options within settings object, e.g. data mappings.
    const syncedSettings = configuration.syncSettings(mergedSettings);

    //Sync control inputs with with settings object.
    const syncedControlInputs = configuration.syncControlInputs(
        configuration.controlInputs(),
        syncedSettings
    );

    //Define controls.
    const controls = createControls(element, {
        location: 'top',
        inputs: syncedControlInputs
    });

    //Define chart.
    const chart = createChart(element, syncedSettings, controls);
    chart.config.marks.forEach(mark => {
        mark.attributes = mark.attributes || {};
        mark.attributes['clip-path'] = `url(#${chart.id})`;
    });

    //Attach callbacks to chart.
    for (const callback in callbacks)
        chart.on(callback.substring(2).toLowerCase(), callbacks[callback]);

    return chart;
}
