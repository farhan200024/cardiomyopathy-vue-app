import { shallowMount } from '@vue/test-utils'
import HeartPulse from '@/components/HeartPulse.vue'

describe('Testing Heart Pulse component', () => {
  it('Renders graphic and text correctly', () => {
    const wrapper = shallowMount(HeartPulse);
    expect(wrapper.text()).toMatch('Loading...')
  })
})
