<template>
  <div class="flex flex-col space-y-4 w-[80%] ml-[-130px]">
    <div class="flex flex-col space-y-2">
      <div
        ref="coverPhotoDropZone"
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
          id="cover-photo"
          ref="coverPhotoInput"
          @change="onCoverPhotoChange"
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div class="text-center">
          <div class="text-gray-500" v-if="!coverPhotoPreviewUrl">
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
                  : coverPhotoUploadProgress > 0
                  ? "Uploading..."
                  : "Drag and drop your Pic or browse"
              }}
            </p>
          </div>
          <img
            v-if="coverPhotoPreviewUrl"
            :src="coverPhotoPreviewUrl"
            class="relative border-none object-cover cursor-pointer"
            @click="changeCoverPhoto"
          />
        </div>
      </div>
      <progress
        class="w-full h-2 bg-gray-200"
        :value="coverPhotoUploadProgress"
        max="100"
        v-if="coverPhotoUploadProgress > 0 && !coverPhotoPreviewUrl"
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
    const coverPhotoUploadProgress = ref(0);
    const isDragging = ref(false);
    const coverPhotoPreviewUrl = ref(null);

    const uploadCoverPhoto = async (file) => {
      const user = firebase.auth().currentUser;
      if (!user) {
        window.alert("User not authenticated.");
        return;
      }
      const storageRef = firebase
        .storage()
        .ref()
        .child(`users/${user.uid}/cover-photo/${file.name}`);
      const uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          coverPhotoUploadProgress.value =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          window.alert(error);
        },
        () => {
          
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

            coverPhotoPreviewUrl.value = downloadURL;
            updateCoverPhoto(downloadURL);
          });
        }
      );
    };
    const updateCoverPhoto = async (downloadURL) => {
      const user = firebase.auth().currentUser;
      if (!user) {
        window.alert("User not authenticated.");
        return;
      }
      const userRef = firebase.firestore().collection("users").doc(user.uid);
      try {
        await userRef.update({
          coverPhotoUrl: downloadURL,
        });
      } catch (error) {
        window.alert(error);
      }
    };
    const changeCoverPhoto = () => {
      const coverPhotoInput = document.getElementById("cover-photo");
      coverPhotoInput.click();
    };

    const onCoverPhotoChange = async (event) => {
      const file = event.target.files[0];
      uploadCoverPhoto(file);
    };

    const onCoverPhotoDrop = async (event) => {
      event.preventDefault();
      isDragging.value = false;
      const file = event.dataTransfer.files[0];
      uploadCoverPhoto(file);
    };

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

    const mounted = () => {
      const coverPhotoDropZone = document.getElementById("coverPhotoDropZone");
      coverPhotoDropZone.addEventListener("dragover", onDragOver);
      coverPhotoDropZone.addEventListener("dragenter", onDragEnter);
      coverPhotoDropZone.addEventListener("dragleave", onDragLeave);
      coverPhotoDropZone.addEventListener("drop", onCoverPhotoDrop);
    };

    const beforeUnmount = () => {
      const coverPhotoDropZone = document.getElementById("coverPhotoDropZone");
      coverPhotoDropZone.removeEventListener("dragover", onDragOver);
      coverPhotoDropZone.removeEventListener("dragenter", onDragEnter);
      coverPhotoDropZone.removeEventListener("dragleave", onDragLeave);
      coverPhotoDropZone.removeEventListener("drop", onCoverPhotoDrop);
    };
    
    return {
      coverPhotoUploadProgress,
      isDragging,
      coverPhotoPreviewUrl,
      onDragLeave,
      onDragEnter,
      onDragOver,
      changeCoverPhoto,
      onCoverPhotoChange,
      onCoverPhotoDrop,
      mounted,
      beforeUnmount,
      updateCoverPhoto,
    };
  },
};
</script>
