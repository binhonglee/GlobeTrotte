import CEditItem from "@/components/CEditItem.vue";
import Item from "@/shared/TripEditable";
import { describe, expect, it } from "@jest/globals";
import { mount } from "@vue/test-utils";
import { globalMountingOptions } from "../helper";

const mockLabelName = "name";
const mockLabelDescription = "description";
const mockLabelRandom = "random";
const mockVal = "something";
const mockNameMaxChar = 5;
const mockDescriptionMaxChar = 7;
const mockDescriptionRowMinCount = 3;

const labelClass = ".editLabel";
const inputClass = ".editInput";

describe("CEditItem", () => {
  it("renders name item", () => {
    const item = new Item(mockLabelName, mockVal);
    const wrapper = mount(CEditItem, {
      global: globalMountingOptions(),
      props: {
        label: item.label,
        val: item.value,
      },
    });
    const editLabel = wrapper.find(labelClass);
    expect(editLabel.exists()).toBeTruthy();
    expect(editLabel.text()).toContain("Name");
  });

  it("renders name item with limit", () => {
    const item = new Item(mockLabelName, mockVal);
    const wrapper = mount(CEditItem, {
      props: {
        label: item.label,
        val: item.value,
        valMaxCount: mockNameMaxChar,
      },
    });
    const editInput = wrapper.find(inputClass).find(".n-input__input-el");
    expect(editInput.exists()).toBeTruthy();
    expect(editInput.attributes("maxlength")).toEqual(
      mockNameMaxChar.toString(),
    );
  });

  it("renders description item", () => {
    const item = new Item(mockLabelDescription, mockVal);
    const wrapper = mount(CEditItem, {
      global: globalMountingOptions(),
      props: {
        label: item.label,
        val: item.value,
      },
    });
    const editLabel = wrapper.find(labelClass);
    expect(editLabel.exists()).toBeTruthy();
    expect(editLabel.text()).toContain("Description");
  });

  it("renders description item with limit", () => {
    const item = new Item(mockLabelDescription, mockVal);
    const wrapper = mount(CEditItem, {
      props: {
        label: item.label,
        val: item.value,
        type: "textarea",
        valMaxCount: mockDescriptionMaxChar,
        rowMinCount: mockDescriptionRowMinCount,
      },
    });
    const editInput = wrapper.find(inputClass).find(".n-input__textarea-el");
    expect(editInput.exists()).toBeTruthy();
    expect(editInput.attributes("rows")).toBe(`${mockDescriptionRowMinCount}`);
    expect(editInput.attributes("maxlength")).toContain(
      mockDescriptionMaxChar.toString(),
    );
  });

  it("renders unknown item", () => {
    const item = new Item(mockLabelRandom, mockVal);
    const wrapper = mount(CEditItem, {
      global: globalMountingOptions(),
      props: {
        label: item.label,
        val: item.value,
      },
    });
    const editLabel = wrapper.find(labelClass);
    expect(editLabel.exists()).toBeTruthy();
    expect(editLabel.text()).toContain("unknown_type");
  });
});
