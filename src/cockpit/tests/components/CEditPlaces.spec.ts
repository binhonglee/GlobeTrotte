import CEditPlaces from '../../components/CEditPlaces.vue';
import { mockPlace } from '../mockData/data';

import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

const mockedPlace = new mockPlace();

describe('CEditPlaces.vue', () => {
  it('renders empty component', () => {
    const wrapper = shallowMount(CEditPlaces, {});
    expect(wrapper.find('.editLabel').text()).to.include(
      'Places:',
    );
    expect(wrapper.find('.editPlace').exists()).to.equal(
      false,
    );
  });

  it('renders one place object', () => {
    const places = [mockedPlace.place];
    const wrapper = shallowMount(CEditPlaces, {
      propsData: { places },
    });
    expect(wrapper.find('.editLabel').text()).to.include(
      'Places:',
    );
    expect(wrapper.find('.editPlace').exists()).to.equal(
      true,
    );
  });
});
