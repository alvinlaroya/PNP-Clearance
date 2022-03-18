<template>
  <v-app>
    <v-main class="main">
      <div>
        <router-view />
        <router-view class="view two" name="navbar"></router-view>
        <router-view class="view four" name="sidebar"></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    switch: false,
  }),
};
</script>
