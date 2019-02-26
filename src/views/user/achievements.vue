<template>
  <wx-view class="achieve_con f7_con">
    <wx-view class="achieve_h">
      <wx-view class="head">
        <img class="head_img" :src="level_logo" alt>
        <img class="head_medal" :src="level_god">
        <wx-view class="head_card">
          <img :src="level_card" alt>
          <wx-text class="card_lv">LV{{level}}</wx-text>
        </wx-view>
      </wx-view>
      <wx-view>{{upgrade_desc}}</wx-view>
      <router-link to="/user/userHelp" tag="div" class="gonglue_btn">升级攻略</router-link>
      <wx-view class="progress">
        <div class="wrap">
          <div class="right-part">
            <div class="right r1" id="right"></div>
            <div class="r-shadow"></div>
          </div>
          <div class="left-part">
            <div class="left l1" id="left"></div>
            <div class="l-shadow"></div>
          </div>
          <wx-view id="desc" class="d1">
            <wx-text>还需交易</wx-text>
            <wx-text>{{transaction.surplus}}</wx-text>
            <wx-text>次</wx-text>
          </wx-view>
        </div>
        <wx-text class="and">&</wx-text>
        <div class="wrap">
          <div class="right-part">
            <div class="right r2" id="right"></div>
            <div class="r-shadow"></div>
          </div>
          <div class="left-part">
            <div class="left l2" id="left"></div>
            <div class="l-shadow"></div>
          </div>
          <wx-view id="desc" class="d2">
            <wx-text>还需学习</wx-text>
            <wx-text>{{study.surplus}}</wx-text>
            <wx-text>分钟</wx-text>
          </wx-view>
        </div>
      </wx-view>
    </wx-view>
    <wx-view class="actieve_hf">
      <img src="@/assets/img/user/achieve_head_bg.jpg" alt>
      <wx-view class="hf_text">预计比其他线下机构节省
        <wx-text>￥4719</wx-text>元 节约
        <wx-text>263</wx-text>小时
      </wx-view>
    </wx-view>
    <wx-view class="actieve_c">
      <wx-view class="c_th">
        <wx-view class="t_1">徽章</wx-view>
        <wx-view class="t_2">名称</wx-view>
        <wx-view class="t_3">财商值</wx-view>
      </wx-view>
      <wx-view class="c_tb">
        <wx-view v-for="item in achieveData" :key="item.id">
          <wx-view class="t_1">
            <img :src="item.img">
          </wx-view>
          <wx-view class="t_2">
            {{item.name}}
            <wx-text class="color_y">Lv.{{item.level}}</wx-text>
          </wx-view>
          <wx-view class="t_3">{{item.min}}-{{item.max}}</wx-view>
          <wx-view class="t_btn" @click.native="share">证书</wx-view>
        </wx-view>
      </wx-view>
    </wx-view>
    <transition v-if="showShare" name="opc">
      <Share :url="url" @hide="hideShare"></Share>
    </transition>
  </wx-view>
</template>

<script>
import wxView from "@/components/view";
import wxText from "@/components/text";
import Share from "@/components/shareImg";
import Api from "@/api/user";
export default {
  components: {
    wxView,
    wxText,
    Share
  },
  data() {
    return {
      level: 0, // 用户的等级
      level_logo: "", // 用户等级显示头像
      level_card: "", // 用户等级显示卡片
      level_god: "", // 用户等级显示牌子
      upgrade_desc: "", // 用户升级需要多少分数
      study: {}, // 用户升级需要的学习时间
      transaction: {}, // 用户升级需要交易的次数
      achieveData: [], // 等级列表
      other: "", // 其他信息
      nowProcess1: 0, //进度条1的显示 *100
      nowProcess2: 0, //进度条1的显示 *100
      url: "",
      showShare: false
    };
  },
  mounted() {
    const vm = this;
    vm.getInfo(vm);
  },
  methods: {
    getInfo(vm) {
      Api.myAchieve({}).then(res => {
        const data = res.data;
        const levelList = data.level_list;
        levelList.forEach((d, i) => {
          d.img = require(`@/assets/img/user/lv/${i + 1}.png`);
        });
        vm.setData({
          level: data.level,
          level_logo: require(`@/assets/img/user/lv/lv${data.level}_logo.png`),
          level_card: require(`@/assets/img/user/lv/lv${data.level}_card.png`),
          level_god: require(`@/assets/img/user/lv/lv${data.level}_god.png`),
          upgrade_desc: data.upgrade_desc,
          study: data.study,
          transaction: data.transaction,
          nowProcess1: data.transaction.already / data.transaction.all,
          nowProcess2: data.study.already / data.study.all,
          achieveData: levelList
        });
        vm.setProgress(vm);
      });
    },
    share() {
      if(window.isApp){
        this.openSharePage('certificate')
        return;
      }
      Api.share({
        id: 7
      }).then(res => {
        this.showShare = true;
        this.url = res.data.url;
      });
    },
    hideShare() {
      this.showShare = false;
    },
    setProgress(vm) {
      const process1 = vm.nowProcess1;
      const process2 = vm.nowProcess2;
      // 进度条参数(进度,右边的半圆,左边的半圆,和desc)
      const r1 = document.querySelector(".r1");
      const l1 = document.querySelector(".l1");
      const d1 = document.querySelector(".d1");
      const r2 = document.querySelector(".r2");
      const l2 = document.querySelector(".l2");
      this.progressBar(process1, r1, l1);
      this.progressBar(process2, r2, l2);
    },
    progressBar(percentage, right, left) {
      var p = Math.round(percentage * 100);
      var deg = p * 3.6;
      var right = right,
        left = left;
      if (p > 100 || p < 0) p = 100;
      if (deg <= 180) {
        right.style.cssText = "transform:rotate(" + (deg - 180) + "deg);";
        left.style.cssText = "background:#fff;";
      } else {
        right.style.cssText = "transform:none;";
        left.style.cssText =
          "background:#fcd829;transform:rotate(" + (deg - 360) + "deg);";
      }
    }
  }
};
</script>

<style lang="less" scoped>
@actColor: #ffec4d;
.achieve_con {
  padding: 30px;
}
.achieve_h {
  color: #fff;
  background: #f3595d;
  border-radius: 20px 20px 0 0;
  padding: 0 30px;
  position: relative;
  & > div {
    font-size: 26px;
    text-align: center;
    margin-bottom: 20px;
  }
  .head {
    display: flex;
    flex-direction: column;
    align-items: center;
    .head_img {
      width: 235px;
    }
    .head_medal {
      position: absolute;
      right: 37px;
      top: 0;
    }
    .head_card {
      width: 215px;
      position: relative;
      margin-top: -13px;
      display: flex;
      align-items: center;
      flex-direction: column;
      .card_lv {
        width: 70px;
        height: 26px;
        background: #f8b551;
        color: #fff;
        line-height: 26px;
        text-align: center;
        margin-top: -15px;
        border-radius: 100px;
        font-size: 22px;
      }
    }
  }
  .gonglue_btn {
    font-size: 26px;
    width: 150px;
    height: 45px;
    border-radius: 100px;
    background: #fff;
    margin: 0 auto;
    text-align: center;
    line-height: 45px;
    color: #000;
  }
}
.actieve_hf {
  height: 115px;
  color: #fff;
  text-align: center;
  font-size: 25px;
  display: flex;
  position: relative;
  align-items: center;
  img {
    margin-top: -1px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .hf_text {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 115px;
    line-height: 115px;
    padding-top: 20px;
    z-index: 2;
    span {
      font-weight: bold;
    }
  }
}
.progress {
  display: flex;
  margin-bottom: 0 !important;
  justify-content: space-around;
  align-items: center;
  padding: 0 50px;
  .and {
    font-size: 40px;
  }
}
.actieve_c {
  width: 100%;
  margin-top: 30px;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  .c_th {
    height: 65px;
    font-size: 24px;
    line-height: 65px;
    background: #ffeeee;
    display: flex;
    align-items: center;
  }
  .c_tb {
    font-size: 28px;
    & > div {
      display: flex;
      align-items: center;
      height: 100px;
      border-radius: 20px;
      background-color: #fff;
      margin-bottom: 6px;
      &:first-child {
        border-radius: 0 0 20px 20px;
      }
    }
  }
  .t_1 {
    width: 110px;
    text-align: center;
  }
  .t_2 {
    width: 240px;
    .color_y {
      display: inline-block;
      width: 65px;
      height: 26px;
      border-radius: 100px;
      text-align: center;
      line-height: 26px;
      color: #fff;
      font-size: 20px;
      background: #f8b551;
    }
  }
  .t_3 {
    flex: 1;
  }
  .t_btn {
    width: 80px;
    height: 40px;
    border-radius: 100px;
    font-size: 26px;
    border: 1px solid #e7e7e7;
    line-height: 40px;
    text-align: center;
    margin-right: 30px;
    color: #666666;
  }
}
.wrap {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #fff;
  text-align: center;
}
.right-part {
  width: 200px;
  height: 200px;
  position: absolute;
  clip: rect(0px, auto, auto, 100px);
}
.right {
  width: 200px;
  height: 200px;
  position: absolute;
  border-radius: 50%;
  background: #fcd829;
  clip: rect(0px, auto, auto, 100px);
}
.r-shadow {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  left: 25px;
  top: 25px;
}

.left-part {
  width: 200px;
  height: 200px;
  position: absolute;
  clip: rect(0px, 100px, auto, 0px);
}
.left {
  width: 200px;
  height: 200px;
  position: absolute;
  border-radius: 50%;
  background: #fcd829;
  clip: rect(0px, 100px, auto, 0px);
}
.l-shadow {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  left: 25px;
  top: 25px;
}
#desc {
  display: flex;
  flex-direction: column;
  width: 180px;
  height: 180px;
  font-size: 56px;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 50%;
  font-size: 26px;
  text-align: center;
  background: #f3595d;
  color: #fff;
  span {
    display: block;
    &:first-child {
      font-size: 22px;
    }
    &:nth-child(2) {
      font-size: 42px;
      color: #fcd829;
      margin-top: 10px;
      margin-bottom: 5px;
    }
    &:last-child {
      font-size: 22px;
      color: #fcd829;
    }
  }
}
</style>

