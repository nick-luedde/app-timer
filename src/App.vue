<template>

  <main class="theme" :class="darkTheme ? 'dark-theme' : 'light-theme'" style="padding: 5rem; height: 100vh;">
    <section
      style="border: 1px solid gray; padding: 1.5rem; height: 100%; border-radius: 6px; box-shadow: 2px 2px 0 0;">
      <div style="display: flex;">
        <h1 style="flex-grow: 1;">Example app for app timer</h1>

        <button style="background-color: var(--white); border: 1px solid transparent;"
          :title="darkTheme ? 'Switch to light theme' : 'Switch to dark theme'" @click="toggleTheme">

          <svg v-if="darkTheme"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ffffff">
            <path
              d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" />
          </svg>
          <svg v-if="!darkTheme"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000">
            <path
              d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
          </svg>

        </button>
      </div>
      <hr style="margin-top: .75rem; margin-bottom: 1.25rem;">

      <ul style="width: 100%; list-style: none;">
        <li v-for="(evt, i) in events"
          :key="i">{{ i }} - {{ evt }}</li>
      </ul>
    </section>

    <DockableContainer v-model:position="timerPosition"
      style="margin: .75rem;"
      :dark="darkTheme"
      @update:position="handleUpdateDockablePosition">
      <AppTimer title="Example timer in action!"
        :expanded-style="{ 'max-width': '35vw', 'min-width': '304px' }"
        :dark="darkTheme"
        @title-click="handleTitleClick"
        @start="handleStart"
        @pause="handlePause"
        @stop="handleStop"
        @close="handleClose" />
    </DockableContainer>

  </main>

</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>

<style scoped>
.light-theme {
  --white: white;
  --dark: black;
  --scheme: light;
}

.dark-theme {
  --white: black;
  --dark: white;
  --scheme: dark;
}

.theme {
  color-scheme: var(--scheme);
  background-color: var(--white);
  color: var(--dark);
}
</style>

<script setup lang="ts">
import DockableContainer from './DockableContainer.vue';
import AppTimer from './AppTimer.vue';
import { ref } from 'vue';
import type { Ref } from 'vue';

const events: Ref<string[]> = ref([]);
const darkTheme = ref(false);

const toggleTheme = () => darkTheme.value = !darkTheme.value;

const timerPosition = ref('bottom-right');
const handleUpdateDockablePosition = (pos: string) => {

};

const handleTitleClick = () => {
  events.value.push(`[TITLE-CLICK]: at ${Date.now()}`);
};

const handleStart = () => {
  events.value.push(`[START]: at ${Date.now()}`);
};

const handlePause = ({ hr, min, sec, ms, totalms }: { hr: number, min: number, sec: number, ms: number, totalms: number }) => {
  events.value.push(`[PAUSE]: ${JSON.stringify({ hr, min, sec, ms, totalms })}`);
};

const handleStop = ({ hr, min, sec, ms, totalms }: { hr: number, min: number, sec: number, ms: number, totalms: number }) => {
  events.value.push(`[STOP]: ${JSON.stringify({ hr, min, sec, ms, totalms })}`);
};

const handleClose = () => {
  events.value.push(`[CLOSE]: at ${Date.now()}`);
};
</script>