import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "../courses/CourseForm";
import { newCourse } from "../../../tools/mockData";

function ManageCoursePage({courses, authors, loadAuthors, loadCourses, saveCourse, history, ...props}){

  const [course, setCourse ] = useState({...props.course});
  const [errors, setErors ] = useState({});

  useEffect( () => {
    if(courses.length === 0){
      loadCourses().catch(error => {
       alert("Loading courses failed" + error);
      });
    }else{
      setCourse({...props.course})
    }

    if(authors.length === 0) {
      loadAuthors().catch(error => {
       alert("Loading errors failed" + error);
      });
    }
  }, [props.course]);

  function handleChange(event){
    const{ name, value } = event.target
    setCourse( prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  function handleSave(event){
    event.preventDefault();
    saveCourse(course).then(() => {
      history.push("/courses")
    });
  }

  return (
   <CourseForm authors={authors} errors={errors} course={course} onChange={handleChange} onSave={handleSave}/>
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export function getCourseBySlug(courses, slug){
  return courses.find(course => course.slug === slug ) || null
}

function mapStateToProps(state, ownProps){
  const slug = ownProps.match.params.slug
  const course = slug && state.courses.length > 0 ? getCourseBySlug(state.courses, slug) : newCourse;
  return {
    courses: state.courses,
    authors: state.authors,
    course
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
  loadCourses,
  saveCourse
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);