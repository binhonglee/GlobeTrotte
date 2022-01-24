import { expect, test } from "vitest";
import TripBasic from "@/wings/TripBasic";
import TripEditable from "@/shared/TripEditable";

const allTypes = TripEditable.getAllTypes();

allTypes.forEach((type: string) => {
  test(type + " - All editables should have specified labels.", () => {
    const item = new TripEditable(type, "");
    expect(item.label.localeCompare("unknown_type") !== 0).toBeTruthy();
  });
});

const trip: TripBasic = new TripBasic();

allTypes.forEach((type: string) => {
  test(type + " - All editables should exist in Trip.", () => {
    expect(trip[type] !== undefined).toBeTruthy();
  });
});
