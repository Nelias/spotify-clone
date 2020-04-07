import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'
import ArtistAlbums from './artist-albums'
import { BrowserRouter } from 'react-router-dom'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('../../redux/actions')

const mockStore = configureStore([])

describe('Artist Albums', () => {
  let store: any = null
  let wrapper: any = null

  beforeAll(() => {
    store = mockStore({
      player: {
        items: [],
      },
    })

    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ArtistAlbums data={store.player} />
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
