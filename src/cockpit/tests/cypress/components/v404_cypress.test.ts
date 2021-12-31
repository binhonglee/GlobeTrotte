import { mount } from "@cypress/vue"
import V404 from "@/views/v404.vue"
describe("V404 component", () => {
  it("works", () => {
    mount(V404)
    cy.contains("Uhh, there's nothing to see here...").should("be.visible")
  })
})
