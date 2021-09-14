function sleep(time) {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, time);
  });
}

function init() {
  sleep(3000).then(() => {
    console.log(99992)
  });
}
init();