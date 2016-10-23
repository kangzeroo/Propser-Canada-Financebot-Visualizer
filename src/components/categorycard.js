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
			viewSub: false
		}
	}

	toggleSubCats(){
		this.setState({
			viewSub: !this.state.viewSub
		})
	}

	goToStatistic(subcat){
		filterData(this.props.cachedData, subcat)
			.then((data)=>{
				this.props.selectDataset(data)
				browserHistory.push('/statistic?category='+this.props.category._id+"&subcategory="+subcat)
			})
	}

	renderSubCats(){
		if(this.state.viewSub){
			const subcats = this.props.category.subcategories.map((subcat)=>{
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
				<div onClick={this.toggleSubCats.bind(this)} style={comStyles().category_name}>{this.props.category.category_name}</div>
				{this.renderSubCats()}
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
			display: "flex"
		},
		category_name: {

		},
		subcategory: {

		}
	}
}
