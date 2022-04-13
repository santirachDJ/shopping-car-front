import React from 'react'
import { mount } from 'enzyme'
import Modal from "emerald-ui/lib/Modal";
import { findElement } from '../utils/utilsEnzyme'
import { act } from 'react-dom/test-utils';
import ModalProduct from '../../components/modalProduct/modalProduct.component';
import TextField from 'emerald-ui/lib/TextField';


const waitForComponentToPaint = async (wrapper) => {
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
        wrapper.update();
    });
};


const handlerDataModal = jest.fn(); 
const handlerShowModal = jest.fn();
const handlerEmmiterModal = jest.fn();
describe('ModalProduct test', () => {
    let wrapper


    beforeEach(() => {
        wrapper = mount(
            <ModalProduct
            handlerShowModal={handlerShowModal}
            handlerDataModal={handlerDataModal}
            handlerEmmiterModal={handlerEmmiterModal}
            isOpen={true}
            data={{}}
            />
        );
        waitForComponentToPaint(wrapper); 
    });

    afterEach(() => {
        wrapper = {};
    });

    it('Matches the snapshot', () => {
        expect(wrapper.getElements()).toMatchSnapshot()
    })

    it('Find element componenet', () => {
        expect(findElement(wrapper, Modal).exists()).toBe(true)
    })

    it('Modal hide', () => {
        const modal = findElement(wrapper, Modal)
        modal.prop("onHide")()
        expect(handlerShowModal).toBeCalled();
        expect(handlerDataModal).toBeCalled()
    })

    it('Modal return data enbale',()=>{
     
        wrapper.find(TextField).at(0).props().onChange({ target: { value: 234 } })
        wrapper.update()
        wrapper.find(TextField).at(1).props().onChange({ target: { value: '234' } })
        wrapper.update()
        wrapper.find(TextField).at(2).props().onChange({ target: { value: 234 } })
        wrapper.update()
        wrapper.find('select').props().onChange({ target: { value: 'FOOD' } })
        wrapper.update()
        const send = wrapper.find('Button').at(1) 
        expect(send.exists()).toBeTruthy();
        expect(send.prop('disabled')).toBe(false);   
       
    })

    it('Modal send data enbale',()=>{
        wrapper.find(TextField).at(0).props().onChange({ target: { value: 234 } })
        wrapper.update()
        wrapper.find(TextField).at(1).props().onChange({ target: { value: '234' } })
        wrapper.update()
        wrapper.find(TextField).at(2).props().onChange({ target: { value: 234 } })
        wrapper.update()
        wrapper.find('select').props().onChange({ target: { value: 'FOOD' } })
        wrapper.update()
        const send = wrapper.find('Button').at(1) 
        send.simulate('click');
        expect(handlerEmmiterModal).toBeCalled();
        expect(handlerEmmiterModal).toBeCalledWith({"category": "FOOD", "code": 234, "id": undefined, "name": "234", "price": 234}, false);
    })

})

