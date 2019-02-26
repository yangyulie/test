<template>
  <div class="share_con" @click="hide">
    <img :src="url" alt>
  </div>
</template>

<script>
import Api from "@/api/user";
export default {
  props: ["url"],
  methods: {
    hide() {
      this.$emit("hide");
    }
  }
};
</script>

<style lang="less" scoped>
.share_con {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999999;
  img {
    width: 80%;
  }
}
</style>
