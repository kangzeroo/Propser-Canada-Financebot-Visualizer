import React, {Component} from 'react';
import {connect} from 'react-redux';
import Radium from 'radium'
import rd3 from 'rd3';
import CategoryCard from './categorycard'

import { getUserCategories } from '../api/content_manager'
import { saveCategoriesToState } from '../actions/content_actions'

class List extends Component {

  componentWillMount(){
    getUserCategories(this.props.userId || this.props.location.query.userId)
      .then((categories)=>{
        console.log(categories)
        this.props.saveCategoriesToState(categories)
      })
  }

  renderCategories(cat){
    return (
        <CategoryCard key={cat._id} category={cat} />
    )
  }

  renderList(){
    return (
      <div>
        <h2 style={comStyles().name}>{/*this.props.userId*/}Siddhanth Unnithan</h2>
        <div style={comStyles().catlist}>
          {this.props.categories.map(this.renderCategories)}
        </div>
      </div>
    )
  }

	render() {
		return (
			<div id='List' style={comStyles().mainview}>
				{this.renderList()}
			</div>
		)
	}

}

List.propTypes = {
	userId: React.PropTypes.string.isRequired,
  user: React.PropTypes.object,
  categories: React.PropTypes.array.isRequired
}

const RadiumHOC = Radium(List);

function mapStateToProps(state){
	return {
		userId: state.user.userId,
    user: state.user.user,
    categories: state.user.categories
	}
}

export default connect(mapStateToProps, {saveCategoriesToState})(RadiumHOC);


// ===============================

const comStyles = () => {
	return {
		mainview: {
			display: "flex",
      margin: "25px 0px 0px 0px",
      justifyContent: "center",
      padding: "20px"
		},
    name: {
      border: "1px solid red",
      textAlign: "center"
    },
    catlist: {
      border: "1px solid red",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap"
    }
	}
}
