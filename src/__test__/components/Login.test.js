import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import toJSON from "enzyme-to-json";
import { Login } from "../../components/Login";

configure({ adapter: new Adapter() });

test("should render Login correctly", () => {
  const wrapper = shallow(<Login />);
  expect(wrapper.find("div").text()).toContain("Eksab");
  expect(toJSON(wrapper)).toMatchSnapshot();
});
