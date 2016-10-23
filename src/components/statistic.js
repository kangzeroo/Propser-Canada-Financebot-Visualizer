import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'
import rd3 from 'rd3';

import { formatDataForChart } from '../api/content_manager'

class Statistic extends Component {

	constructor(){
		super()
		this.state = {
			category: null
		}
	}

	componentDidMount(){
		const selectedCat = this.props.categories.filter((cat)=>{
			return cat._id == this.props.location.query.category
		})[0]
		this.setState({
			category: selectedCat
		})
	}

	renderStatisticTitle(){
		if(this.state.category){
			return (
				<h2>{this.state.category.category_name}</h2>
			)
		}
	}

	renderGraph(){
		if(this.state.category && this.props.selectedData){
			const LineChart = rd3.LineChart
			const formattedData = formatDataForChart(this.props.selectedData)
			return (
				<LineChart legend={true} data={formattedData} />
			)
		}
	}

	render() {
		return (
			<div id='Statistic' style={comStyles().mainview}>
				STATISTIC
				{this.renderStatisticTitle()}
				{this.renderGraph()}
			</div>
		)
	}

}

Statistic.propTypes = {
	selectedData: React.PropTypes.array.isRequired,
	categories: React.PropTypes.array.isRequired
}

const RadiumHOC = Radium(Statistic);

function mapStateToProps(state){
	return {
		selectedData: state.content.selectedData,
		categories: state.user.categories
	}
}

export default connect(mapStateToProps)(RadiumHOC);


// ===============================

const comStyles = () => {
	return {
		mainview: {
			display: "flex"
		}
	}
}
