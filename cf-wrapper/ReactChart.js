import React from 'react';
import { select } from 'd3';
import outlierExplorer from '../src/index';

export default class ReactOutlierExplorer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount(prevProps, prevState){
		if(this.props.data.length){
			//manually clear div and redraw
			select(`.chart-div.id-${this.props.id}`).selectAll('*').remove();
			let chart = outlierExplorer(`.chart-div.id-${this.props.id}`, this.props.settings).init(this.props.data);
		}
	}
	componentDidUpdate(prevProps, prevState){
		if(this.props.data.length){
			//manually clear div and redraw
			select(`.chart-div.id-${this.props.id}`).selectAll('*').remove();
			let chart = outlierExplorer(`.chart-div.id-${this.props.id}`, this.props.settings).init(this.props.data);
		}
	}
	render(){
		return (
			React.createElement('div', {
				key: this.props.id,
				className: `chart-div id-${this.props.id} ${!(this.props.data.length) ? 'loading' : ''}`,
				style: { minHeight: '1px', minWidth: '1px' }
			})
		);
	}
}

ReactOutlierExplorer.defaultProps = {data: [], controlInputs: [], id: 'id'}