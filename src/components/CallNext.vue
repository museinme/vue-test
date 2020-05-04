<template>
  <div class="call-next" v-if="nextCall && Object.keys(nextCall).length !== 0">
    <h2 class="call-next__title">Next call</h2>
    <div class="call-next__container">
      <span class="call-next__item call-next__name">{{ nextCall.name }}</span>
      <span class="call-next__item call-next__phone">{{ nextCall.phone }}</span>
      <span class="call-next__item call-next__time">{{ formatTime(nextCall.time) }}</span>
    </div>
  </div>
</template>

<script>
import dateMixin from "@/mixins/dateMixin";

export default {
  name: 'CallNext',
  mixins: [
    dateMixin,
  ],
  props: {
    nextCall: {
      type: Object,
    }
  },
}
</script>

<style lang="less">
  @import '../css/variables';
  .call-next {
    & {
      position: relative;
      border: @border_default;
    }

    .call-next__title {
      font-size: 16px;
      margin: 20px 0;
    }

    .call-next__container {
      margin: 30px 0;
    }

    .call-next__item {
      display: inline-block;
      margin: 0 10px;
      padding: 3px;
      color: @color_primary__lighten;
      border: @border_lighten;
      font-size: 14px;
      font-weight: @font-weight_bold;
    }
  }

</style>
