<template>
  <v-container>
    <v-row >
      <v-col lg="12">
        <v-card>
          <v-list>
            <v-list-item-group>
              <v-list-item
                class="hovers"
                v-for="(item, i) in searchmenu"
                :key="i"
              >
                <v-list-item-content>
                  <v-list-item-title @click="onClickMenu(item.menu_file)">
                    {{ item.menu_title }}</v-list-item-title
                  >
                  <hr />
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "searchMenu",
  props: ["searchmenu"],
  data() {
    return {
      menumain: null,
    };
  },
  methods: {
    onClickMenu(value) {
      this.$router.push(`./tableshowdata/${value}`).catch(() => {});
    },
  },
};
</script>

<style>
.hovers:hover {
  background-color: gray;
}
</style>
