import React, { Component } from "react";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";

class ManageCoursePageClassComponent extends Component{
   componentDidMount() {
     const {courses, authors, loadAuthors, loadCourses} = this.props;
    if(courses.length === 0){
      loadCourses().catch(error => {
       alert("Loading courses failed" + error);
      });
    }

    if(authors.length === 0) {
      loadAuthors().catch(error => {
       alert("Loading errors failed" + error);
      });
    }
   }

  render(){
    return (
      <>
        <h2>Manage Course</h2>
      </>
    );
  }
}

ManageCoursePageClassComponent.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired
}

function mapStateToProps(state){
  return {
    courses: state.courses,
    authors: state.authors
 };
}

/**
 *  The first and more understandable way of
 *  mapping dispatch to props
 * @param {*} dispatch
 */
// function mapDispatchToProps(dispatch){
//   return {
//     actions: {
//       loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
//       loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
//     }
//   };
// }


/** Making the mapping object more concise
 *
 *
 *  Alternative method of bringing in redux
 *  actions into component in a clean and DRY way
 * using mapDispatchToProps object
 *
 */
const mapDispatchToProps = {
  loadAuthors,
  loadCourses
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePageClassComponent);