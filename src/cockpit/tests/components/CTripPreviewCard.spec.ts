import CTripPreviewCard from "@/components/CTripPreviewCard.vue";
import { mockTripObj } from "../mockData/data";

import { mount } from "@vue/test-utils";
import { describe, expect, it } from "@jest/globals";
import { globalMountingOptions } from "../helper";

const mockedTrip = new mockTripObj();

describe("CTripPreviewCard", () => {
  it("renders component", () => {
    const trip = mockedTrip.trip;
    const wrapper = mount(CTripPreviewCard, {
      global: globalMountingOptions(),
      props: {
        trip: trip,
      },
    });

    expect(wrapper.find(".tripTitleName").text()).toContain(trip.details.name);
    expect(wrapper.find(".tripPreviewInfo").text()).toContain(
      trip.details.description,
    );
    expect(wrapper.find(".tripPreviewInfo").text()).toContain(trip.user.name);
    wrapper.findAll(".tripDayPreview").forEach((obj, i) => {
      expect(obj.find(".tripDayLabel").text()).toContain(
        "Day " + (i + 1).toString(),
      );
      const place = obj.find(".place");
      expect(place.exists()).toBeTruthy();
      trip.details.days[i].places.forEach((tripPlace) => {
        expect(place.text()).toContain(tripPlace.label);
        expect(place.text()).toContain(tripPlace.description);
        expect(place.text()).not.toContain(tripPlace.URL);
      });
    });
  });
});
