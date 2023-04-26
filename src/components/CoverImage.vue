<!-- <template>
  <div class="flex items-center ml-[-124px]">
    <div class="relative mr-4">
      <label for="image" class="cursor-pointer">
        <span :class="{'opacity-50': isLoading}" class="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded flex items-center">
          <span v-if="!isLoading">
            Choose an Image
          </span>
          <span v-else>
            <svg class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.352 5.814 3.494 7.709l2.506-2.418zm2.345 3.319A8 8 0 0112 4v8h8a8 8 0 01-11.65 7.155l-2.005-2.54z"></path>
            </svg>
            Uploading...
          </span>
        </span>
      </label>
      <input id="image" type="file" class="hidden form-input" @change="loadImage" />
    </div>
    <div class="mt-4">
      <img
        v-if="CoverImage"
        :src="CoverImage"
        alt="Cover Image"
        class="h-48 w-full object-cover rounded-md shadow-md"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
// import { useFirestore } from 'vuefire';
import firebase from "firebase/compat/app";
// import 'firebase/compat/firestore';
import "firebase/compat/storage";
import "firebase/compat/auth";
import { db } from "../firebase/firebaseInit";

export default {
  name: "CoverImage",
  setup() {
    const userId = ref(null);
    const CoverImage = ref(null);
    const isLoading = ref(false);
    const storageRef = firebase.storage().ref();
    const loadImage = async (event) => {
      isLoading.value = true;
      const fil = event.target.files[0];
      const userId = firebase.auth().currentUser.uid;
      try {
        const snapshot = await storageRef.child(`users/${userId}/Cover.jpg`).put(fil);
        const coverURL = await snapshot.ref.getDownloadURL();
        await db.collection("users").doc(userId).set({ CoverImage: coverURL }, { merge: true });
        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
        console.error(error);
      }
    };

    const userProfile = computed(() => {
      return db.collection("users").doc(userId.value);
    });

    const fetchUserProfile = async () => {
      try {
        const doc = await userProfile.value.get();
        const data = doc.data();
        if (data && data.CoverImage) {
          CoverImage.value = data.CoverImage;
        }
      } catch (error) {
        console.error(error);
      }
    };

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userId.value = user.uid;
        fetchUserProfile();
      }
    });

    return {
      CoverImage,
      loadImage,
      isLoading
    };
  },
};
</script> -->
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
import { db } from "../firebase/firebaseInit";

export default {
  setup() {
    const coverPhotoUploadProgress = ref(0);
    const isDragging = ref(false);
    const coverPhotoPreviewUrl = ref(null);

    const uploadCoverPhoto = async (file) => {
      const user = firebase.auth().currentUser;
      if (!user) {
        console.error("User not authenticated.");
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
          console.error(error);
        },
        () => {
          
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log(`Cover photo uploaded: ${downloadURL}`);
            coverPhotoPreviewUrl.value = downloadURL;
            updateCoverPhoto(downloadURL);
          });
        }
      );
    };
    const updateCoverPhoto = async (downloadURL) => {
      const user = firebase.auth().currentUser;
      if (!user) {
        console.error("User not authenticated.");
        return;
      }
      const userRef = firebase.firestore().collection("users").doc(user.uid);
      try {
        await userRef.update({
          coverPhotoUrl: downloadURL,
        });
        console.log("Cover photo URL updated in user's document");
      } catch (error) {
        console.error(error);
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
