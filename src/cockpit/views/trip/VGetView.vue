<template lang="pug">
  .get_view_trip.narrow_content
    h1.title Trip
    |     Trip ID:
    el-input.tripSearchInput(
      ref="tripIDSearch"
      type="text"
      v-model="inputID"
      v-on:keydown.enter.native="gotoTrip"
    )
    el-button.tripSearchInput(v-on:click="gotoTrip") Find
    CTripInfo(
      v-if="trip.ID !== -1"
      :trip="trip"
      :user="user"
      :editable="owner"
    )
</template>

<script lang="ts">
import CTripInfo from "@/components/CTripInfo.vue";
import General from "@/shared/General";
import Trip from "@/wings/Trip";
import User from "@/wings/User";

interface Data {
  inputID: string;
  trip: Trip;
  user: User;
  owner: boolean;
}

export default {
  components: {
    CTripInfo,
  },
  data(): Data {
    return {
      inputID: "",
      trip: new Trip(),
      user: new User(),
      owner: false,
    };
  },
  props: ["id"],
  methods: {
    async init(): Promise<void> {
      if (this.$route.params.id === undefined) {
        this.$data.trip = new Trip();
        return;
      }
      this.$data.inputID = this.$route.params.id;

      this.$data.trip = await General.genTrip(
        Number(this.$route.params.id),
      );
      if (this.$data.trip.ID !== -1) {
        this.$data.owner = General.getIsCurrentUser(
          this.$data.trip.userID,
        );
        this.$data.user = await General.genUser(
          this.$data.trip.userID,
        );
        this.$nextTick(function () {
          this.$refs.tripIDSearch.focus();
        });

        return;
      }

      await this.$notify(
        General.notifConfig(
          "Error",
          "Trip not found.",
          "error",
        ),
      );
      this.$router.push("/trip/view");
    },
    gotoTrip(): void {
      const id: number = parseInt(this.$data.inputID, 10);
      if (String(id) !== this.$data.inputID) {
        alert("Invalid number");
      } else if (
        this.$route.params.id !== this.$data.inputID
      ) {
        this.$router.push({ path: `/trip/view/${id}` });
      }
    },
  },
  async beforeMount(): Promise<void> {
    await this.init();
  },
  watch: {
    "$route.path": async function (): Promise<void> {
      await this.init();
    },
  },
};
</script>

<style lang="scss">
@import "../../shared/lib";

.tripSearchInput {
  margin-left: 5px;
  display: inline;
}

.tripSearchInput .el-input__inner {
  width: 100px;
}
</style>
