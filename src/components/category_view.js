import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'

import { getDataFromDb, urlParamsExtractor } from '../api/content_manager'
import { saveParamsToState, cacheDataToState } from '../actions/content_actions'

class CategoryView extends Component {

	componentWillMount(){
		urlParamsExtractor(this.props.location.query)
			.then((params)=>{
				return this.props.saveParamsToState(params)
			})
			.then(()=>{
				return getDataFromDb(this.props.userId, this.props.params)
			})
			.then((data)=>{
				this.props.cacheDataToState(data)
			})
	}

	componentDidUpdate(){
		console.log("this.props.cachedData")
		console.log(this.props.cachedData)
	}

	render() {
		return (
			<div id='CategoryView' style={comStyles().mainview}>
				CATEGORY VIEW
			</div>
		)
	}

}

CategoryView.propTypes = {
	cachedData: React.PropTypes.array.isRequired,
	params: React.PropTypes.object.isRequired,
	userId: React.PropTypes.string.isRequired
}

const RadiumHOC = Radium(CategoryView);

function mapStateToProps(state){
	return {
		cachedData: state.content.cachedData,
		params: state.user.params,
		userId: state.user.userId
	}
}

export default connect(mapStateToProps, {cacheDataToState, saveParamsToState})(RadiumHOC);


// ===============================

const comStyles = () => {
	return {
		mainview: {
			display: "flex"
		}
	}
}
