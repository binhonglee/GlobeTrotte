import { existsSync, writeFileSync } from "fs";

const componentFolder = "src/cockpit/components/";
const componentFileTemplate = `<template lang="pug">
  .COMPONENT_NAME_SNAKE
    //- TODO
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "COMPONENT_NAME",
  // TODO
});
</script>

<style lang="scss">
@import "../shared/lib";
</style>
`;

const componentTestFolder = "src/cockpit/tests/components/";
const testFileTemplate = `import COMPONENT_NAME from "components/COMPONENT_NAME.vue";

import { shallowMount } from "@vue/test-utils";
import test from "ava";

test("renders empty component", (t) => {
  const wrapper = shallowMount(COMPONENT_NAME, {});
});
`;

const args = process.argv.slice(2);

args.forEach((componentName) => {
  const snake_case_arr = componentName.slice(1).split("");
  snake_case_arr.forEach((c: string, index: number) => {
    if (c === "-") {
      process.exit();
    }

    if (index === 0) {
      snake_case_arr[index] = snake_case_arr[index].toLocaleLowerCase();
    } else if (
      snake_case_arr[index].toLocaleLowerCase() !== snake_case_arr[index]
    ) {
      snake_case_arr[index] = "_" + snake_case_arr[index].toLocaleLowerCase();
    }
  });

  const snake_case = snake_case_arr.join("");
  const componentFile = componentFolder + componentName + ".vue";
  const testFile = componentTestFolder + componentName + ".spec.ts";

  if (existsSync(componentFile)) {
    console.log("File " + componentFile + " already exists. Skipping...");
  } else {
    writeFileSync(
      componentFile,
      componentFileTemplate
        .split("COMPONENT_NAME_SNAKE")
        .join(snake_case)
        .split("COMPONENT_NAME")
        .join(componentName),
    );
    console.log("File " + componentFile + " created.");
  }

  if (existsSync(testFile)) {
    console.log("File " + testFile + " already exists. Skipping...");
  } else {
    writeFileSync(
      testFile,
      testFileTemplate.split("COMPONENT_NAME").join(componentName),
    );
    console.log("File " + testFile + " created.");
  }
});
