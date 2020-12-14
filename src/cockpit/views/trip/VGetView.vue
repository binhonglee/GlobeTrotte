<template lang="pug">
  .search.narrow_content
    h1.title Trip
    |     Trip ID:
    el-input.tripSearchInput#getTripID(
      type="text"
      v-model="inputID"
      autofocus=true
    )
    el-button.tripSearchInput(v-on:click="gotoTrip") Find
    CTripInfo(
      v-if="trip.ID !== -1"
      :trip="trip"
      :editable="owner"
    )
</template>

<script lang="ts">
import {
  Component,
  Watch,
  Vue,
} from "vue-property-decorator";
import CTripInfo from "@/components/CTripInfo.vue";
import HTTPReq from "@/shared/HTTPReq";
import General from "@/shared/General";
import Trip from "@/wings/Trip";

@Component({
  data() {
    return {
      inputID: "",
      trip: new Trip(),
      owner: Boolean,
    };
  },
  props: ["id"],
  components: {
    CTripInfo,
  },
})
export default class VGetID extends Vue {
  @Watch("$route.path") private async onRouteChange() {
    await this.init();
  }

  private async beforeMount() {
    await this.init();
  }

  private async init() {
    if (this.$route.params.id === undefined) {
      this.$data.trip.name = "";
      return;
    }
    this.$data.inputID = this.$route.params.id;

    try {
      const parsedData = await HTTPReq.genGET(
        "trip/" + this.$route.params.id,
      );
      if (parsedData !== "") {
        this.$data.trip = new Trip(parsedData);
        this.$data.owner = await this.ifUserIsOwner(
          this.$data.trip.userID,
        );
        return;
      }
    } catch (_) {}
    await this.$alert("Trip not found.", "Error", {
      confirmButtonText: "OK",
    });
    this.$router.push("/trip/view");
  }

  private gotoTrip(): void {
    const id: number = parseInt(this.$data.inputID, 10);
    if (String(id) !== this.$data.inputID) {
      alert("Invalid number");
    } else if (
      this.$route.params.id !== this.$data.inputID
    ) {
      this.$router.push({ path: `/trip/view/${id}` });
    }
  }

  private async ifUserIsOwner(
    userID: number,
  ): Promise<boolean> {
    return (await General.genCurrentUser()).ID === userID;
  }
}
</script>

<style lang="scss">
@import "../../shared/lib";

.tripSearchInput {
  margin-left: 5px;
  display: inline;
}
#getTripID {
  width: 100px;
}
</style>
