import React from "react";
import { cleanup, render } from "react-testing-library";
import CourseForm from "./CourseForm";

afterEach(cleanup);

function renderCourseForm(args){
  let defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = {...defaultProps, args};
  return render(<CourseForm {...props}/>);
}

it("should render Add Course Header", () => {
  const { getByText } = renderCourseForm();
  getByText("Add Course");
});

it("should set button label to 'Save' when saving is false", () => {
  const {getByText} = renderCourseForm();
  getByText("Save");
});

// it("should set button label to 'Saving...' when saving is true", () => {
//   const { getByText, debug } = renderCourseForm({ saving: true });
//   debug();
//   getByText("Saving...");
// });