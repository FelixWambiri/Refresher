import * as courseActions from "./courseActions";
import * as types from "./actionTypes";
import { courses } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import {deleteCourse} from '../../api/courseApi';

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Load Courses Thunk", () => {
    it("Should create BEGIN_API_CALL AND LOAD_COURSES_SUCCESS when loading courses", () => {
      fetchMock.mock("*", {
        body: courses,
        headers: {"content-type": "application/json"}
      });

      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_COURSES_SUCCESS, courses }
      ];

      const store = mockStore({courses: []});

      return store.dispatch(courseActions.loadCourses()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    });

    it("Should create BEGIN_API_CALL and CREATE_COURSE_SUCCESS when saving a course", () => {
      const course = {
        title: "Learn Frontend Development",
        authorId: 1,
        category: "Front-End"
      }
      fetchMock.mock("*", {
        body: course,
        headers: {"content-type": "application/json"}
      });

      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.CREATE_COURSE_SUCCESS, course }
      ];

      const store = mockStore({ courses: [] })

      return store.dispatch(courseActions.saveCourse(course)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(store.getActions()[1].course.category).toEqual("Front-End");
      })
    });

    it("Should create BEGIN_API_CALL and UPDATE_COURSE_SUCCESS when saving a course", () => {
      const course = courses[0]
      const newCourse = {...course,
        category: "PHP"
      }


      fetchMock.mock("*", {
        body: newCourse,
        headers: {"content-type": "application/json"}
      });

      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.UPDATE_COURSE_SUCCESS,course: newCourse }
      ];

      const store = mockStore([courses])

      return store.dispatch(courseActions.saveCourse(newCourse)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(store.getActions()[1].course.category).toEqual("PHP");
      })
    });

    it("Should create DELETE_COURSE_OPTIMISTIC when deleting a course", () => {
      const course = courses[0]

      fetchMock.mock("*", {
        body: course,
        headers: {"content-type": "application/json"}
      });

      const expectedActions = [
        { type: types.DELETE_COURSE_OPTIMISTIC, course }
      ];

      const store = mockStore([courses])

      return store.dispatch(courseActions.deleteCourse(course)).then(() => {
        console.log("The store contains", store.getActions());
        expect(store.getActions()).toEqual(expectedActions);
      })
    });
  });

});

describe("creasteCourseSuccess", () => {
  it("should create a CREATE_COURSE_SUCCESS action", () => {
    // arrange
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course
    };

    // act
    const action = courseActions.createCourseSuccess(course);

    // assert
    expect(action).toEqual(expectedAction);
  })
})