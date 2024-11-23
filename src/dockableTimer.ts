import { reactive } from "vue";

export const useDockableTimer = () => {
  const startingTiming: {
    start: null | number,
    status: 'stopped' | 'timing' | 'paused',
    ms: number
  } = {
    start: null,
    status: 'stopped',
    ms: 0
  };

  const timing = reactive(startingTiming);

  /**
   * Handle stopwatch/timing
   */
  const timer = () => {
    const animation = () => {
      if (timing.status === 'timing') {
        timing.ms = Date.now() - (timing.start || 0);
        requestAnimationFrame(animation);
      }
    };

    const reset = () => {
      timing.start = null;
      timing.status = 'stopped';
      timing.ms = 0;
    };

    // start
    const start = ({ withAnimation = true } = {}) => {
      timing.start = Date.now() - timing.ms;
      timing.status = 'timing';
      if (withAnimation)
        animation();
    };

    // pause
    const pause = () => {
      if (timing.status !== 'timing')
        return;

      timing.ms = Date.now() - (timing.start || 0);
      timing.status = 'paused';
    };

    //stop and complete
    const stop = () => {
      if (timing.status === 'stopped')
        return;

      if (timing.status === 'timing')
        timing.ms = Date.now() - (timing.start || 0);

      reset();
    };

    /** TODO: not implemented */
    const reminder = (fn, interval) => {
      // HEY ITS BEEN A WHILE SINCE YOU STARTED YOUR TIMER
      // or something like that

      //setup for reminder fn that occurs on a given timing interval
    };

    return {
      reset,
      start,
      pause,
      stop,
      animation,
      reminder
    };
  };

  return {
    timing,
    timer: timer(),
  };
};