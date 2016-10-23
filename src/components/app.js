import React, { Component } from 'react'
import {connect} from 'react-redux';
import Radium from 'radium'
import { browserHistory } from 'react-router'

import Header from './header'

import { getDataFromDb, urlParamsExtractor } from '../api/content_manager'
import { saveParamsToState, cacheDataToState } from '../actions/content_actions'

export class App extends Component {

	componentWillMount(){
		urlParamsExtractor(this.props.location.query)
			.then((params)=>{
				console.log(params)
				this.props.saveParamsToState(params)
				return Promise.resolve(params)
			})
			.then((params)=>{
				return getDataFromDb(this.props.userId, params)
			})
			.then((data)=>{
				this.props.cacheDataToState(data)
			})
	}

	renderBack(){
		if(this.props.selectedData){
			const back = '/list?userId=' + this.props.userId
			return (
				 	<img src='../../res/images/ProsperCanada.jpg' style={comStyles().logo} onClick={()=>browserHistory.push(back)} />
			)
		}
	}

  render() {
    return (
      <div style={comStyles().app}>
				{this.renderBack()}
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
	params: React.PropTypes.object.isRequired,
	userId: React.PropTypes.string.isRequired,
	selectedData: React.PropTypes.array.isRequired
}

const RadiumHOC = Radium(App);

function mapStateToProps(state){
	return {
		params: state.user.params,
		userId: state.user.userId,
		selectedData: state.content.selectedData
	}
}

export default connect(mapStateToProps, {cacheDataToState, saveParamsToState})(RadiumHOC);


// ===============================

const comStyles = () => {
	return {
		app: {
			"display": "flex",
			"justifyContent": "center",
			"flexDirection": "column"
		},
		logo: {
			"width": "50%",
			"height": "auto",
			"margin": "auto"
		}
	}
}
