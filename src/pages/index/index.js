function sleep(time) {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, time);
  });
}

async function init() {
  await sleep(3000);
}
init();
