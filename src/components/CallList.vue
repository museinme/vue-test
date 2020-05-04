<template>
  <div class="call-list" v-if="this.calls.length">
    <ul class="call-list__list table-list">
      <div class="table-list__header">
        <span class="table-list__header__item">
          Name
          <span
            class="table-list__header__controls"
            @click="sortCalls('name')"
          />
        </span>
        <span class="table-list__header__item">Phone Number</span>
        <span class="table-list__header__item">
          Time
          <span
            class="table-list__header__controls"
            @click="sortCalls('time')"
          />
        </span>
        <span class="table-list__header__item"></span>
        <span class="table-list__header__item"></span>
      </div>
      <li class="table-list__row" v-for="call in calls" :key="call.id">
        <span class="table-list__row__item name">{{call.name}}</span>
        <span class="table-list__row__item phone">{{call.phone}}</span>
        <span class="table-list__row__item time">{{formatTime(call.time)}}</span>
        <span class="table-list__row__item table-list__row__item_delete" @click="deleteCall(call.id)">delete</span>
        <input class="table-list__row__item checkbox" type="checkbox" :checked="call.pastCall" :disabled="call.pastCall">
      </li>
    </ul>
  </div>
</template>

<script>
import dateMixin from "@/mixins/dateMixin";

export default {
  name: 'CallList',
  mixins: [
    dateMixin,
  ],
  data() {
    return {
      currentSortField: 'time',
      currentSortOrder: 'asc',
    }
  },
  props: {
    calls : {
      type: Array,
    }
  },
  methods: {
    sortCalls(field) {
      let order = 'asc';
      if (field === this.currentSortField) {
        order = this.currentSortOrder === 'asc' ? 'desc' : 'asc';
      }

      this.currentSortField = field;
      this.currentSortOrder = order;

      this.$emit('sort-calls', {field, order})
    },
    deleteCall(id) {
      this.$emit('delete-call', id);
    },
  },
}
</script>

<style lang="less">
  @import '../css/variables';
  .call-list {

    .table-list {
      & {
        position: relative;
        border: @border_default;
        margin: 0;
        padding: 0;
        list-style-type: none;
        display: table;
        width: 100%;
      }

      .table-list__header {
        & {
          background-color: lightgray;
          display: table-row;
        }

        .table-list__header__item {
          position: relative;
          display:table-cell;
        }

        .table-list__header__controls {
          & {
            position: absolute;
            top: 5%;
            right: 5%;
            cursor: pointer;
          }

          &:before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid black;
          }

          &:after {
            content: '';
            position: absolute;
            top: 7px;
            right: 0;
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid black;
            transform: rotate(180deg);
          }
        }
      }

      .table-list__row {
        & {
          display: table-row;
        }

        .table-list__row__item {
          & {
            display:table-cell;
          }
          
          &_delete {
            cursor: pointer;
            color: cadetblue;
            text-decoration: underline;
          }
        }
      }
    }
  }


</style>
