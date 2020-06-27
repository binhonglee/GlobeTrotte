import CPlaces from '../../components/CPlaces.vue';
import Place from '../../structs/Place';
import { mockPlace } from '../mockData/data';

import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

const mockedPlace = new mockPlace();

describe('CPlaces.vue', () => {
  it('renders empty component', () => {
    const wrapper = shallowMount(CPlaces, {});
    expect(wrapper.find('.places').text()).equals('');
  });

  it('renders one component', () => {
    const wrapper = shallowMount(CPlaces, {
      propsData: { places: [mockedPlace.place] },
    });

    expect(wrapper.find('#places').text()).contains(
      'Places:',
    );
    expect(wrapper.find('#place').text()).contains(
      mockedPlace.label,
    );
  });
});
