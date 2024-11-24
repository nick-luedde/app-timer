<template>
  <aside :class="dark ? 'dark-theme' : 'light-theme'" style="position: fixed; z-index: 300"
    :style="coords">
    <section class="p-lg dockable-container"
      ref="draggable"
      tabindex="0"
      draggable="true"
      @drag="handleDrag"
      @dragstart="handleDragstart"
      @dragend="handleDragend"
      @drop="handleDrop"
      @focus="handleFocus"
      @blur="handleBlur">
      <slot></slot>
    </section>

    <div v-show="focussed || isdragging"
      aria-live="polite">
      <p v-show="position !== 'top-left'"
        class="m-md p-md bg-light dark-border"
        style="opacity: 75%; max-width: 45%; position: fixed; top: 0; left: 0">
        Top left: (Shift + t + l)
      </p>
      <p v-show="position !== 'top-right'"
        class="m-md p-md bg-light dark-border"
        style="opacity: 75%; max-width: 45%; position: fixed; top: 0; right: 0">
        Top right: (Shift + t + r)
      </p>
      <p v-show="position !== 'bottom-left'"
        class="m-md p-md bg-light dark-border"
        style="
          opacity: 75%;
          max-width: 45%;
          position: fixed;
          bottom: 0;
          left: 0;
        ">
        Bottom left: (Shift + b + l)
      </p>
      <p v-show="position !== 'bottom-right'"
        class="m-md p-md bg-light dark-border"
        style="
          opacity: 75%;
          max-width: 45%;
          position: fixed;
          bottom: 0;
          right: 0;
        ">
        Bottom right: (Shift + b + r)
      </p>
    </div>
  </aside>
</template>

<style scoped>
.dark-theme {
  --dark: whitesmoke;
  --light: darkgray;
  --white: black;
  --on-light-font: black;
  --focus-highlight: rgba(72, 95, 199, 0.25);
}

.light-theme {
  --dark: #333333;
  --light: lightgray;
  --white: white;
  --on-light-font: black;
  --focus-highlight: rgba(72, 95, 199, 0.25);
}

.p-lg {
  padding: 3.5rem;
}

.p-md {
  padding: 1.75rem;
}

.m-md {
  margin: 1.25rem;
}

.bg-light {
  background-color: var(--light);
  color: var(--on-light-font);
}

.dark-border {
  border: 1px solid var(--dark);
}

.dockable-container {
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
}

.dockable-container:active {
  cursor: grabbing;
  cursor: -moz-grabbing;
  cursor: -webkit-grabbing;
}

.dockable-container:focus {
  background-color: var(--focus-highlight);
}

.dockable-container:hover {
  background-color: var(--focus-highlight);
}
</style>

<script setup lang="ts">
import { defineProps, defineEmits, onMounted, onUnmounted, ref, computed } from 'vue';
import type { Ref } from 'vue';

export type DockableTContainerPosition = 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
export type DockableContainerX = 'left' | 'right';
export type DockableContainerY = 'top' | 'bottom';

const props = defineProps({
  position: {
    type: String,
    default: 'bottom-right'
  },
  dark: Boolean
});

const emit = defineEmits(["update:position"]);

const handler = (e: Event) => e.preventDefault();

onMounted(() => document.body.addEventListener("dragover", handler));
onUnmounted(() => document.body.removeEventListener("dragover", handler));

const focussed = ref(false);
const isdragging = ref(false);

const draggable: Ref<null | HTMLElement> = ref(null);

const coords = computed(() => {
  const pos = props.position;

  switch (pos) {
    case "top-left":
      return {
        top: 0,
        left: 0,
      };
    case "top-right":
      return {
        top: 0,
        right: 0,
      };
    case "bottom-left":
      return {
        bottom: 0,
        left: 0,
      };
    case "bottom-right":
    default:
      return {
        bottom: 0,
        right: 0,
      };
  }
});

const handleDrag = (e: DragEvent) => {
  setPosition(e.x, e.y);
};

const handleDragstart = (e: DragEvent) => {
  isdragging.value = true;
};

const handleDragend = (e: DragEvent) => {
  isdragging.value = false;
  setPosition(e.x, e.y);
};

const handleDrop = (e: DragEvent) => { };

const moveY = (pos: DockableContainerY) => {
  const [y, x] = props.position.split("-");
  emit("update:position", `${pos}-${x}`);
};

const moveX = (pos: DockableContainerX) => {
  const [y, x] = props.position.split("-");
  emit("update:position", `${y}-${pos}`);
};

const setPosition = (x: number, y: number) => {
  const isLeft = x < window.innerWidth / 2;
  const isTop = y < window.innerHeight / 2;

  const ypos = isTop ? "top" : "bottom";
  const xpos = isLeft ? "left" : "right";

  const pos = `${ypos}-${xpos}`;
  if (pos !== props.position) emit("update:position", pos);
};

const handleContainerKeydown = (e: KeyboardEvent) => {
  if (!e.shiftKey) return;

  switch (e.code) {
    case "KeyT":
      moveY("top");
      break;
    case "KeyB":
      moveY("bottom");
      break;
    case "KeyR":
      moveX("right");
      break;
    case "KeyL":
      moveX("left");
      break;
  }
};

const handleFocus = () => {
  focussed.value = true;
  attachKeydownlistener();
};

const handleBlur = () => {
  focussed.value = false;
  removeKeydownListener();
};

const attachKeydownlistener = () => {
  draggable.value?.addEventListener(
    "keydown",
    handleContainerKeydown
  );
};

const removeKeydownListener = () => {
  draggable.value?.removeEventListener(
    "keydown",
    handleContainerKeydown
  );
};

</script>