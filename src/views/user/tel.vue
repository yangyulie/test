<template>
  <div class="f7_con">
    <div class="item">
      <div class="item_t">手机号</div>
      <div class="item_inp">{{mobile}}</div>
      <router-link to="/user/telEdit" class="item_btn">更换手机号</router-link>
    </div>
  </div>
</template>

<script>
import UserApi from "@/api/user";
import Tip from "@/components/tip";
export default {
  components: {
    Tip
  },
  data() {
    return {
      mobile: ''
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      UserApi.getUserInfo().then(res => {
        let data = res.data;
        this.mobile = data.mobile;
      });
    }
  }
};
</script>

<style scoped>
.f7_con {
  padding-top: 15px;
}
.item {
  border-top: 1px solid #eeeeee;
  padding: 0 40px;
  display: flex;
  height: 90px;
  align-items: center;
  background: #fff;
  font-size: 26px;
}
.item:first-child {
  border: 0;
}
.item_t {
  width: 220px;
}
.item_inp {
  width: 300px;
}
.item_btn {
  flex: 1;
  text-align: center;
  color: #1954bb;
}
</style>
