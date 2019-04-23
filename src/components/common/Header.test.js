import React from "react";
import Header from "./Header";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";

// Note how with shallow render you search for the React Component tag
it("contains 3 NavLinks via shallow", () => {
  const numLinks = shallow(<Header/>).find("NavLink").length;
  expect(numLinks).toBe(3);
});

it("contains 3 anchors via mount", () => {
  const numAnchors = mount(
    <MemoryRouter>
      <Header/>
    </MemoryRouter>
  ).find("a").length;

  expect(numAnchors).toEqual(3);
})