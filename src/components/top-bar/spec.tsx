import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import TopBar from './top-bar'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('../../redux/actions')

const mockStore = configureStore([])

describe('TopBar', () => {
  let store: any = null
  let wrapper: any = null

  beforeEach(() => {
    store = mockStore({
      myState: 'sample text',
    })

    wrapper = shallow(
      <Provider store={store}>
        <TopBar />
      </Provider>
    )
  })

  it('should contain a search button', () => {
    expect(wrapper.find('button'))
  })

  it('should contain a search input', () => {
    expect(wrapper.find('input'))
  })
})
