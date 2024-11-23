<template>
  <section style="position: relative">
    <!-- Collapsed timer -->
    <p v-show="showHelp"
      class="box p-2 mb-3 is-size-7"
      style="position: absolute; top: -56px"
      role="alert">
      Press [e] to expand
    </p>
    <div v-if="!expanded"
      ref="expandTimerActionEl"
      class="box mb-0 rounded p-3 has-background-white light-border"
      tabindex="0"
      title="Click to expand"
      :style="collapsedStyle"
      @click="handleExpand"
      @keydown="handleCollapsedKeydown"
      @focus="showHelp = true"
      @blur="showHelp = false">
      <div class="has-text-centered pb-1 is-clickable">
        {{ displayTime.hr }}:{{ displayTime.min }}:{{
          String(displayTime.sec).padStart(2, "0")
        }}
      </div>
      <div class="buttons">
        <button class="button is-small is-rounded"
          :title="isTiming ? 'Pause' : 'Start'"
          :disabled="disabled"
          @click="isTiming ? handlePause($event) : handleStart($event)">
          <span class="icon"
            :class="isTiming ? '' : 'has-text-success'">
            <span aria-hidden="true">
              <svg v-show="isTiming"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed">
                <path
                  d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z" />
              </svg>
              <svg v-show="!isTiming"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed">
                <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
              </svg>
            </span>
          </span>
        </button>
        <button class="button is-small is-rounded"
          title="Stop"
          :disabled="disabled"
          @click="handleStop">
          <span class="icon has-text-danger">
            <span aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed">
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
      class="card">
      <header class="card-header">
        <p class="card-header-title">
          <button class="button is-small is-white mr-2"
            title="Close"
            @click="handleClose">
            <span class="icon">
              <span aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed">
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
        <button class="card-header-icon"
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
                fill="#e8eaed">
                <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
              </svg>
              <svg v-show="expanded"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed">
                <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
              </svg>
            </span>
          </span>
        </button>
      </header>
      <div class="card-content">
        <div class="card-header-title is-size-7">
          <div class="content has-text-weight-bold is-flex-grow-1">
            <article class="is-flex is-flex-wrap-nowrap is-justify-content-center">
              <div class="p-4 light-border">
                {{ displayTime.hr }}
              </div>
              <div class="pt-4 pb-4 pr-2 pl-2">:</div>
              <div class="p-4 light-border">
                {{ displayTime.min }}
              </div>
              <div class="pt-4 pb-4 pr-2 pl-2">:</div>
              <div class="p-4 light-border">
                {{ String(displayTime.sec).padStart(2, "0") }}
              </div>
              <div class="pt-4 pb-4 pr-2 pl-2 is-hidden-touch">:</div>
              <div class="p-4 light-border is-hidden-touch">
                {{ String(displayTime.ms).padStart(3, "0") }}
              </div>
            </article>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <button class="button is-white card-footer-item"
          title="Start timer"
          :disabled="disabled"
          @click.prevent="handleStart">
          <span class="icon-text">
            <span class="icon has-text-success">
              <span aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed">
                  <path d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z" />
                </svg>
              </span>
            </span>
            <span class="is-hidden-touch"> Start </span>
          </span>
        </button>
        <button class="button is-white card-footer-item"
          title="Pause timer"
          :disabled="disabled"
          @click.prevent="handlePause">
          <span class="icon-text">
            <span class="icon">
              <span aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed">
                  <path
                    d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z" />
                </svg>
              </span>
            </span>
            <span class="is-hidden-touch"> Pause </span>
          </span>
        </button>
        <button class="button is-white card-footer-item"
          title="Stop timer"
          :disabled="disabled"
          @click.prevent="handleStop">
          <span class="icon-text">
            <span class="icon has-text-danger">
              <span aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed">
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
.box {
  padding: 1.25rem;
}

.bg-white {
  background-color: white;
}

.corners {
  border-radius: 6px;
}

.p-s {
  padding: .25rem;
}

.p-m {
  padding: .75rem;
}

.p-l {
  padding: 1.5rem;
}

.light-border {
  border: 1px solid lightgray;
}

.flex {
  display: flex;
}


</style>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, nextTick } from "vue";
import { useDockableTimer } from "./dockableTimer";

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
});

const emit = defineEmits(['start', 'pause', 'stop', 'close', 'title-click']);

const timer = useDockableTimer();

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

const setExpanded = (val) => {
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