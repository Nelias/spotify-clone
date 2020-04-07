import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'
import SearchResult from './search-result'
import { BrowserRouter } from 'react-router-dom'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('../../redux/actions')

const mockStore = configureStore([])

describe('Search Result', () => {
  let store: any = null
  let wrapper: any = null

  beforeAll(() => {
    store = mockStore({
      data: {
        artists: {
          items: [],
        },
        albums: {
          items: [],
        },
        tracks: {
          items: [],
        },
      },
    })

    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <SearchResult data={store.data} />
        </Provider>
      </BrowserRouter>
    )
  })

  it('should mount in a full DOM', () => {
    expect(wrapper.length).toBe(1)
  })

  afterAll(() => {
    wrapper.unmount()
  })
})
