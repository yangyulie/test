<template>
  <view class="f7_con">
    <view class="item">
      <view class="item_t">手机号</view>
      <view class="item_inp">
        <input type="number" :value="mobile" placeholder="请输入手机号码" @input="setTelNum">>
      </view>
    </view>
    <view class="item">
      <view class="item_t">验证码</view>
      <view class="item_inp">
        <input type="number" placeholder="请输入验证码" :value="code" @input="setTelStatus">
      </view>
      <view class="item_btn" bindtap="getcode">{{btnText}}</view>
    </view>
    <button class="agree_btn" :class="setTel==true?'yes':'no'" @click="setTel">保存绑定</button>
  </view>
</template>

<script>
import UserApi from "@/api/user";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      mobile: "",
      btnText: "获取验证码",
      setTel: false,
      code: "",
      isclick: true
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
    },
    setTelNum(e) {
      const value = e.target.value;
      console.log(e);
      this.setData({
        mobile: value
      });
    },
    getcode: function(e) {
      var that = this;
      if (that.data.mobile == "") {
        Toast({ message: "请输入手机号码", className: "toast" });
        return;
      }
      if (!/^1[3|4|5|7|8]\d{9}$/.test(that.data.mobile)) {
        Toast({ message: "请填写正确的手机号", className: "toast" });
        return;
      }
      if (!that.data.isclick) {
        return;
      }
      var params = {
        mobile: that.data.mobile
      };
      var time = 60;
      UserApi.telSms(params).then(res => {
        if (res.code != 0) {
          layer.message(res.message);
        }
        if (that.data.isclick) {
          that.setData({
            isclick: false
          });
          Toast({ message: "验证码已发送,注意查收", className: "toast" });
          this.setData({
            show2: true
          });
          setTimeout(() => {
            this.setData({
              show2: false
            });
          }, 800);
          var timer = setInterval(function() {
            if (time <= 0) {
              time = 60;
              that.setData({
                btnText: "重新获取验证码",
                isclick: true
              });
              clearInterval(timer);
            } else {
              time--;
              that.setData({
                btnText: "发送验证码(" + time + ")"
              });
            }
          }, 1000);
        }
      });
    },
    setTelStatus(e) {
      const value = e.target.value;
      this.setData({
        code: value
      });
      const code = this.data.code;
      const mobile = this.data.mobile;
      if (code.length != 0 && mobile.length != 0) {
        this.setData({
          setTel: true
        });
      } else {
        this.setData({
          setTel: false
        });
      }
      console.log(this.data.setTel, code, mobile);
    },
    setTel() {
      if (!this.data.setTel) {
        return;
      }
      UserApi.telEdit({
        mobile: this.data.mobile,
        code: this.data.code
      }).then(res => {
        if (res.code == 0) {
          layer.message("修改成功");
          this.setData({
            mobile: "",
            code: "",
            btnText: "获取验证码"
          });
          wx.redirectTo({
            url: "/pages/user/info/info"
          });
        }
        console.log(res, "修改手机号的结果");
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
.agree_btn {
  font-size: 30px;
  color: #fff;
  text-align: center;
  width: 90%;
  height: 90px;
  line-height: 95px;
  background: #e44d50;
  margin-top: 40px;
  border-radius: 15px;
}

.yes {
  background: #e44d50;
}

.no {
  background: #ec9193;
}
</style>
