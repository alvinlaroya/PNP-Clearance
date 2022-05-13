<template>
  <div>
    <iframe
      src="http://localhost:8000/images/file.pdf"
      frameborder="0"
      height="1000"
      style="width: 100%"
    ></iframe>
  </div>
</template>

<script>
import VueDocPreview from "vue-doc-preview";
export default {
  components: {
    VueDocPreview,
  },
};
</script>
