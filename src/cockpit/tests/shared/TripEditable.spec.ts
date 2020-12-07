import test from "ava";
import Trip from "wings/Trip";
import TripEditable from "shared/TripEditable";

const allTypes = TripEditable.getAllTypes();

allTypes.forEach((type: string) => {
  test(
    type + " - All editables should have specified labels.",
    (t) => {
      const item = new TripEditable(type, "");
      t.true(
        item.label.localeCompare("unknown_type") !== 0,
      );
    },
  );
});

const trip: Trip = new Trip();

allTypes.forEach((type: string) => {
  test(
    type + " - All editables should exist in Trip.",
    (t) => {
      t.true(trip[type] !== undefined);
    },
  );
});
