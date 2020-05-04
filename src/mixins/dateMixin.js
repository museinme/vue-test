export default {
  methods: {
    formatTime: function (date) {
      if(!date) {
        return;
      }
      return `${prependZero(date.getMinutes())}:${prependZero(date.getSeconds())}`;
    }
  }
}

function prependZero(n){
  if(n <= 9){
    return "0" + n;
  }
  return n
}