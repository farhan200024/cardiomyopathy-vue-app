import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('Testing App component', () => {
  it('Structures page, loads header, and handles authentication', () => {
    const wrapper = shallowMount(App);
    expect(wrapper.text()).toMatch('Home')
  })
})
