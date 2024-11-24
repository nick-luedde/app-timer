<template>

  <main style="padding: 5rem; height: 100vh;">
    <section
      style="border: 1px solid gray; padding: 1.5rem; height: 100%; border-radius: 6px; box-shadow: 2px 2px 0 0;">
      <h1>Example app for app timer</h1>
      <hr style="margin-top: .75rem; margin-bottom: 1.25rem;">

      <ul style="width: 100%; list-style: none;">
        <li v-for="(evt, i) in events"
          :key="i">{{ i }} - {{ evt }}</li>
      </ul>
    </section>

    <DockableContainer v-model:position="timerPosition"
      style="margin: .75rem;"
      @update:position="handleUpdateDockablePosition">
      <AppTimer title="Example timer in action!"
        :expanded-style="{ 'max-width': '35vw', 'min-width': '304px' }"
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

<script setup lang="ts">
import DockableContainer from './DockableContainer.vue';
import AppTimer from './AppTimer.vue';
import { ref } from 'vue';
import type { Ref } from 'vue';

const events: Ref<string[]> = ref([]);

const timerPosition = ref('');
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