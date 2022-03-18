<template>
  <div style="position: fixed; height: 100%; width: 60px; left: 0; top: 0; z-index: 99999; overflow: hidden" id="external-sidebar">
      <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      dark
    >
      <v-list-item class="px-2" style="height: 20px">
        <v-list-item-avatar>
          <v-img style="height: 40px; width: 40px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvKBuYxRZURepScLWP9QEnu8BUjG6wvyhSCCg3K9hAhJORJsR_pP2aO4cPmyyGUjX4uyM&usqp=CAU"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          link
        >
          <v-list-item-avatar tile style="margin-left: -9px">
            <v-avatar
                style="border-radius: 10px;"
                color="blue"
            >
                <img src="@/images/letter.png" alt="">
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { EventBus } from "@/main.js";
  export default {
    data () {
      return {
        drawer: true,
        switch: false,
        items: [
          { title: 'Home', icon: 'mdi-home-city' },
          { title: 'My Account', icon: 'mdi-account' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
        ],
        mini: true,
      }
    },
    created() {
        EventBus.$on("switch-mini", () => {
            var element = document.querySelector('#external-sidebar');
            if(this.switch) {
                element.style.left = '0px';
                this.switch = !this.switch
            } else {
                element.style.left = '-55px';
                this.switch = !this.switch
            }
        });
    },
  }
</script>

<style>
#external-sidebar:hover {
    overflow: scroll;
}
::-webkit-scrollbar {
    width: 7px;
}

::-webkit-scrollbar-track {
    background-color: rgb(255, 254, 254);
    opacity: 0;
}

::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 15px rgba(36, 35, 35, 0.3);
}
</style>