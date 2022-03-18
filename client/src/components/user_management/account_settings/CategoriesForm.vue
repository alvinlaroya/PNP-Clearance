<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Require Summary</th>
          <th class="text-left">Require Content</th>
          <th class="text-left">Require Link In Summary</th>
          <th class="text-left">Require Link In Content</th>
          <th class="text-left">Prevent Links In Summary</th>
          <th class="text-left">Prevent Links In Content</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, i) in allCategories" :key="i">
          <td>{{ category.name }}</td>
          <td><v-checkbox v-model="category.isRequireSummary"></v-checkbox></td>
          <td><v-checkbox v-model="category.isRequireContent"></v-checkbox></td>
          <td>
            <v-checkbox v-model="category.isRequireLinksSummary"></v-checkbox>
          </td>
          <td>
            <v-checkbox v-model="category.isRequireLinksContent"></v-checkbox>
          </td>
          <td>
            <v-checkbox v-model="category.isPreventLinksSummary"></v-checkbox>
          </td>
          <td>
            <v-checkbox v-model="category.isPreventLinksContent"></v-checkbox>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("userManagement");

export default {
  data: () => ({
    checkbox: false,
  }),
  computed: {
    ...mapGetters(["allCategories"]),
  },
};
</script>
