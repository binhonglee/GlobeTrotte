import { expect } from "chai";
import Trip from "../../wings/Trip";
import TripEditable from "../../shared/TripEditable";

describe("<TripEditable> All editables should have specified labels.", () => {
  const allTypes = TripEditable.getAllTypes();

  allTypes.forEach((type: string) => {
    it(type, () => {
      const item = new TripEditable(type, "");
      expect(
        item.label.localeCompare("unknown_type") !== 0,
      ).equal(true);
    });
  });
});

describe("<TripEditable> All editables should exist in Trip.", () => {
  const allTypes = TripEditable.getAllTypes();
  const trip: Trip = new Trip();

  allTypes.forEach((type: string) => {
    it(type, () => {
      expect(trip[type] !== undefined).equal(true);
    });
  });
});
