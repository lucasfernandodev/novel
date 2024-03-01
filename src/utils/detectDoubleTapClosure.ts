export function detectDoubleTapClosure(fn: () => void) {
  let lastTap = 0;
  let timeout: string | number | NodeJS.Timeout | undefined;
  return function detectDoubleTap(event: TouchEvent) {
    const curTime = new Date().getTime();
    const tapLen = curTime - lastTap;
    if (tapLen < 500 && tapLen > 0) {
      fn();
      event.preventDefault();
    } else {
      timeout = setTimeout(() => {
        clearTimeout(timeout);
      }, 500);
    }
    lastTap = curTime;
  };
}