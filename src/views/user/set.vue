<template>
  <wx-view class="set_container f7_con">
    <wx-view class="list">
      <router-link to="/user/info" tag="div" class="item">
        <img class="icon" src="@/assets/img/icon/set_icon01.png" alt>
        <wx-text class="text">个人信息</wx-text>
        <img class="right" src="@/assets/img/user/right.png" alt>
      </router-link>
      <router-link to="/user/userHelp" tag="div" class="item">
        <img class="icon" src="@/assets/img/icon/set_icon02.png" alt>
        <wx-text class="text">使用帮助</wx-text>
        <img class="right" src="@/assets/img/user/right.png" alt>
      </router-link>
      <router-link to="/user/disclaimer" tag="div" class="item">
        <img class="icon" src="@/assets/img/icon/set_icon03.png" alt>
        <wx-text class="text">免责声明</wx-text>
        <img class="right" src="@/assets/img/user/right.png" alt>
      </router-link>
    </wx-view>
    <!-- <wx-view class="list">
      <wx-view class="item">
        <img class="icon" src="@/assets/img/icon/set_icon04.png" alt>
        <wx-text class="text">检查更新</wx-text>
        <img class="right" src="@/assets/img/user/right.png" alt>
      </wx-view>
      <wx-view class="item">
        <img class="icon" src="@/assets/img/icon/set_icon05.png" alt>
        <wx-text class="text">清除缓存</wx-text>
        <img class="right" src="@/assets/img/user/right.png" alt>
      </wx-view>
    </wx-view>
    <wx-view class="logout">安全退出</wx-view> -->
  </wx-view>
</template>

<script>
import wxView from "@/components/view";
import wxText from "@/components/text";
export default {
  components: {
    wxView,
    wxText
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.set_container {
  padding-top: 30px;
}
.list {
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 20px;
  .item {
    display: flex;
    align-items: center;
    padding: 25px;
    position: relative;
    font-size: 28px;
    background: #fff;
    border-bottom: 2px solid #eceef1;
    .icon {
      margin-right: 20px;
    }
  }
}
.right {
  position: absolute;
  right: 30px;
}
.logout {
  position: absolute;
  bottom: 70px;
  height: 90px;
  width: 630px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-self: center;
  line-height: 90px;
  border-radius: 15px;
  color: #fff;
  font-size: 30px;
  background: #db4447;
}
</style>
