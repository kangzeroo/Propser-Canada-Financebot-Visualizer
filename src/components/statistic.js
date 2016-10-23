import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'
import rd3 from 'rd3';
import Chart from 'chart.js'

import { formatDataForChart } from '../api/content_manager'

class Statistic extends Component {

	constructor(){
		super()
		this.state = {
			category: null,
			subcategory: null
		}
	}

	componentWillMount(){
		const selectedCat = this.props.categories.filter((cat)=>{
			return cat._id == this.props.location.query.category
		})[0]
		console.log(selectedCat)
		const thesubcat = selectedCat.subcategory.filter((subcat)=>{
			return subcat == this.props.location.query.subcategory
		})
		this.setState({
			category: selectedCat,
			subcategory: thesubcat
		})
	}

	renderStatisticTitle(){
			return (
				<h2>{this.state.subcategory}</h2>
			)
	}

	renderGraph(){
		if(this.state.subcategory && this.props.selectedData){
			const ctx = document.getElementById("chart")
			const formattedData = formatDataForChart(this.props.selectedData, "cumulative")
			const LineChart = new Chart(ctx, {
				type: "line",
				data: formattedData,

			})
			return (
				<div id='chart'></div>
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
