<template>
  <wx-view class="wrap">
    <div>test {{random}}</div>
    <div @click="onAuth" :class="{active: active}">auth</div>
    <!-- <iframe src="https://caimi.tianbeihui.com/index/index/weixin_login?redirect_url=https%3A%2F%2Fcaimi.tianbeihui.com%2Fstatic%2Fhome%2F%23%2FwxAuthBack"></iframe> -->
  </wx-view>
</template>

<script>
import Api from "@/api/user";
import wxView from "@/components/view";
import wxText from "@/components/text";

const rnd = Math.random()
let active = false

export default {
  components:{
    wxView,
    wxText
  },
  data() {
    return {
      random: rnd,
      active: active,
    };
  },
  mounted() {
  },
  methods: {
    onAuth() {
      this.active = active = !active
      location.href = 'https://caimi.tianbeihui.com/index/index/weixin_login?redirect_url=https%3A%2F%2Fcaimi.tianbeihui.com%2Fstatic%2Fhome%2F%23%2FwxAuthBack'
      // location.href = 'http://localhost:8080/#/wxAuthBack'
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  height: 100vh;
}
iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.active {
  background: #f00;
}

div {
  font-size: 2em;
}
</style>

