import { existsSync, writeFileSync } from "fs";

const componentFolder = "src/cockpit/components/";
const componentFileTemplate = `<template lang="pug">
  .COMPONENT_NAME_SNAKE
    // TODO
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class COMPONENT_NAME extends Vue {
  // TODO
}
</script>

<style lang="scss">
@import '../shared/lib';
</style>
`;

const componentTestFolder = "src/cockpit/tests/components/";
const testFileTemplate = `import COMPONENT_NAME from '../../components/COMPONENT_NAME.vue';

import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

describe('COMPONENT_NAME.vue', () => {
  it('renders empty component', () => {
    const wrapper = shallowMount(COMPONENT_NAME, {});
  });
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
      snake_case_arr[index] = snake_case_arr[
        index
      ].toLocaleLowerCase();
    } else if (
      snake_case_arr[index].toLocaleLowerCase() !==
      snake_case_arr[index]
    ) {
      snake_case_arr[index] =
        "_" + snake_case_arr[index].toLocaleLowerCase();
    }
  });

  const snake_case = snake_case_arr.join("");
  const componentFile =
    componentFolder + componentName + ".vue";
  const testFile =
    componentTestFolder + componentName + ".spec.ts";

  if (existsSync(componentFile)) {
    console.log(
      "File " +
        componentFile +
        " already exists. Skipping...",
    );
  } else {
    writeFileSync(
      componentFile,
      componentFileTemplate
        .split("COMPONENT_NAME_SNAKE")
        .join(snake_case)
        .split("COMPONENT_NAME")
        .join(componentName),
    );
  }

  if (existsSync(testFile)) {
    console.log(
      "File " + testFile + " already exists. Skipping...",
    );
  } else {
    writeFileSync(
      testFile,
      testFileTemplate
        .split("COMPONENT_NAME")
        .join(componentName),
    );
  }
});
