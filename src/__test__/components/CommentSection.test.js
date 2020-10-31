import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import toJSON from "enzyme-to-json";
import { CommentSection } from "../../components/CommentSection";

configure({ adapter: new Adapter() });

test("should render CommentSection correctly", () => {
  const hasError = jest.fn();
  const commentInput = {
    isValid: true,
  };

  const wrapper = shallow(
    <CommentSection hasError={hasError} commentInput={commentInput} />
  );

  expect(toJSON(wrapper)).toMatchSnapshot();
});
