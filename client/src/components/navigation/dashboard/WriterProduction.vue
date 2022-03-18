<template>
  <v-card>
    <v-card-title>Writer Production</v-card-title>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Assigned</th>
            <th class="text-left">Submitted</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(writer, i) in allProductionWriters" :key="i">
            <td>{{ writer.name }}</td>
            <td>{{ writer.assigned }}</td>
            <td>{{ writer.submitted }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("navigation");

export default {
  data: () => ({}),
  computed: {
    ...mapGetters(["allProductionWriters"]),
  },
};
</script>
