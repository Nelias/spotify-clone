import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'
import BottomBar from './bottom-bar'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('../../redux/actions')

const mockStore = configureStore([])

describe('Bottom Bar', () => {
  let store: any = null
  let wrapper: any = null

  beforeAll(() => {
    store = mockStore({
      player: {
        albums: {
          items: [],
        },
      },
    })

    wrapper = mount(
      <Provider store={store}>
        <BottomBar />
      </Provider>
    )
  })

  it('should mount in a full DOM', () => {
    expect(wrapper.length).toBe(1)
  })

  it('should be able to click play', () => {
    expect(wrapper.find('.rhap_play-pause-button').prop('onClick'))
  })

  afterAll(() => {
    wrapper.unmount()
  })
})
