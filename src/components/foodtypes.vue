<template>
  <div class="mt-5 sm:grid-cols-2">
    <input
      type="text"
      name="Food Types"
      placeholder="Enter your favourite food types"
      v-model="foodTypes"
      @keypress="isLetter($event)"
      @keyup.enter="addFoodType"
      class="input-fields"
    />
    <button
      type="button"
      @click="addFoodType"
      class="text-lg font-semibold w-[20%] relative float-right mt-[-36px] text-white bg-indigo-500 border border-transparent rounded-lg shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Add
    </button>
  </div>
  <div v-for="food in foods" :key="food" class="inline-block mt-1 px-1">
    <span
      class="bg-gray-300 pl-2 pr-1 rounded-full inline-block font-semibold text-lg tracking-normal text-gray-700"
      >{{ food
      }}<icon
        icon="clarity:times-circle-line"
        class="inline-block cursor-pointer mb-1"
        @click="deleteFood(food)"
    /></span>
  </div>
</template>

<script>
import "firebase/compat/auth";
import { reactive, toRefs } from "vue";

export default {
  props: {
    foods: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      foodTypes: "",
    });

    const addFoodType = () => {
      if (state.foodTypes.trim() !== "") {
        if (!props.foods.includes(state.foodTypes)) {
          props.foods.push(state.foodTypes);
        }
        state.foodTypes = "";
      }
    };

    const isLetter = (e) => {
      let char = String.fromCharCode(e.keyCode); // Get the character
      if (/^[A-Za-z]+$/.test(char)) return true;
      // Match with regex
      else e.preventDefault(); // If not match, don't add to input text
    };

    const deleteFood = (food) => {
      const index = props.foods.indexOf(food);
      if (index !== -1) {
        props.foods.splice(index, 1);
      }
    };

    return {
      ...toRefs(state),
      addFoodType,
      isLetter,
      deleteFood,
    };
  },
};
</script>
