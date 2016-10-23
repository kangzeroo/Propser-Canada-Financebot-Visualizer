import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'
import rd3 from 'rd3';

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
		const thesubcat = selectedCat.subcategory.filter((subcat)=>{
			return subcat == this.props.location.query.subcategory
		})
		this.setState({
			category: selectedCat,
			subcategory: thesubcat
		})
	}

	renderGraph(){
		if(this.state.subcategory && this.props.selectedData){
			const AreaChart = rd3.AreaChart
			const cumulative = formatDataForChart(this.props.selectedData, "cumulative")
			const transactional = formatDataForChart(this.props.selectedData, "transactional")
			return (
				<div>
					<AreaChart
						width="100%"
						viewBoxObject={{
							x: 0,
							y: 0,
							height: 400,
							width: 500
						}}
						height={400}
						title={this.state.subcategory}
						xAxisLabel="Date"
						yAxisLabel="Spending"
						legend={true} data={cumulative} />
					<AreaChart legend={true} data={transactional} />
				</div>
			)
		}
	}

	render() {
		return (
			<div id='Statistic' style={comStyles().mainview}>
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
			display: "flex",
			margin: "25px 0px 0px 0px"
		},
		title: {
			width: "100%",
			textAlign: "center"
		}
	}
}
