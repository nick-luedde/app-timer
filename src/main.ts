import { createApp } from 'vue';
import DockableTimer from './DockableTimer.vue';

export const app = createApp({
  template: `
    <section style="padding: 3rem; border: 1px solid gray;">
      <h1>Dockable timer example app</h1>
      <DockableTimer />
    </section>
  `
});

app.mount('#app');