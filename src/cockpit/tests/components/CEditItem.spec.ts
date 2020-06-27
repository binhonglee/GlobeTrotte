import CEditItem from '../../components/CEditItem.vue';
import Item from '../../shared/TripEditable';

import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

describe('CEditItem.vue', () => {
  it('renders name item', () => {
    const item = new Item('name', 'something');
    const wrapper = shallowMount(CEditItem, {
      propsData: { item },
    });
    expect(wrapper.text()).to.include('Name');
  });

  it('renders description item', () => {
    const item = new Item('description', 'something');
    const wrapper = shallowMount(CEditItem, {
      propsData: { item },
    });
    expect(wrapper.text()).to.include('Description');
  });

  it('renders unknown item', () => {
    const item = new Item('random', 'something');
    const wrapper = shallowMount(CEditItem, {
      propsData: { item },
    });
    expect(wrapper.text()).to.include('unknown_type');
  });
});
