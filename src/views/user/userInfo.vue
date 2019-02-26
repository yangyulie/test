<template>
  <wx-view class="f7_con info_container" id="info">
    <wx-view class="container" v-show="panel">
      <wx-view class="cropper_con">
        <img id="image" :src="url" alt="Picture">
      </wx-view>
      <button type="button" id="button" @click="commit">确定</button>
      <!-- <button type="button" id="cancel" @click="cancel">取消</button> -->
    </wx-view>
    <wx-view class="list_con">
      <wx-view class="item">
        <wx-text class="fl item_t">头像</wx-text>
        <wx-text class="fr item_c">
          <img class="header_img" :src="userInfo.avatar">
          <input type="file" id="change" accept="image" @change="change">
        </wx-text>
        <img class="right" src="@/assets/img/user/right.png">
      </wx-view>
      <wx-view class="item">
        <wx-text class="fl item_t">昵称</wx-text>
        <input class="fr item_c" v-model="userInfo.nickname" @blur="setInfo($event,'nickname')">
        <img class="right" src="@/assets/img/user/right.png">
      </wx-view>
      <wx-view class="item">
        <wx-text class="fl item_t">性别</wx-text>
        <input class="fr item_c" v-model="userInfo.gender" readonly @click="sexFlag = true">
        <img class="right" src="@/assets/img/user/right.png">
      </wx-view>
      <wx-view class="item">
        <wx-text class="fl item_t">出生年份</wx-text>
        <input
          class="fr item_c"
          v-model="userInfo.date_of_birth"
          readonly
          @click="birthPicker('birthPicker')"
        >
        <img class="right" src="@/assets/img/user/right.png">
      </wx-view>
      <router-link to="/user/tel" class="item">
        <wx-text class="fl item_t">手机号</wx-text>
        <input type="number" class="fr item_c" v-model="userInfo.mobile" readonly>
        <img class="right" src="@/assets/img/user/right.png">
      </router-link>
      <wx-view class="item">
        <wx-text class="fl item_t">学历</wx-text>
        <input
          class="fr item_c"
          v-model="userInfo.education"
          readonly
          @click="educationFlag = true"
        >
        <img class="right" src="@/assets/img/user/right.png">
      </wx-view>
      <wx-view class="item">
        <wx-text class="fl item_t">职位</wx-text>
        <input class="fr item_c" v-model="userInfo.job" @blur="setInfo($event,'job')">
        <img class="right" src="@/assets/img/user/right.png">
      </wx-view>
    </wx-view>

    <mt-popup v-model="sexFlag" position="bottom">
      <mt-picker :slots="slots" @change="onSexChange" :itemHeight="60" showToolbar>
        <div class="picker-toolbar-title">
          <div class="usi-btn-cancel" @click="sexFlag = !sexFlag">取消</div>
          <div class="usi-btn-sure" @click="sexConfirm">确定</div>
        </div>
      </mt-picker>
    </mt-popup>
    <mt-popup v-model="educationFlag" position="bottom">
      <mt-picker :slots="educationSlots" @change="onEducationChange" :itemHeight="60" showToolbar>
        <div class="picker-toolbar-title">
          <div class="usi-btn-cancel" @click="educationFlag = !educationFlag">取消</div>
          <div class="usi-btn-sure" @click="educationConfirm">确定</div>
        </div>
      </mt-picker>
    </mt-popup>
    <mt-datetime-picker
      ref="birthPicker"
      type="date"
      :startDate="startTime"
      :endDate="endTime"
      :itemHeight="60"
      @confirm="birthConfirm"
    ></mt-datetime-picker>

    <Tip :show="show" :text="text" @setShowHide="setShowHide"></Tip>
  </wx-view>
</template>

<script>
import wxView from "@/components/view";
import wxText from "@/components/text";
import Cropper from "cropperjs";
import UserApi from "@/api/user";
import Tip from "@/components/tip";
export default {
  components: {
    wxView,
    wxText,
    Tip
  },
  data() {
    return {
      sexFlag: false,
      educationFlag: false,
      birthFlag: false,
      startTime: new Date("1950/1/1"), // 日期起始时间
      endTime: new Date(), // 日期结束时间
      values: "", // picker选择器的值
      sexValues: "",
      userInfo: {
        id: 1,
        avatar: "http://image.zhangxinxu.com/image/study/s/s256/mm3.jpg",
        nickname: "诸葛亮",
        gender: "男",
        date_of_birth: "1995年11月",
        mobile: "13311428796",
        education: "博士",
        job: "前端开发"
      },
      slots: [
        {
          flex: 1,
          values: ["男", "女"],
          textAlign: "center"
        }
      ],
      educationSlots: [
        {
          flex: 1,
          values: ["大专", "本科", "硕士", "博士", "其他"],
          textAlign: "center"
        }
      ],
      birthVisible: "", // 生日选择的时间
      // 裁剪需要的data
      headerImage: "http://image.zhangxinxu.com/image/study/s/s256/mm3.jpg",
      picValue: "",
      cropper: "",
      croppable: false,
      panel: false,
      url: "",
      show: false, // 控制提示的显示
      text: "修改成功", // 控制提示的文字
      imgCropperData: {
        accept: "image/gif, image/jpeg, image/png, image/jpg"
      }
    };
  },
  mounted() {
    this.initCropper();
    UserApi.getUserInfo().then(res => {
      let data = res.data;
      this.userInfo = data;
      for (let key in this.userInfo) {
        if (key == "gender") {
          switch (this.userInfo[key]) {
            case 1:
              data[key] = "男";
              break;
            case 2:
              data[key] = "女";
              break;
          }
        }
      }
    });
  },
  methods: {
    initCropper() {
      const vm = this;
      let image = document.getElementById("image");
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 2,
        background: true,
        zoomable: false,
        ready: function() {
          vm.croppable = true;
        }
      });
    },
    //创建url路径
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    //input框change事件，获取到上传的文件
    change(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let type = files[0].type; //文件的类型，判断是否是图片
      let size = files[0].size; //文件的大小，判断图片的大小
      if (this.imgCropperData.accept.indexOf(type) == -1) {
        alert("请选择我们支持的图片格式！");
        return false;
      }
      this.picValue = files[0];
      this.url = this.getObjectURL(this.picValue);
      //每次替换图片要重新得到新的url
      if (this.cropper) {
        this.cropper.replace(this.url);
      }
      this.panel = true;
    },
    //确定提交
    commit() {
      this.panel = false;
      var croppedCanvas;
      var roundedCanvas;
      if (!this.croppable) {
        return;
      }
      // Crop
      croppedCanvas = this.cropper.getCroppedCanvas();
      // Round
      roundedCanvas = this.getRoundedCanvas(croppedCanvas);
      this.headerImage = roundedCanvas.toDataURL();
      //上传图片
      this.postImg();
    },
    //canvas画图
    getRoundedCanvas(sourceCanvas) {
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      var width = sourceCanvas.width;
      var height = sourceCanvas.height;
      canvas.width = width;
      canvas.height = height;
      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = "destination-in";
      context.beginPath();
      context.arc(
        width / 2,
        height / 2,
        Math.min(width, height) / 2,
        0,
        2 * Math.PI,
        true
      );
      context.fill();

      return canvas;
    },
    //提交上传函数
    postImg() {
      // console.log(this.headerImage)
      UserApi.upLoadImage({
        image: this.headerImage
      }).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.userInfo.avatar = res.data.url;
          UserApi.editUserInfo({
            name: "head_photo",
            value: res.data.url
          }).then(res => {
            if (!res.code) {
              this.showTip(res);
              return;
            }
          });
          return;
        }
      });
      //这边写图片的上传
    },
    // 设置用户信息
    setInfo(e, type) {
      const value = e.target.value;
      this.userInfo[type] = e.target.value;
      UserApi.editUserInfo({
        name: type,
        value: value
      }).then(res => {
        if (!res.code) {
          this.showTip(res);
          return;
        }
      });
    },
    onSexChange(picker, values) {
      console.log(picker, values);
      this.sexValues = values[0];
      // if (values[0] > values[1]) {
      //   picker.setSlotValue(1, values[0]);
      // }
    },
    onEducationChange(picker, values) {
      this.values = values;
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    sexConfirm() {
      console.log(this.values);
      this.userInfo.gender = this.sexValues;
      let data = this.sexValues;
      if (data == "男") {
        data = 1;
      } else if (data == "女") {
        data = 2;
      }
      UserApi.editUserInfo({
        name: "sex",
        value: data
      }).then(res => {
        if (!res.code) {
          this.sexFlag = !this.sexFlag;
          this.showTip(res);
          return;
        }
      });
    },
    educationConfirm() {
      const data = this.values[0];
      this.userInfo.education = this.values[0];
      UserApi.editUserInfo({
        name: "education",
        value: data
      }).then(res => {
        if (!res.code) {
          this.educationFlag = !this.educationFlag;
          this.showTip(res);
          return;
        }
      });
    },
    birthPicker(picker) {
      this.$refs[picker].open();
    },
    birthConfirm(e) {
      const datetime =
        e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate();
      const textTime =
        e.getFullYear() + "年" + (e.getMonth() + 1) + "月" + e.getDate() + "日";
      this.userInfo.date_of_birth = textTime;
      UserApi.editUserInfo({
        name: "date_of_birth",
        value: datetime
      }).then(res => {
        if (!res.code) {
          this.showTip(res);
          return;
        }
      });
    },

    showTip(data) {
      this.show = true;
      this.text = data.message;
    },
    setShowHide() {
      console.log("hide");
      this.show = false;
    }
  }
};
</script>

<style lang="less" scoped>
.info_container {
  padding-top: 25px;
}
.list_con {
  background: #fff;
  .item {
    border-bottom: 1px solid #eeeeee;
    height: 90px;
    width: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
    padding-right: 60px;
    padding-left: 35px;
    font-size: 26px;
    input {
      height: 100%;
      flex: 1;
      border: 0;
      font-size: 26px;
      outline: 0;
    }
    &:last-child {
      border: 0;
    }
    .item_t {
      color: #666666;
      display: block;
      width: 30%;
    }
    .item_c {
      color: #333333;
      display: block;
      // width: 50%;
      flex: 1;
      text-align: right;
    }
    .right {
      position: absolute;
      width: 12px;
      height: 22px;
      right: 30px;
      top: 50%;
      margin-top: -11px;
    }
    .header_img {
      border-radius: 50%;
      width: 60px;
      height: 60px;
    }
  }
}
</style>
<style>
#info #button {
  position: absolute;
  right: 50%;
  bottom: 10px;
  margin-right: -345px;
  width: 690px;
  height: 90px;
  border: none;
  border-radius: 5px;
  background: #e44d50;
  font-size: 32px;
  color: #fff;
  border-radius: 15px;
}
#info .show {
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  border: 1px solid #d5d5d5;
}
#info .picture {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
#info .container {
  z-index: 99;
  position: fixed;
  padding-top: 60px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
  background-size: 3%;
}
#info #image {
  max-width: 100%;
  min-height: 100%;
}
.cropper-view-box,
.cropper-face {
  border-radius: 50%;
}
#change {
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cropper-container {
  font-size: 0;
  line-height: 0;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  direction: ltr;
  -ms-touch-action: none;
  touch-action: none;
}
.cropper-container img {
  display: block;
  min-width: 0 !important;
  max-width: none !important;
  min-height: 0 !important;
  max-height: none !important;
  width: 100%;
  height: 100%;
  image-orientation: 0deg;
}
.cropper-wrap-box,
.cropper-canvas,
.cropper-drag-box,
.cropper-crop-box,
.cropper-modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.cropper-wrap-box {
  overflow: hidden;
}
.cropper-drag-box {
  opacity: 0;
  background-color: #fff;
}
.cropper-modal {
  opacity: 0.5;
  background-color: #000;
}
.cropper-view-box {
  display: block;
  overflow: hidden;
  width: 100%;
  height: 100%;
  outline: 1px solid #39f;
  outline-color: rgba(51, 153, 255, 0.75);
}
.cropper-dashed {
  position: absolute;
  display: block;
  opacity: 0.5;
  border: 0 dashed #eee;
}
.cropper-dashed.dashed-h {
  top: 33.33333%;
  left: 0;
  width: 100%;
  height: 33.33333%;
  border-top-width: 1px;
  border-bottom-width: 1px;
}
.cropper-dashed.dashed-v {
  top: 0;
  left: 33.33333%;
  width: 33.33333%;
  height: 100%;
  border-right-width: 1px;
  border-left-width: 1px;
}
.cropper-center {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 0;
  height: 0;
  opacity: 0.75;
}
.cropper-center:before,
.cropper-center:after {
  position: absolute;
  display: block;
  content: " ";
  background-color: #eee;
}
.cropper-center:before {
  top: 0;
  left: -3px;
  width: 7px;
  height: 1px;
}
.cropper-center:after {
  top: -3px;
  left: 0;
  width: 1px;
  height: 7px;
}
.cropper-face,
.cropper-line,
.cropper-point {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0.1;
}
.cropper-face {
  top: 0;
  left: 0;
  background-color: #fff;
}
.cropper-line {
  background-color: #e44d50;
}
.cropper-line.line-e {
  top: 0;
  right: -3px;
  width: 5px;
  cursor: e-resize;
}
.cropper-line.line-n {
  top: -3px;
  left: 0;
  height: 5px;
  cursor: n-resize;
}
.cropper-line.line-w {
  top: 0;
  left: -3px;
  width: 5px;
  cursor: w-resize;
}
.cropper-line.line-s {
  bottom: -3px;
  left: 0;
  height: 5px;
  cursor: s-resize;
}
.cropper-point {
  width: 10px;
  height: 10px;
  opacity: 0.75;
  background-color: #e44d50;
}
.cropper-point.point-e {
  top: 50%;
  right: -3px;
  margin-top: -3px;
  cursor: e-resize;
}
.cropper-point.point-n {
  top: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: n-resize;
}
.cropper-point.point-w {
  top: 50%;
  left: -3px;
  margin-top: -3px;
  cursor: w-resize;
}
.cropper-point.point-s {
  bottom: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: s-resize;
}
.cropper-point.point-ne {
  top: -3px;
  right: -3px;
  cursor: ne-resize;
}
.cropper-point.point-nw {
  top: -3px;
  left: -3px;
  cursor: nw-resize;
}
.cropper-point.point-sw {
  bottom: -3px;
  left: -3px;
  cursor: sw-resize;
}
.cropper-point.point-se {
  right: -3px;
  bottom: -3px;
  width: 20px;
  height: 20px;
  cursor: se-resize;
  opacity: 1;
}

.cropper-point.point-se:before {
  position: absolute;
  right: -50%;
  bottom: -50%;
  display: block;
  width: 200%;
  height: 200%;
  content: " ";
  opacity: 0;
  background-color: #e44d50;
}
.cropper-invisible {
  opacity: 0;
}
.cropper-bg {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
}
.cropper-hide {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
}
.cropper-hidden {
  display: none !important;
}
.cropper-move {
  cursor: move;
}
.cropper-crop {
  cursor: crosshair;
}
.cropper-disabled .cropper-drag-box,
.cropper-disabled .cropper-face,
.cropper-disabled .cropper-line,
.cropper-disabled .cropper-point {
  cursor: not-allowed;
}
</style>

