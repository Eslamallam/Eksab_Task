import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import toJSON from "enzyme-to-json";
import { GitHubRepos } from "../../components/GitHubRepos";
import { Provider } from "react-redux";
import { configureStore } from "../../store/configureStore";

configure({ adapter: new Adapter() });

test("should render GitHubRepos with redux state correctly", () => {
  const store = configureStore();

  const wrapper = shallow(
    <Provider store={store}>
      <GitHubRepos />
    </Provider>
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});
