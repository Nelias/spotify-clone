import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'
import UserProfile from './user-profile'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('../../redux/actions')

const mockStore = configureStore([])

describe('User Profile', () => {
  let store: any = null
  let wrapper: any = null

  beforeAll(() => {
    store = mockStore({
      sidebar: {
        userProfile: {
          country: null,
          display_name: 'Kurt',
          email: 'kurt@kurt.de',
          followers: {
            total: 555,
          },
          href: '',
          id: 0,
          images: [{ url: '' }],
        },
      },
    })

    wrapper = mount(
      <Provider store={store}>
        <UserProfile />
      </Provider>
    )
  })

  it('should mount in a full DOM', () => {
    expect(wrapper.length).toBe(1)
  })

  it('should display an image', () => {
    expect(wrapper.find('img'))
  })

  it('should display a name', () => {
    expect(wrapper.find('span').first().text()).toContain('Kurt')
  })

  it('should display an e-mail', () => {
    const emailReg = /\S+@\S+\.\S+/

    expect(emailReg.test(wrapper.text())).toBe(true)
  })

  it('should display followers', () => {
    const reg = /followers/gi

    expect(reg.test(wrapper.text())).toBe(true)
  })

  it('should display a country', () => {
    const reg = /country/gi

    expect(reg.test(wrapper.text())).toBe(true)
  })

  afterAll(() => {
    wrapper.unmount()
  })
})
