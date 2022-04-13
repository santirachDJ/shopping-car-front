import React from 'react'
import { mount } from 'enzyme'
import Nav from "emerald-ui/lib/Nav";
import NavHeader from '../../components/layout/navHeader.layout'
import { findElement } from '../utils/utilsEnzyme'
import { act } from 'react-dom/test-utils';
import routes from '../../routes/routes';
import { MemoryRouter } from 'react-router-dom';
/** aplicandole test a un componente que requeire de un useContext */
const mockHistoryPush = jest.fn();
const mockHistoryGoBack = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn().mockReturnValue({
      pathname: '/another-route',
      search: '?shopping=123456',
      hash: '',
      state: null,
      key: '5nvxpbdafa',
    }),
    useHistory: () => ({
        push: mockHistoryPush,
        goBack: mockHistoryGoBack,
    }),
}));
const waitForComponentToPaint = async (wrapper) => {
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
        wrapper.update();
    });
};
describe('navHeader', () => {
    let wrapper


    beforeEach(() => {
        wrapper = mount(
            <NavHeader/>
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
        expect(findElement(wrapper, 'div').exists()).toBe(true)
    })

    test('Should have options', async () => {
        const table = wrapper.find(Nav);
        expect(table.find('a').length).toEqual(routes.length);
    });

    test('triggers path change', () => {
      
        const element = findElement(wrapper,'a');
        expect(element.exists()).toBeTruthy();
        element.simulate("click");
        expect(mockHistoryPush).toBeCalled();
        expect(mockHistoryPush).toBeCalledWith({"pathname": "/", "search": "?shopping=123456", "state": {"shoppingId": "123456"}});
      });

})

