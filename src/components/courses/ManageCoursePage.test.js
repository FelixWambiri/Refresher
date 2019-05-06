import React from "react";
import { mount } from "enzyme";
import {courses, newCourse, authors } from "../../../tools/mockData";
import { ManageCoursePage } from "./ManageCoursesPage";

function render(args){
  const defaultProps = {
    authors,
    courses,
    history: {},
    saveCourse: jest.fn(),
    loadAuthors: jest.fn(),
    loadCourses: jest.fn(),
    course: newCourse,
    match: {}
  };

  const props = {...defaultProps, ...args}
  return mount(<ManageCoursePage {...props}/>);
}

it("sets an error when trying to submit form with empty title", () => {
  const wrapper = render();
  wrapper.find("form").simulate("submit");
  const error = wrapper.find(".alert").first();
  expect(error.text()).toBe("Title is Required.");
});