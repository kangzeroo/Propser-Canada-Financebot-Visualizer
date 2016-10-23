import React, { Component } from 'react'
import {connect} from 'react-redux';
import Radium from 'radium'

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

  render() {
    return (
      <div>
				<Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
	params: React.PropTypes.object.isRequired,
	userId: React.PropTypes.string.isRequired
}

const RadiumHOC = Radium(App);

function mapStateToProps(state){
	return {
		params: state.user.params,
		userId: state.user.userId
	}
}

export default connect(mapStateToProps, {cacheDataToState, saveParamsToState})(RadiumHOC);


// ===============================

const comStyles = () => {
	return {

	}
}
