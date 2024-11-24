# AppTimer

This Vue.js project includes a dock-able component and a stopwatch/timer overlay component. Used together, the resulting timer can be docked to any corner of the browser window.

The [AppTimer.vue](src/AppTimer.vue) and [DockableContainer.vue](src/DockableContainer.vue) component files can be dropped into any vuew SFC project.

## Using the component

Here's a basic example of using the file:

```html
<template>

  <DockableContainer 
    v-model:position="timerPosition"
    style="margin: .75rem;"
    :dark="true"
    @update:position="handleUpdateDockablePosition"
  >
    
    <AppTimer 
      title="Example timer in action!"
      :expanded-style="{ 'max-width': '35vw', 'min-width': '304px' }"
      :dark="true"
      @title-click="handleTitleClick"
      @start="handleStart"
      @pause="handlePause"
      @stop="handleStop"
      @close="handleClose" 
    />
  
  </DockableContainer>

</template>

<script setup lang="ts">
import DockableContainer from './DockableContainer.vue';
import AppTimer from './AppTimer.vue';
import { ref } from 'vue';

const timerPosition = ref('bottom-right');
const handleUpdateDockablePosition = (pos: string) => {
  //TODO: do something with the new position if needed
};

const handleTitleClick = () => {
  //TODO: ...
};

const handleStart = () => {
  //TODO: ...
};

const handlePause = ({ hr, min, sec, ms, totalms }: { hr: number, min: number, sec: number, ms: number, totalms: number }) => {
  //TODO: ...
};

const handleStop = ({ hr, min, sec, ms, totalms }: { hr: number, min: number, sec: number, ms: number, totalms: number }) => {
  //TODO: ...
};

const handleClose = () => {
  //TODO: ...
};

</script>
```

For a bit more in-depth look, [check out App.vue](src/App.vue)