<template>
  <section style="position: relative"
    :class="dark ? 'dark-theme' : 'light-theme'">
    <!-- Collapsed timer -->
    <p v-show="showHelp"
      class="box p-sm font-sm"
      style="position: absolute; top: -64px"
      role="alert">
      Press [e] to expand
    </p>
    <div v-if="!expanded"
      ref="expandTimerActionEl"
      class="box corners p-md bg-white light-border"
      tabindex="0"
      title="Click to expand"
      :style="collapsedStyle"
      @click="handleExpand"
      @keydown="handleCollapsedKeydown"
      @focus="showHelp = true"
      @blur="showHelp = false">
      <div class="text-center pb-sm action">
        {{ displayTime.hr }}:{{ displayTime.min }}:{{
          String(displayTime.sec).padStart(2, "0")
        }}
      </div>
      <div class="flex flex-justify-between">
        <button class="btn is-small corners"
          :title="isTiming ? 'Pause' : 'Start'"
          :disabled="disabled"
          @click="isTiming ? handlePause($event) : handleStart($event)">
          <span class="icon">
            <span aria-hidden="true">
              <svg v-show="isTiming"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                class="svg-dark">
                <path
                  d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z" />
              </svg>
              <svg v-show="!isTiming"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                class="svg-green">
                <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
              </svg>
            </span>
          </span>
        </button>
        <button class="btn is-small corners"
          title="Stop"
          :disabled="disabled"
          @click="handleStop">
          <span class="icon">
            <span aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                class="svg-red">
                <path d="M320-640v320-320Zm-80 400v-480h480v480H240Zm80-80h320v-320H320v320Z" />
              </svg>
            </span>
          </span>
        </button>
      </div>
    </div>

    <!-- Expanded timer -->
    <div v-if="expanded"
      :style="expandedStyle"
      class="box bg-white light-border">
      <header class="flex mb-md">
        <p class="flex flex-align-center">
          <button class="btn is-small btn-white mr-2"
            title="Close"
            @click="handleClose">
            <span class="icon">
              <span aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  class="svg-dark">
                  <path
                    d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              </span>
            </span>
          </button>
          <a style="word-break: break-all;"
            href="#"
            @click.prevent="handleTitleClick">
            [{{ title }}]
          </a>
        </p>
        <button class="btn btn-white"
          ref="collapseTimerActionEl"
          :title="expandLabel"
          @click="handleCollapse">
          <span class="icon">
            <span aria-hidden="true">
              <svg v-show="!expanded"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                class="svg-dark">
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
              <svg v-show="expanded"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                class="svg-dark">
                <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
              </svg>
            </span>
          </span>
        </button>
      </header>
      <div class="mb-md">
        <div class="font-sm">
          <div class="text-bold flex-grow-1">
            <article class="flex flex-nowrap flex-justify-center">
              <div class="p-md light-border">
                {{ displayTime.hr }}
              </div>
              <div class="time-block">:</div>
              <div class="p-md light-border">
                {{ displayTime.min }}
              </div>
              <div class="time-block">:</div>
              <div class="p-md light-border">
                {{ String(displayTime.sec).padStart(2, "0") }}
              </div>
              <div class="time-block is-hidden-touch">:</div>
              <div class="p-md light-border is-hidden-touch">
                {{ String(displayTime.ms).padStart(3, "0") }}
              </div>
            </article>
          </div>
        </div>
      </div>
      <footer class="flex flex-justify-between">
        <button class="btn btn-white"
          title="Start timer"
          :disabled="disabled"
          @click.prevent="handleStart">
          <span class="flex flex-align-center">
            <span class="icon">
              <span aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  class="svg-green">
                  <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
                </svg>
              </span>
            </span>
            <span class="is-hidden-touch"> Start </span>
          </span>
        </button>
        <button class="btn btn-white"
          title="Pause timer"
          :disabled="disabled"
          @click.prevent="handlePause">
          <span class="flex flex-align-center">
            <span class="icon text-dark">
              <span aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  class="svg-dark">
                  <path
                    d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z" />
                </svg>
              </span>
            </span>
            <span class="is-hidden-touch"> Pause </span>
          </span>
        </button>
        <button class="btn btn-white"
          title="Stop timer"
          :disabled="disabled"
          @click.prevent="handleStop">
          <span class="flex flex-align-center">
            <span class="icon text-red">
              <span aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  class="svg-red">
                  <path d="M320-640v320-320Zm-80 400v-480h480v480H240Zm80-80h320v-320H320v320Z" />
                </svg>
              </span>
            </span>
            <span class="is-hidden-touch"> Stop </span>
          </span>
        </button>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.dark-theme {
  --red: red;
  --green: green;
  --dark: whitesmoke;
  --light: darkgray;
  --white: black;
}

.light-theme {
  --red: darkred;
  --green: darkgreen;
  --dark: #333333;
  --light: lightgray;
  --white: white;
}

.colors {
  background-color: whitesmoke;
}

.time-block {
  padding-top: .75rem;
  padding-bottom: .75rem;
  padding-left: .25rem;
  padding-right: .25rem;
}

.box {
  padding: 1.25rem;
}

.text-green {
  color: green;
}

.svg-green {
  fill: green;
}

.text-red {
  color: var(--red);
}

.svg-red {
  fill: var(--red);
}

.text-dark {
  color: var(--dark);
}

.svg-dark {
  fill: var(--dark);
}

.text-bold {
  font-weight: bold;
}

.btn {
  background-color: var(--white);
  border: 1px solid var(--light);
}

.btn-white {
  border: 1px solid transparent;
}

.bg-white {
  background-color: var(--white);
}

.corners {
  border-radius: 6px;
}

.p-sm {
  padding: .25rem;
}

.pb-sm {
  padding-bottom: .25rem;
}

.p-md {
  padding: .75rem;
}

.p-lg {
  padding: 1.5rem;
}

.mb-sm {
  margin-bottom: .25rem;
}

.mb-md {
  margin-bottom: .75rem;
}

.light-border {
  border: 1px solid var(--light);
}

.flex {
  display: flex;
}

.flex-nowrap {
  flex-wrap: nowrap;
}

.flex-justify-center {
  justify-content: center;
}

.flex-justify-between {
  justify-content: space-between;
}

.flex-align-center {
  align-items: center;
}

.flex-grow-1 {
  flex-grow: 1;
}

.text-sm {
  font-size: .75rem;
}

.text-center {
  text-align: center;
}

.action {
  cursor: pointer;
}
</style>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, reactive, nextTick } from "vue";

import type { Ref } from "vue";

const props = defineProps({
  title: String,
  expanded: Boolean,
  expandedStyle: {
    type: Object,
    default: () => ({})
  },
  collapsedStyle: {
    type: Object,
    default: () => ({})
  },
  disabled: Boolean,
  dark: Boolean
});

const emit = defineEmits(['start', 'pause', 'stop', 'close', 'title-click']);

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
const setupTimer = () => {
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
  const reminder = (fn: () => void, interval: number) => {
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

const timer = {
  timing,
  timer: setupTimer(),
};

const collapseTimerActionEl: Ref<null | HTMLElement> = ref(null);
const expandTimerActionEl: Ref<null | HTMLElement> = ref(null);

const expanded = ref(false);
const showHelp = ref(false);

const displayTime = computed(() => {
  //https://stackoverflow.com/questions/19700283/how-to-convert-time-in-milliseconds-to-hours-min-sec-format-in-javascript
  const totalms = timer.timing.ms;
  const ms = Math.floor(totalms % 1000);
  const sec = Math.floor((totalms / 1000) % 60);
  const min = Math.floor((totalms / 1000 / 60) % 60);
  const hr = Math.floor(totalms / 1000 / 60 / 60);

  return {
    ms,
    sec,
    min,
    hr,
    totalms
  };
});

const isTiming = computed(() => timer.timing.status === 'timing');
const expandLabel = computed(() => props.expanded ? 'Collapse timer' : 'Expand timer');

const setExpanded = (val: boolean) => {
  expanded.value = val;
};

const handleClose = () => {
  timer.timer.reset();
  emit('close');
};

const handleStart = (e: Event) => {
  e.stopPropagation();
  timer.timer.start({ withAnimation: true });
  emit('start');
};

const handlePause = (e: Event) => {
  e.stopPropagation();
  const { hr, min, sec, ms, totalms } = displayTime.value;
  timer.timer.pause();
  emit('pause', { hr, min, sec, ms, totalms });
};

const handleStop = (e: Event) => {
  e.stopPropagation();
  const { hr, min, sec, ms, totalms } = displayTime.value;
  timer.timer.stop();
  emit('stop', { hr, min, sec, ms, totalms });
};

const handleExpand = () => {
  setExpanded(true);
  nextTick().then(() =>
    requestAnimationFrame(() => collapseTimerActionEl.value?.focus())
  );
};

const handleCollapse = () => {
  setExpanded(false);
  nextTick().then(() =>
    requestAnimationFrame(() => expandTimerActionEl.value?.focus())
  );
};

const handleCollapsedKeydown = (e: KeyboardEvent) => {
  if (e.code === "KeyE") handleExpand();
};

const handleTitleClick = () => emit('title-click');
</script>