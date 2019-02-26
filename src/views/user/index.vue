<template>
  <div>
    <wx-view class="my_index f7_con">
      <wx-view class="index_h">
        <img class="index_bg" src="@/assets/img/user/index_bg.jpg" alt>
        <router-link to="/user/info" tag="div" class="h_info">
          <img class="h_img" :src="userInfo.avatar">
          <wx-view class="h_text">
            <wx-text class="h_name">
              {{userInfo.nickname}}
              <span class="lv">lv.{{userInfo.level}}</span>
            </wx-text>
            <wx-text class="h_tel">已认证</wx-text>
          </wx-view>
          <router-link to="/user/set">
            <img class="fr right" src="@/assets/img/user/right02.png" alt>
          </router-link>
        </router-link>
        <wx-view class="h_num">
          <wx-view class="item">
            <wx-text class="num">{{userInfo.transaction_count}}</wx-text>
            <wx-text class="text">交易次数</wx-text>
          </wx-view>
          <wx-view class="item">
            <wx-text class="num">{{userInfo.learning_duration}}</wx-text>
            <wx-text class="text">学习时长</wx-text>
          </wx-view>
          <wx-view class="item">
            <wx-text class="num">{{userInfo.small_yellow_croaker}}</wx-text>
            <wx-text class="text">小黄鱼</wx-text>
          </wx-view>
        </wx-view>
        <wx-view class="h_card" @click.native="share">
          <img class="card_img" src="@/assets/img/user/invat.png">
          <wx-view class="card_text">
            <wx-text class="card_t1">邀请好友</wx-text>
            <wx-text class="card_t2">每邀请一个好友获得10条小黄鱼</wx-text>
          </wx-view>
          <img class="fr right" src="@/assets/img/user/right.png">
        </wx-view>
      </wx-view>
      <wx-view class="index_c">
        <wx-view class="list">
          <router-link to="/user/studyPlan" tag="div" class="item">
            <img class="icon" src="@/assets/img/icon/my_icon01.png" alt>
            <wx-text class="text">学习计划</wx-text>
            <img class="right" src="@/assets/img/user/right.png" alt>
          </router-link>
          <router-link to="/user/achievements" tag="div" class="item">
            <img class="icon" src="@/assets/img/icon/my_icon02.png" alt>
            <wx-text class="text">我的成就</wx-text>
            <img class="right" src="@/assets/img/user/right.png" alt>
          </router-link>
          <router-link to="/user/invatRecord" tag="div" class="item">
            <img class="icon" src="@/assets/img/icon/my_icon02.png" alt>
            <wx-text class="text">我的鱼塘</wx-text>
            <img class="right" src="@/assets/img/user/right.png" alt>
          </router-link>
        </wx-view>
        <!-- <wx-view class="list">
          <wx-view class="item">
            <img class="icon" src="@/assets/img/icon/my_icon03.png" alt>
            <wx-text class="text">投资组合</wx-text>
            <img class="right" src="@/assets/img/user/right.png" alt>
          </wx-view>
          <wx-view class="item">
            <img class="icon" src="@/assets/img/icon/my_icon04.png" alt>
            <wx-text class="text">我的比赛</wx-text>
            <img class="right" src="@/assets/img/user/right.png" alt>
          </wx-view>
        </wx-view>-->
      </wx-view>

      <Foot></Foot>
    </wx-view>

    <Reg :show="showReg" :callback="initCallback"></Reg>
    <transition v-if="showShare" name="opc">
      <Share :url="url" @hide="hideShare"></Share>
    </transition>
  </div>
</template>

<script>
import wxView from "@/components/view";
import wxText from "@/components/text";
import Foot from "@/components/footer";
import Reg from "@/components/register";
import Share from "@/components/shareImg";
import UserApi from "@/api/user";
export default {
  components: {
    wxView,
    wxText,
    Foot,
    Reg,
    Share
  },
  data() {
    return {
      userInfo: {},
      showReg: false,
      initCallback: null,
      url: "",
      showShare: false
    };
  },
  mounted() {
    this.initCallback = {
      value: this.init
    };
    // if (this.$appStore.needBind) {
    //   this.showReg = true;
    //   return;
    // }
  },
  methods: {
    init() {
      this.getData();
    },
    getData() {
      UserApi.getUserInfo().then(res => {
        let data = res.data;
        this.userInfo = data;
      });
    },
    share() {
      if(window.isApp){
        this.openSharePage('register')
        return;
      }
      UserApi.share({
        id: 1
      }).then(res => {
        this.showShare = true;
        this.url = res.data.url;
      });
    },
    hideShare() {
      this.showShare = false;
    }
  }
};
</script>

<style lang='less' scoped>
.my_index {
  .index_bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
  }
  .index_h {
    padding: 30px 30px;
    height: 386px;
    position: absolute;
    width: 100%;
    z-index: 1;
    .h_info {
      display: flex;
      align-items: center;
      padding-left: 20px;
      margin-bottom: 50px;
      .h_img {
        width: 110px;
        height: 110px;
        border-radius: 50%;
        margin-right: 20px;
        background: #fff;
      }
    }
    .h_num {
      width: 100%;
      display: flex;
      .item {
        width: 33.333%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-self: center;
        text-align: center;
        border-right: 1px solid #fff;
        &:last-child {
          border: 0;
        }
        .text {
          font-size: 26px;
          color: #fac8c9;
        }
        .num {
          font-size: 40px;
          font-weight: bold;
          color: #fff;
          margin-bottom: 20px;
        }
      }
    }
    .h_text {
      display: flex;
      flex-direction: column;
      .h_name {
        font-size: 36px;
        color: #fff;
        margin-bottom: 10px;
      }
      .h_tel {
        font-size: 26px;
        color: #fff;
      }
    }
    .h_card {
      width: 690px;
      height: 125px;
      border-radius: 10px;
      position: absolute;
      bottom: -65px;
      background: #fff;
      display: flex;
      align-items: center;
      padding-left: 20px;
      .card_img {
        width: 94px;
        height: 94px;
        margin-right: 20px;
        background: #fff;
      }
      .card_text {
        display: flex;
        flex-direction: column;
        .card_t1 {
          font-size: 30px;
          // color: #fff;
          margin-bottom: 10px;
        }
        .card_t2 {
          font-size: 22px;
          color: #666666;
        }
      }
    }
  }
  .index_c {
    padding: 466px 30px 0 30px;
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
  .lv {
    display: inline-block;
    width: 68px;
    height: 34px;
    border-radius: 100px;
    font-size: 22px;
    background: #f8b551;
    text-align: center;
    line-height: 34px;
    letter-spacing: 1px;
  }
}
</style>
