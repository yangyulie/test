<template>
  <transition name="fade" @after-enter="afterEnter" v-if="show">
    <div class="tip_container" bindtap="hideMask">
      <div class="success_box">
        <img class="bg_sc" src="@/assets/img/icon/success_tip.png">
        <span class="imgText">{{text}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["text", "success", "error", "show"],
  mounted() {},
  methods: {
    afterEnter(el) {
      setTimeout(() => {
        console.log('定时器停止')
        this.$emit('setShowHide')
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
.tip_container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}
.success_box {
  position: absolute;
  top: 40%;
  left: 50%;
  width: 320px;
  margin-left: -160px;
  height: 110px;
  text-align: center;
  line-height: 110px;
  font-size: 32px;
}
.bg_sc {
  width: 320px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
}
.imgText {
  position: absolute;
  z-index: 10;
  margin-top: 5px;
  right: 60px;
  color: #333333;
}
</style>

