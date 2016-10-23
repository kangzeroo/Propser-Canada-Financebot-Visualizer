import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'
import { browserHistory } from 'react-router'

import { filterData } from '../api/content_manager'
import { selectDataset } from '../actions/content_actions'

class CategoryCard extends Component {

	constructor(){
		super()
		this.state = {
			viewSub: false,
		}
	}

	toggleSubCats(subcat){
		let option
		if(this.state.viewSub){
			option = !this.state.viewSub
		}else{
			option = subcat
		}
		this.setState({
			viewSub: option
		})
	}

	goToStatistic(subcat){
		filterData(this.props.cachedData, subcat)
			.then((data)=>{
				console.log(data)
				this.props.selectDataset(data)
				browserHistory.push('/statistic?category='+this.props.category._id+"&subcategory="+subcat)
			})
	}

	renderSubCats(){
		if(this.state.viewSub){
			const subcats = this.props.category.subcategory.map((subcat)=>{
				return (
					<div onClick={()=>this.goToStatistic(subcat)} key={subcat} >
						{subcat}
					</div>
				)
			})
			return subcats
		}
	}

	render() {
		return (
			<div id='CategoryCard' style={comStyles().mainview}>
				<div onClick={()=>this.toggleSubCats(this.props.category.category).bind(this)} style={comStyles().category_name}>{this.props.category.category}</div>
				<div style={comStyles().subcats}>
					{this.renderSubCats()}
				</div>
			</div>
		)
	}

}

CategoryCard.propTypes = {
	cachedData: React.PropTypes.array.isRequired,
	category: React.PropTypes.object.isRequired
}

const RadiumHOC = Radium(CategoryCard);

function mapStateToProps(state){
	return {
		cachedData: state.content.cachedData
	}
}

export default connect(mapStateToProps, {selectDataset})(RadiumHOC);


// ===============================

const comStyles = () => {
	return {
		mainview: {
			display: "flex",
			border: "3px solid black",
			borderRadius: "5px",
			margin: "10px",
			padding: "10px",
			width: "300px",
			flexDirection: "column"
		},
		category_name: {
			textAlign: "center",
			fontWeight: "bold",
			width: "100%",
		},
		subcats: {
			width: "100%",
			display: "flex",
			flexWrap: "wrap",
			flexDirection: "column"
		},
		subcategory: {
			margin: "50px",
			width: "100%",
			textAlign: "center",
			padding: "5px"
		}
	}
}
