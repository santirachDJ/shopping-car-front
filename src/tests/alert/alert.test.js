import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import AlertShowError from "../../components/alert/alert.component";
import Alert from "emerald-ui/lib/Alert";
import { findElement } from "../utils/utilsEnzyme";

const waitForComponentToPaint = async (wrapper) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    wrapper.update();
  });
};

describe("alert test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<AlertShowError message="Product add" color="info" />);
    waitForComponentToPaint(wrapper);
  });

  afterEach(() => {
    wrapper = {};
  });

  it("Matches the snapshot", () => {
    expect(wrapper.getElements()).toMatchSnapshot();
  });

  it('Find element componenet', () => {
    expect(findElement(wrapper, Alert).exists()).toBe(true)
})
});
