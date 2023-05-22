<template>
  <div class="flex flex-col space-y-4 w-[80%] ml-[-130px]">
    <div class="flex flex-col space-y-2">
      <div
        ref="profilePhotoDropZone"
        class="relative border-2 border-gray-300 cursor-pointer"
        @dragover.prevent="onDragOver"
        @dragenter.prevent="onDragEnter"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onCoverPhotoDrop"
        :class="{ 'border-green-500 border-dashed relative cursor-pointer': isDragging }"
        :style="{ cursor: isDragging ? 'copy' : 'pointer' }"
      >
        <input
          type="file"
          id="profile-photo"
          ref="profilePhotoInput"
          @change="onProfilePhotoChange"
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div class="text-center">
          <div class="text-gray-500" v-if="!profilePhotoPreviewUrl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 15s1-2 4-2 4 2 4 2 1-2 4-2 4 2 4 2v4H4v-4z"
              />
              <rect x="2" y="2" width="20" height="9" rx="2" ry="2" />
            </svg>
            <p class="mt-1 text-sm">
              {{
                isDragging
                  ? "Drop the file"
                  : profilePhotoUploadProgress > 0
                  ? "Uploading..."
                  : "Drag and drop your Pic or browse"
              }}
            </p>
          </div>
          <img
            v-if="profilePhotoPreviewUrl"
            :src="profilePhotoPreviewUrl"
            class="relative border-none object-cover cursor-pointer"
            @click="changeProfilePhoto"
          />
        </div>
      </div>
      <progress
        class="w-full h-2 bg-gray-200"
        :value="profilePhotoUploadProgress"
        max="100"
        v-if="profilePhotoUploadProgress > 0 && !profilePhotoPreviewUrl"
      ></progress>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import "firebase/compat/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default {
  setup() {
    const profilePhotoUploadProgress = ref(0);
    const isDragging = ref(false);
    const profilePhotoPreviewUrl = ref(null);
    const profilePhotoInput = ref(null);

    const onDragOver = (event) => {
      event.preventDefault();
      isDragging.value = true;
    };

    const onDragEnter = (event) => {
      event.preventDefault();
      isDragging.value = true;
    };

    const onDragLeave = (event) => {
      event.preventDefault();
      isDragging.value = false;
    };

    const onProfilePhotoChange = async (event) => {
      const file = event.target.files[0];
      uploadProfilePhoto(file);
    };

    const onProfilePhotoDrop = async (event) => {
      event.preventDefault();
      isDragging.value = false;
      const file = event.dataTransfer.files[0];
      uploadProfilePhoto(file);
    };

    const uploadProfilePhoto = async (file) => {
      const user = firebase.auth().currentUser;
      if (!user) {
        console.error("User not authenticated.");
        return;
      }
      const storageRef = firebase
        .storage()
        .ref(`users/${user.uid}/cover-photo/${file.name}`);
      const uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          profilePhotoUploadProgress.value =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.error(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log(`Cover photo uploaded: ${downloadURL}`);
            profilePhotoPreviewUrl.value = downloadURL;
            updateProfilePhoto(downloadURL);
          });
        }
      );
    };
    const updateProfilePhoto = async (downloadURL) => {
      const user = firebase.auth().currentUser;
      if (!user) {
        console.error("User not authenticated.");
        return;
      }
      const userRef = firebase.firestore().collection("users").doc(user.uid);
      try {
        await userRef.update({
          profilePhotoUrl: downloadURL,
        });
        console.log("Profile photo URL updated in user's document");
      } catch (error) {
        console.error(error);
      }
    };
    const changeProfilePhoto = () => {
      profilePhotoInput.value.click();
    };
    return {
      profilePhotoUploadProgress,
      isDragging,
      profilePhotoPreviewUrl,
      onDragLeave,
      onDragEnter,
      onDragOver,
      onProfilePhotoChange,
      onProfilePhotoDrop,
      changeProfilePhoto,
      profilePhotoInput,
      updateProfilePhoto
    };
  },
};
</script>
