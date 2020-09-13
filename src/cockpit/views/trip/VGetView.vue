<template lang="pug">
  .search
    h1.title Trip
    |     Trip ID:
    el-input.tripSearchInput#getTripID(
      type="text"
      v-model="inputID"
      autofocus=true
    )
    el-button.tripSearchInput(v-on:click="gotoTrip") Find
    CTripInfo(
      v-if="trip.name !== ''"
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
import CTripInfo from "../../components/CTripInfo.vue";
import HTTPReq from "../../shared/HTTPReq";
import General from "../../shared/General";
import Trip from "../../wings/Trip";

@Component({
  data() {
    return {
      inputID: "",
      trip: new Trip(),
      owner: false,
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

    try {
      const parsedData = await HTTPReq.genGET(
        "trip/" + this.$route.params.id,
      );
      this.$data.trip = new Trip(parsedData);
      this.$data.owner = this.ifUserIsOwner(
        this.$data.trip.userID,
      );
    } catch (e) {
      alert("Error. Trip not found.");
    }
  }

  private gotoTrip(): void {
    const id: number = parseInt(this.$data.inputID, 10);
    if (String(id) !== this.$data.inputID) {
      alert("Invalid number");
    } else {
      this.$router.push({ path: `/trip/view/${id}` });
    }
  }

  // eslint-disable-next-line
  private async ifUserIsOwner(userID: number): Promise<boolean> {
    return (await General.genCurrentUser()).ID === userID;
    // TODO: Check if the current user is owner of the Trip
    // return true;
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
