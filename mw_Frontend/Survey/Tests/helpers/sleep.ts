export function sleep(milliseconds = 0) {
  return new Promise((resolve, reject) => setTimeout(resolve, milliseconds));
}

export async function loadTime() {
  await sleep();
  await sleep();
  await sleep();
  await sleep();
  await sleep();
}
