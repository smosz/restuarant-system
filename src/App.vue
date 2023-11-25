<template>
  <div>
    <router-view>
      <template v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </template>
    </router-view>
  </div>
</template>
