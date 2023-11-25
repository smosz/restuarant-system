<template>
  <div>
    <navBar />
    
      <div
      class="grid my-4 grid-cols-2 w-10/12 mx-auto bg-white rounded-xl shadow-lg overflow-hidden h-[40rem] pfo"
    >
      <div
        :style="'background-image: url(' + imageUrls[currentImageIndex] + ');'"
        class="col-span-1 overflow-hidden flex flex-col justify-center bg-no-repeat bg-cover bg-top"
      ></div>
      <div class="container mx-auto ">
        
          <div class="w-full">
            <div class=" h-[17.5rem] overflow-hidden logc">
              <img
                v-if="userStore.loggedInUserData.coverPhotoUrl"
                class="object-contain w-full"
                :src="userStore.loggedInUserData.coverPhotoUrl"
              />
              <img
                v-else
                class="object-contain w-full"
                src="/b6.jpg"
                alt="Default Cover Photo"
              />
            </div>
            <div
              class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden"
            >
              <img
                v-if="userStore.loggedInUserData.profilePhotoUrl"
                class="object-contain w-full"
                :src="userStore.loggedInUserData.profilePhotoUrl"
              />
              <img
                v-else
                class="object-contain w-full"
                src="/avatar.jpg"
                alt="Default Profile Photo"
              />
            </div>
            <div class="pro">
              <dl>
                <div
                  class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 "
                >
                  <dt class="text-sm font-medium text-gray-500">Username</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ userStore.loggedInUserData.Username }}
                  </dd>
                </div>
                <div
                  class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 "
                >
                  <dt class="text-sm font-medium text-gray-500">Gender</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ userStore.loggedInUserData.Gender }}
                  </dd>
                </div>
                <div
                  class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 "
                >
                  <dt class="text-sm font-medium text-gray-500">
                    Email Address
                  </dt>
                  <dd class=" text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ userStore.loggedInUserData.Email }}
                  </dd>
                </div>
                <div
                  class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 "
                >
                  <dt class="text-sm font-medium text-gray-500">
                    Phone Number
                  </dt>
                  <dd class=" text-sm text-gray-900 proh ">
                    {{ userStore.loggedInUserData.Phone_Number }}
                  </dd>
                </div>
                <div
                  class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 "
                >
                  <dt class="text-sm font-medium text-gray-500">Role</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ userStore.loggedInUserData.Role }}
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
  "/w1.jpg",
  "/wp2.jpg",
  "/wp3.jpg",
  "/wp23.jpg",
  "/wp4.jpg",
  "/wp22.jpg",
  "/wp5.jpg",
  "/wp25.jpg",
  "/wp6.jpg",
  "/wp21.jpg",
  "/wp7.jpg",
  "/wp8.jpg",
  "/wp18.jpg",
  "/wp10.webp",
  "/wp17.jpg",
  "/wp11.png",
  "/wp12.jpg",
  "/wp13.jpg",
  "/wp14.jpg",
  "/wp15.jpg",
  "/wp16.jpg",

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

onMounted(async () => {
  await userStore.fetchLoggedInUserData()
  userStore.loggedInUserData
});
</script>
