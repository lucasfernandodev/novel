export function detectDoubleTapClosure(fn: () => void) {
  let lastTap = 0;
  let timer : string | number | NodeJS.Timeout | undefined;

  return function detectDoubleTap(event: TouchEvent, timeDiff = 350) {
    const currentTime = new Date().getTime();
    const tapLen = currentTime - lastTap;
    if (tapLen < timeDiff && tapLen > 0) {
      fn();
      event.preventDefault();
    } else {
      timer = setTimeout(() => {
        clearTimeout(timer);
      }, timeDiff);
    }
    
    lastTap = currentTime;
  };
}