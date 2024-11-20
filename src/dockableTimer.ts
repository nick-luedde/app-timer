import { reactive } from "vue";

export const useDockableTimer = ({ onStop, }: DockableTimerOptions = {}) => {

  const timing = reactive({
    start: null,
    status: 'stopped',
    ms: 0
  });

  const onStopHandler = onStop || (() => {});

  /**
   * Handle stopwatch/timing
   */
  const timer = () => {
    const animation = () => {
      if (timing.status === 'timing') {
        timing.ms = Date.now() - timing.start;
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

      timing.ms = Date.now() - timing.start;
      timing.status = 'paused';
    };

    //stop and complete
    const stop = () => {
      if (timing.status === 'stopped')
        return;

      if (timing.status === 'timing')
        timing.ms = Date.now() - timing.start;

      onStopHandler(timing.ms);

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