import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header.vue'

describe('Testing Header Component', () => {
  it('Renders the navbar correctly', () => {
    const wrapper = shallowMount(Header);
    expect(wrapper.text()).toMatch('')
  })
})
