import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as courseActions from "./actions/courseActions";

describe("The store", ()=>{
  it("should handle creating courses", () => {
    // arrange
    const store = createStore(rootReducer, initialState)
    const course = {
      title: "new Course"
    }

    // act
    const action = courseActions.createCourseSuccess(course);
    store.dispatch(action);

    // assert
    expect(store.getState().courses.length).toBe(1);
    const createdCourse = store.getState().courses[0];
    expect(createdCourse).toEqual(course);
  })
})