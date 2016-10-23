import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'
import { Link } from 'react-router';

class Header extends Component {

	render() {
		return (
			<div id='Header' style={comStyles().mainview}>
        <Link to='/list'>Home</Link>
	      <Link to='/summary'>Summary</Link>
			</div>
		)
	}

}

Header.propTypes = {
}

const RadiumHOC = Radium(Header);

function mapStateToProps(state){
	return {
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
