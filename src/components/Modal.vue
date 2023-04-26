<template>
  <div v-show="modalActive" class="modal">
    <div v-show="modalActive" class="modal-inner">
      <div class="modal-content">
        <!-- <Icon icon="mingcute:close-circle-line" class="icon" @click="toggleModal" /> -->
        <Vue3Lottie :animationData="thank" :height="200" />
        <div class="redirect">
          <h2>Redirecting</h2>
          <Vue3Lottie :animationData="redirection" :height="10" :width="200" />
        </div>
        <!-- <slot /> -->
      </div>
    </div>
  </div>
</template>
<script>
import "vue3-lottie/dist/style.css";
import thank from "../assets/thank.json";
import redirection from "../assets/redirection.json";
import { ref } from "vue";
export default {
  name: "Modal",
  props: ["modalActive"],
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };
    const modalActive = ref(true);
    // const toggleModal = () => {
    //   modalActive.value = !modalActive.value;
    // };
    return { close,  modalActive, thank, redirection };
  },
};
</script>
