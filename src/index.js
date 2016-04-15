import { createChart, createControls } from 'webcharts';
import {  controlInputs } from './default-settings'
import config from './default-settings';
import onInit from './onInit';
import onLayout from './onLayout';
import onDataTransform from './onDataTransform';
import onDraw from './onDraw';
import onResize from './onResize';
import './object-assign';

export default function outlierExplorer(element, settings){
	//merge user's settings with defaults
	const mergedSettings = Object.assign({}, config, settings);
	// nested objects must be copied explicitly
	mergedSettings.x = Object.assign({}, config.x, settings.x);
	mergedSettings.y = Object.assign({}, config.y, settings.y);
	mergedSettings.margin = Object.assign({}, config.margin, settings.margin);

	//create controls now
	const controls = createControls(element, {location: 'top', inputs: controlInputs});
	//create chart
	const chart = createChart(element, mergedSettings, controls);
	chart.on('init', onInit);
	chart.on('layout', onLayout);
	chart.on('datatransform', onDataTransform);
	chart.on('draw', onDraw);
	chart.on('resize', onResize);

	return chart;
}