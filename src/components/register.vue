<template>
  <!-- <transition name="fade" v-if="show && internalShow"> -->
  <transition name="fade" v-if='internalShow'>
    <wx-view class="reg_container">
      <wx-view class="con">
        <wx-view class="th">
          <wx-text>绑定手机号</wx-text>
          <!-- <van-icon name="cross" size='40rpx' @click='hide' /> -->
        </wx-view>
        <form @submit.prevent="formSubmit" bindreset="formReset" report-submit="true">
          <wx-view class="tb">
            <wx-view class="item">
              <input type="number" placeholder="请输入手机号" v-model="mobile">
            </wx-view>
            <wx-view class="item yanzheng">
              <input type="number" placeholder="输入验证码" v-model="code">
              <wx-view :class="{btn: 1, isclick: isclick}" @click.native="getcode">{{btnsub}}</wx-view>
            </wx-view>
            <wx-view class="item edu">
              <input
                type="text"
                v-model="edu"
                class="picker"
                readonly
                @click="educationFlag = true"
              >
              <wx-text class="text_l">学历</wx-text>
              <!-- <van-icon class='arrow' name="arrow" size='40rpx' /> -->
            </wx-view>
            <wx-view class="item edu">
              <wx-text class="text_l">职业</wx-text>
              <input type="text" placeholder v-model="job">
              <!-- <van-icon class='arrow' name="arrow" size='40rpx' /> -->
            </wx-view>
            <wx-view class="agreement"><input type="checkbox" name="check" id="checkbox"> 授权即表示您同意《财咪教育用户使用协议》</wx-view>
          </wx-view>
          <wx-view class="tf">
            <button class="agree_btn" form-type="submit">同意协议并登录</button>
          </wx-view>
        </form>
      </wx-view>
      <mt-popup v-model="educationFlag" position="bottom">
        <mt-picker
          class="picker"
          @change="onValuesChange"
          :slots="eduArray"
          :itemHeight="60"
          showToolbar
        >
          <div class="picker-toolbar-title">
            <div class="usi-btn-cancel" @click="educationFlag = !educationFlag">取消</div>
            <div class="usi-btn-sure" @click="educationConfirm">确定</div>
          </div>
        </mt-picker>
      </mt-popup>
    </wx-view>
  </transition>
</template>

<script>
import UserApi from "@/api/user";
import wxView from "@/components/view";
import wxText from "@/components/text";
import { Toast } from "mint-ui";

export default {
  components: {
    wxView,
    wxText
  },
  props: ["show", "callback"],
  data() {
    return {
      // show: false,
      educationFlag: false, // 控制学学历picker显示或者隐藏
      eduArray: [
        {
          flex: 1,
          values: ["大专", "本科", "硕士", "博士", "其他"],
          textAlign: "center",
          className: "picker-slot"
        }
      ],
      eduIndex: null,
      userInfo: {},
      name: "",
      mobile: "",
      code: "",
      edu: "",
      job: "",
      btnsub: "获取验证码",
      isclick: true,
      internalShow: false
    };
  },
  watch: {
    callback(value) {
      if (this.$appStore.needBind) {
        this.internalShow = true;
      } else if (value && value.value) {
        // 不需要绑定, 直接回调
        value.value(true);
      }
    }
  },
  methods: {
    onValuesChange(picker, values) {
      console.log(picker.getValues());
      this.values = values[0];
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    educationConfirm() {
      console.log(666);
      this.edu = this.values;
      console.log(this.edu);
      this.educationFlag = !this.educationFlag;
    },
    bindEduPickerChange(e) {
      const data = this.data.eduArray[e.detail.value];
      this.setData({
        eduIndex: e.detail.value,
        edu: data
      });
    },
    getcode: function(e) {
      if (this.mobile == "") {
        // app.error('请输入手机号码')
        console.log(Toast)
        Toast({
           message: "请输入手机号码",
           className: "toast"
        });
        return;
      }
      if (!/^1[3|4|5|7|8]\d{9}$/.test(this.mobile)) {
        console.log("err");
        // app.message('手机号码格式不正确')
        Toast({ message: "手机号码格式不正确", className: "toast" });
        return;
      }
      if (!this.isclick) {
        return;
      }
      var params = {
        mobile: this.mobile
      };
      var time = 60;
      UserApi.smsCode(params).then(res => {
        if (res.code != 0) {
          Toast(res.message);
        }
        if (this.isclick) {
          this.setData({
            isclick: false
          });
          var timer = setInterval(() => {
            if (time <= 0) {
              time = 60;
              this.setData({
                btnsub: "重新获取验证码",
                isclick: true
              });
              clearInterval(timer);
            } else {
              time--;
              this.setData({
                btnsub: "发送验证码(" + time + ")"
              });
            }
          }, 1000);
        }
      });
    },
    formSubmit: function(e) {
      console.log(e);
      // var formId = e.detail.formId
      var formId = null;
      this.saveData(formId);
    },
    formReset: function() {
      console.log("form reset");
    },
    saveData: function(form_id) {
      var params = {
        mobile: this.mobile,
        code: this.code,
        job: this.job,
        education: this.edu,
        encryptedData: this.encryptedData,
        iv: this.iv,
        form_id: form_id,
        inviter_id: this.$appStore.inviterId,
      };
      if (params.mobile == "" || !/^1[3|4|5|7|8]\d{9}$/.test(params.mobile))
        return Toast({ message: "手机号格式错误", className: "toast" });
      if (params.code == "") return Toast("请输入验证码");
      if (params.encryptedData == "")
        return Toast({ message: "缺少授权信息，返回页面后再试", className: "toast" });
      if (params.iv == "") return Toast({ message: "缺少授权信息，返回页面后再试", className: "toast" });
      UserApi.bind(params).then(res => {
        const code = res.code;
        switch (code) {
          case 0:
            this.$appStore.needBind = false;
            // vm.getInfoAndShow()
            this.setData({ internalShow: false });
            if (this.callback && this.callback.value) {
              this.callback.value(true);
            }
            Toast({ message: "绑定成功", className: "toast" });
            break;
          case 1:
            Toast(res.message);
            break;
          case 2:
            // 需要重新授权
            this.getUserInfo();
            Toast({ message: "请重试", className: "toast" });
            break;
          case 3:
            // 已经绑定
            break;
        }
      });
    },
    hide(e) {
      // this.properties.show = false
      this.setData({
        internalShow: false
      });
    }
  }
};
</script>

<style scoped>
#checkbox{
  -webkit-appearance: none;
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 10px;
  border-radius: 100%;
}
#checkbox:checked{
    background: url('../assets/img/icon/checked.png') center center no-repeat;
    background-size: 100% 100%
}
.reg_container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reg_container .con {
  width: 630px;
  height: 780px;
  background: #fff;
  border-radius: 15px;
  padding: 30px;
}

.th {
  height: 50px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.th {
  font-size: 30px;
  color: #333;
}

.tb {
}

.item {
  width: 550px;
  height: 95px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 20px;
  display: flex;
  position: relative;
  font-size: 28px;
  align-items: center;
}

.tb input {
  width: 100%;
  height: 95px;
  line-height: 95px;
  font-size: 28px;
  padding-left: 25px;
  border-radius: 15px;
  border: 1px solid #ddd;
}

.yanzheng input {
  width: 55%;
  margin-right: 5%;
}

.yanzheng .btn {
  width: 40%;
  border-radius: 15px;
  border: 1px solid #7da5e8;
  height: 95px;
  line-height: 95px;
  color: #7da5e8;
  font-size: 28px;
  text-align: center;
}

.r {
  flex: 1;
  height: 90px;
  line-height: 90px;
  text-align: right;
  padding: 0 55px;
}

.item .picker {
  flex: 1;
  height: 100%;
  line-height: 90px;
  text-align: right;
  border-radius: 15px;
  font-size: 28px;
  border: 1px solid #ddd;
}
.picker-slot {
  font-size: 28px;
}
.text_l {
  position: absolute;
  left: 23px;
}
.arrow {
  position: absolute;
  right: 15px;
  color: #cacaca;
}
.edu input {
  padding: 0 55px;
  text-align: right;
}
.agreement {
  font-size: 22px;
  color: #cccccc;
  padding-left: 5px;
  display: flex;
  align-items: center;
}
.agree_btn {
  font-size: 30px;
  color: #fff;
  text-align: center;
  width: 100%;
  height: 95px;
  line-height: 95px;
  background: #e44d50;
  margin-top: 40px;
  border-radius: 15px;
}
</style>
