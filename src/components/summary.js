import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'
import rd3 from 'rd3';
import { renderPieData } from '../api/content_manager'

class Summary extends Component {

	renderPie(){
		if(this.props.cachedData){
			const PieChart = rd3.PieChart
			const pieData = renderPieData(this.props.cachedData)
			console.log(pieData)
			return (
				<PieChart
		      data={pieData}
		      width={450}
		      height={400}
		      radius={110}
		      innerRadius={20}
		      sectorBorderColor="white"
		      title="Pie Chart" />
			)
		}
	}

	render() {
		return (
			<div id='Summary' style={comStyles().mainview}>
				SUMMARY
				{this.renderPie()}
			</div>
		)
	}

}

Summary.propTypes = {
	cachedData: React.PropTypes.array.isRequired
}

const RadiumHOC = Radium(Summary);

function mapStateToProps(state){
	return {
		cachedData: state.content.cachedData
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
