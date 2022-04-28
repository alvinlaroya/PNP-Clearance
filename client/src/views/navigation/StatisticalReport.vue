<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>Statistical Report</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-text>
            <v-card-title> Daily Clearance Issued </v-card-title><br />
            <span class="ml-4" style="font-size: 60px">{{
              clearanceIssued.daily
            }}</span>
            <v-icon
              x-large
              style="
                font-size: 100px;
                position: absolute;
                top: 30px;
                right: 50px;
              "
              >mdi-file-document-multiple-outline</v-icon
            >
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-text>
            <v-card-title> Daily Clearance Income </v-card-title><br />
            <span class="ml-4" style="font-size: 60px"
              >₱{{ clearanceIncome.daily }}</span
            >
            <v-icon
              x-large
              style="
                font-size: 100px;
                position: absolute;
                top: 30px;
                right: 50px;
              "
              >mdi-currency-usd</v-icon
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="loading">
      <v-col cols="12">
        <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
      </v-col>
      <v-col cols="12">
        <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div id="weekly"></div>
      </v-col>
      <v-col cols="12">
        <div id="monthly"></div>
      </v-col>
      <v-col cols="12">
        <div id="quarterly"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("navigation");

export default {
  data: () => ({
    loading: true,
  }),
  mounted() {
    this.getClearanceIssuedStatisticReport();
    this.getClearanceIncomeStatisticReport();

    setTimeout(() => {
      this.weeklyChart();
      this.monthlyChart();
      this.quarterlyChart();
      this.loading = false;
    }, 2000);
  },
  computed: {
    ...mapGetters(["clearanceIssued", "clearanceIncome"]),
  },
  methods: {
    ...mapActions([
      "getClearanceIssuedStatisticReport",
      "getClearanceIncomeStatisticReport",
    ]),
    weeklyChart() {
      const data = {
        labels: this.clearanceIssued.weekly.map((item) => item.label),
        datasets: [
          {
            name: "Issued Clearance",
            type: "bar",
            values: this.clearanceIssued.weekly.map((item) => item.count),
          },
          {
            name: "Income",
            type: "line",
            values: this.clearanceIncome.weekly.map((item) => item.count),
          },
        ],
      };
      const chart = new Chart("#weekly", {
        // or a DOM element,
        // new Chart() in case of ES6 module with above usage
        title: "Chart Weekly Report",
        data: data,
        type: "axis-mixed", // or 'bar', 'line', 'scatter', 'pie', 'percentage'
        height: 350,
        colors: ["#7cd6fd", "#743ee2"],
      });
      console.log(chart);
    },
    monthlyChart() {
      const data = {
        labels: this.clearanceIssued.monthly.map((item) => item.label),
        datasets: [
          {
            name: "Issued Clearance",
            type: "bar",
            values: this.clearanceIssued.monthly.map((item) => item.count),
          },
          {
            name: "Income",
            type: "bar",
            values: this.clearanceIncome.monthly.map((item) => item.count),
          },
        ],
      };
      const chart = new Chart("#monthly", {
        // or a DOM element,
        // new Chart() in case of ES6 module with above usage
        title: "Chart Monthly Report",
        data: data,
        type: "axis-mixed", // or 'bar', 'line', 'scatter', 'pie', 'percentage'
        height: 350,
        colors: ["#7cd6fd", "#743ee2"],
      });
      console.log(chart);
    },
    quarterlyChart() {
      const data = {
        labels: this.clearanceIssued.quarterly.map((item) => item.label),
        datasets: [
          {
            name: "Issued Clearance",
            type: "bar",
            values: this.clearanceIssued.quarterly.map((item) => item.count),
          },
          {
            name: "Income",
            type: "line",
            values: this.clearanceIncome.quarterly.map((item) => item.count),
          },
        ],
      };
      const chart = new Chart("#quarterly", {
        // or a DOM element,
        // new Chart() in case of ES6 module with above usage
        title: "Chart Quarterly Report",
        data: data,
        type: "line", // or 'bar', 'line', 'scatter', 'pie', 'percentage'
        height: 350,
        colors: ["#7cd6fd", "#743ee2"],
      });
      console.log(chart);
    },
  },
};
</script>
