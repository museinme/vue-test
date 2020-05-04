<template>
  <div id="app">
    <div class="app-container">
      <call-next :next-call="nextCall" />
      <call-add-form @add-call="addCall($event)" />
      <call-list :calls="calls" @sort-calls="sortCalls($event)" @delete-call="handleDeleteCall($event)"/>
    </div>
  </div>
</template>

<script>
import CallAddForm from "@/components/CallAddForm";
import CallList from "@/components/CallList";
import CallNext from "@/components/CallNext";

export default {
  name: 'App',
  components: {
    CallAddForm,
    CallList,
    CallNext,
  },
  data () {
    return {
      calls: [],
      nextCall: null,
    }
  },
  methods: {
    getNextCall: function () {
      if (this.calls.length) {
        let nextCall = null;
        this.calls.forEach( (call) => {
          if (!call.pastCall) {
            if (nextCall === null) {
              nextCall = call;
            } else if (call.time < nextCall.time) {
              nextCall = call;
            }
          }
        });
        this.nextCall = nextCall;
      }
    },
    addCall: function (call) {
      const calls = this.calls;
      calls.push(call);
      localStorage.setItem('calls' , JSON.stringify(calls));
      this.getNextCall();
    },
    sortCalls: function (data) {
      const {field, order} = data;

      this.calls.sort((a, b) => {
        if (a[field] === b[field]) {
          return 0;
        }
        if (order === 'desc') {
          return a[field] > b[field] ? -1 : 1;
        } else {
          return a[field] > b[field] ? 1 : -1;
        }
      })
    },
    handleDeleteCall: function (id) {
      this.calls = this.calls.filter((item) => id !== item.id);
      localStorage.setItem('calls' , JSON.stringify(this.calls));
    },
    setPastCall() {
      this.calls.forEach( (call) => {
        if (call.time < new Date()) call.pastCall = true;
      })
    },
  },
  mounted () {
    const data = localStorage.getItem('calls');
    setInterval(this.setPastCall, 1000);
    setInterval(this.getNextCall, 1000);
    if (data) {
      const calls = JSON.parse(data);
      this.calls = calls.map((call) => {
        call.time = new Date(call.time);
        return call;
      })
      this.setPastCall();
      this.getNextCall();
      this.sortCalls({field: 'time', order: 'asc'});
    }
  },
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .app-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 10em;
    grid-row-gap: 1em;
  }

  .call-add-form {
    grid-column-start: 2;
    grid-column-end: 2;
  }

  .call-list {
    grid-column-start: 2;
    grid-column-end: 2;
    grid-row-start: 2;
    grid-row-end: 2;
  }
</style>
