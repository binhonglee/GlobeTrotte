import CEditItem from "@/components/CEditItem.vue";
import Item from "@/shared/TripEditable";
import { expect } from "@jest/globals";
import { mount } from "@vue/test-utils";

const mockLabelName = "name";
const mockLabelDescription = "description";
const mockLabelRandom = "random";
const mockVal = "something";
const mockNameMaxChar = 5;
const mockDescriptionMaxChar = 7;

const labelClass = ".editLabel";
const inputClass = ".editInput";

describe("CEditItem", () => {
  it("renders name item", () => {
    const item = new Item(mockLabelName, mockVal);
    const wrapper = mount(CEditItem, {
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
      },
      data: () => ({
        value: "",
        NAME_CHAR_MAX_COUNT: mockNameMaxChar,
        DESCRIPTION_ROW_COUNT: mockDescriptionMaxChar,
      }),
    });
    const editInput = wrapper.find(inputClass);
    expect(editInput.exists()).toBeTruthy();
    expect(editInput.attributes("modelvalue")).not.toContain(mockVal);
    expect(editInput.attributes("modelvalue")).toContain(
      mockVal.slice(0, mockNameMaxChar),
    );
  });

  it("renders description item", () => {
    const item = new Item(mockLabelDescription, mockVal);
    const wrapper = mount(CEditItem, {
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
      },
      data: () => ({
        NAME_CHAR_MAX_COUNT: mockDescriptionMaxChar,
        DESCRIPTION_ROW_COUNT: mockDescriptionMaxChar,
      }),
    });
    const editInput = wrapper.find(inputClass);
    expect(editInput.exists()).toBeTruthy();
    expect(editInput.attributes("modelvalue")).not.toContain(mockVal);
    expect(editInput.attributes("modelvalue")).toContain(
      mockVal.slice(0, mockDescriptionMaxChar),
    );
  });

  it("renders unknown item", () => {
    const item = new Item(mockLabelRandom, mockVal);
    const wrapper = mount(CEditItem, {
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
