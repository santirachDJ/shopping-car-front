import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import { findElement } from "../utils/utilsEnzyme";
import Pagination from "../../components/pagination/pagination.component";
import Pager from "emerald-ui/lib/Pager";

const waitForComponentToPaint = async (wrapper) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    wrapper.update();
  });
};
const handlerEmmiterModal = jest.fn();
describe("alert test", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Pagination 
        
        eventEmmiter={handlerEmmiterModal} total={10} offset={0} limit={8}
        />);
    waitForComponentToPaint(wrapper);
  });

  afterEach(() => {
    wrapper = {};
  });

  it("Matches the snapshot", () => {
    expect(wrapper.getElements()).toMatchSnapshot();
  });

  it('Find element componenet', () => {
    expect(findElement(wrapper, Pager).exists()).toBe(true)
})

it('Modal return data enbale',()=>{
     
    wrapper.find(Pager).at(0).props().onPageChange(10,8)
    wrapper.update()
   
    expect(handlerEmmiterModal).toBeCalled(); 
   
})
});
