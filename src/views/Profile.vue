<template>
  <div>
    <navBar />
    
      <div
      class="grid my-4 grid-cols-2 w-10/12 lg:w-8/12 mx-auto bg-white rounded-xl shadow-lg overflow-hidden h-[32rem]"
    >
      <div
        :style="'background-image: url(' + imageUrls[currentImageIndex] + ');'"
        class="col-span-1 overflow-hidden h-screen flex flex-col justify-center bg-no-repeat bg-cover bg-center"
      ></div>
      <div class="container mx-auto ">
        
          <div class="w-full">
            <div class=" h-[9.5rem] overflow-hidden">
              <img
                v-if="loggedInUserState.coverPhotoUrl"
                class="object-contain w-full"
                :src="loggedInUserState.coverPhotoUrl"
              />
              <img
                v-else
                class="object-contain w-full"
                src="../assets/03.jpg"
                alt="Default Cover Photo"
              />
            </div>
            <div
              class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden"
            >
              <img
                v-if="loggedInUserState.profilePhotoUrl"
                class="object-contain w-full"
                :src="loggedInUserState.profilePhotoUrl"
              />
              <img
                v-else
                class="object-contain w-full"
                src="../assets/avatar.jpg"
                alt="Default Profile Photo"
              />
            </div>
            <div class="">
              <dl>
                <div
                  class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">Username</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ loggedInUserState.Username }}
                  </dd>
                </div>
                <div
                  class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">Gender</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ loggedInUserState.Gender }}
                  </dd>
                </div>
                <div
                  class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">
                    Email Address
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ loggedInUserState.Email }}
                  </dd>
                </div>
                <div
                  class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">
                    Phone Number
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ loggedInUserState.Phone_Number }}
                  </dd>
                </div>
                <div
                  class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                >
                  <dt class="text-sm font-medium text-gray-500">Role</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ loggedInUserState.Role }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        
      </div>
    </div>
   
    
  </div>
</template>

<script setup>
import navBar from "../components/navBar.vue";
import { onMounted, ref, onBeforeUnmount } from "vue";
import "firebase/compat/auth";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
// State for the logged-in user
const imageUrls = ref([
  "../../src/assets/w1.jpg",
  "../../src/assets/wp2.jpg",
  "../../src/assets/wp3.jpg",
  "../../src/assets/wp23.jpg",
  "../../src/assets/wp4.jpg",
  "../../src/assets/wp22.jpg",
  "../../src/assets/wp5.jpg",
  "../../src/assets/wp25.jpg",
  "../../src/assets/wp6.jpg",
  "../../src/assets/wp21.jpg",
  "../../src/assets/wp7.jpg",
  "../../src/assets/wp8.jpg",
  "../../src/assets/wp18.jpg",
  "../../src/assets/wp10.webp",
  "../../src/assets/wp17.jpg",
  "../../src/assets/wp11.png",
  "../../src/assets/wp12.jpg",
  "../../src/assets/wp13.jpg",
  "../../src/assets/wp14.jpg",
  "../../src/assets/wp15.jpg",
  "../../src/assets/wp16.jpg",

  // Add more image URLs as needed
]);
const currentImageIndex = ref(0);

const startSlideshow = () => {
  // Set an interval to switch images automatically
  const slideshowInterval = setInterval(() => {
    nextImage();
  }, 5000); // Change images every 5 seconds (adjust as needed)
  // Return the interval reference to be cleared later
  return slideshowInterval;
};
const slideshowInterval = startSlideshow(); // Initialize slideshowInterval

const stopSlideshow = (interval) => {
  // Clear the interval to stop the slideshow
  clearInterval(interval);
};

const nextImage = () => {
  // Increment the current image index and loop back to the first image
  currentImageIndex.value =
    (currentImageIndex.value + 1) % imageUrls.value.length;
};

// Clear the interval when the component is unmounted to prevent memory leaks
onBeforeUnmount(() => {
  stopSlideshow(slideshowInterval);
});
const loggedInUserState = userStore.loggedInUserData;

onMounted(async () => {
  await userStore.initializeUser();
});
</script>
