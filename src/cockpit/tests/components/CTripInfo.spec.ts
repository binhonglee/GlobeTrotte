import CTripInfo from '../../components/CTripInfo.vue';
import Trip from '../../structs/Trip';
import { mockTrip } from '../mockData/data';

import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import City from '@/cockpit/enums/City';

const mockedTrip = new mockTrip();

describe('CTripInfo.vue', () => {
  it('renders empty component', () => {
    const wrapper = shallowMount(CTripInfo, {});
    expect(wrapper.find('.view_trip_info').exists()).equals(
      true,
    );
  });

  it('renders one component', () => {
    const wrapper = shallowMount(CTripInfo, {
      propsData: {
        trip: mockedTrip.trip,
      },
    });
    expect(wrapper.find('.view_trip_info').exists()).equals(
      true,
    );
  });

  it('renders one edit component', () => {
    const wrapper = shallowMount(CTripInfo, {
      propsData: {
        trip: mockedTrip.trip,
        editable: true,
      },
    });
    expect(wrapper.find('.edit_trip_info').exists()).equals(
      true,
    );
  });

  it('renders one view component', () => {
    const wrapper = shallowMount(CTripInfo, {
      propsData: {
        trip: mockedTrip.trip,
        editable: false,
      },
    });
    expect(wrapper.find('.view_trip_info').exists()).equals(
      true,
    );
  });
});
