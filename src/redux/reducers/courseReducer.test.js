import courseReducer from "./courseReducer";
import * as actions from "../actions/courseActions";

describe("Course Reducer", () => {
  it("should add course when passed CREATE_COURSE_SUCCESS", () => {
    // arrange
    const initialState = [
      {
        title: "A"
      },
      {
        title: "B"
      }
    ]

    const newCourse = {
      title: "C"
    }

    const action = actions.createCourseSuccess(newCourse);

    // act
    const newState = courseReducer(initialState, action)


    // assert
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toBe("A");
    expect(newState[2].title).toBe("C");
  });

  it("should update when passed UPDATE_COURSE_SUCCESS", () => {
    // arrange
    const initialState = [
      { id: 1, title: "A" },
      { id: 2, title: "B" },
      { id: 3, title: "C" }
    ];

    const course = {id:2, title: "New Title"};

    const action = actions.updateCourseSuccess(course);

    // act
    const newState = courseReducer(initialState, action);
    const updatedCourse = newState.find(a => a.id == course.id);

    // assert
    expect(newState[1].title).toEqual("New Title");

  });
});
