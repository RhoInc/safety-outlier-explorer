import { createChart, createControls, createTable } from 'webcharts';
import { controlInputs, syncControlInputs, syncSettings } from './default-settings'
import config from './default-settings';
import onInit from './onInit';
import onLayout from './onLayout';
import onPreprocess from './onPreprocess';
import onDataTransform from './onDataTransform';
import onDraw from './onDraw';
import onResize from './onResize';
import './util/object-assign';

export default function safetyOutlierExplorer(element, settings){
	
	//merge user's settings with defaults
	let mergedSettings = Object.assign({}, config, settings);

	//keep settings in sync with the data mappings
	mergedSettings = syncSettings(mergedSettings);
	
	//keep control inputs in sync and create controls object (if needed)
	let syncedControlInputs = syncControlInputs(controlInputs, mergedSettings);
	let controls = createControls(element, {location: 'top', inputs: syncedControlInputs});
	
	//create chart
	let chart = createChart(element, mergedSettings, controls);
	chart.on('init', onInit);
	chart.on('layout', onLayout);
	chart.on('preprocess', onPreprocess);
	chart.on('datatransform', onDataTransform);
	chart.on('draw', onDraw);
	chart.on('resize', onResize);

	return chart;
}
