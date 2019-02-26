<template>
  <wx-view class="record_container f7_con">
    <wx-view class="record_h">
      <img src="@/assets/img/user/record_bg.jpg" alt>
      <wx-view class="con">
        <wx-view class="line1">
          <wx-text class="num">{{integral}}</wx-text>
          <wx-text>小黄鱼</wx-text>
        </wx-view>
        <wx-text class="line2">消耗积分时,优先使用即将过期的积分</wx-text>
      </wx-view>
    </wx-view>
    <wx-view class="record_c">
      <wx-view class="bread">
        <wx-view @click.native="setList" :class="{act:setFlag}">
          <wx-text>商值明细</wx-text>
        </wx-view>
        <wx-view @click.native="setTask" :class="{act:!setFlag}">
          <wx-text>我的任务</wx-text>
        </wx-view>
      </wx-view>
      <!-- 列表 -->
      <wx-view class="list" v-for="(item, index) in integralList" v-show="setFlag" :key="index">
        <wx-view class="item">
          <wx-view class="des">
            <wx-text class="title">{{item.title}}</wx-text>
            <wx-text class="time">{{item.create_time}}</wx-text>
          </wx-view>
          <wx-text class="num">{{(item.type == 1 ? '+ ' : '- ') + item.integral}}</wx-text>
        </wx-view>
      </wx-view>

      <!-- 任务 -->
      <wx-view class="task" v-show="!setFlag">
        <wx-view class="task_list">
          <wx-view class="head">
            <img src="@/assets/img/user/tesk01.png" alt>
            <wx-text>周常任务</wx-text>
          </wx-view>
          <wx-view class="list_item">
            <wx-view class="item" v-for="(item, index) in day_task" :key="index">
              <img :src="item.icon" alt>
              <wx-text class="text">{{item.title}}</wx-text>
              <wx-view class="right_text over" v-if="item.is_complete">
                <img src="@/assets/img/user/tesk05.png" alt> 已完成
              </wx-view>
              <wx-text class="right_text none" v-else @click.native="onGotoDayTask(item)">立即前往</wx-text>
            </wx-view>
          </wx-view>
          <wx-view class="head">
            <img src="@/assets/img/user/tesk02.png" alt>
            <wx-text>特殊任务</wx-text>
          </wx-view>
          <wx-view class="list_item">
            <wx-view v-for="(item, index) in special_task" :key="index" class="item">
              <img :src="item.icon" alt>
              <wx-text class="text">{{item.title}}</wx-text>
              <wx-view class="right_text over" v-if="item.is_complete">
                <img src="@/assets/img/user/tesk05.png" alt> 已完成
              </wx-view>
              <wx-text class="right_text none" v-else @click.native="onGotoSpecTask(item)">立即前往</wx-text>
            </wx-view>
          </wx-view>
        </wx-view>
      </wx-view>
    </wx-view>
  </wx-view>
</template>

<script>
import wxView from "@/components/view";
import wxText from "@/components/text";
import Api from "@/api/user";
export default {
  components: {
    wxView,
    wxText
  },
  data() {
    return {
      setFlag: false,
      special_task: [],
      day_task: [],
      page: 1,
      page_size: 10,
      integral: 0,
      integralList: []
    };
  },
  mounted() {
    this.data = this;
    this.getTaskList();
    this.getIntegralList();
  },
  methods: {
    getIntegralList() {
      Api.getIntegralList({
        page: this.data.page,
        page_size: this.data.page_size
      }).then(res => {
        this.setData({
          integral: res.data.integral,
          integralList: res.data.list
        });
      });
    },
    getTaskList() {
      Api.getTaskList({}).then(res => {
        const data = res.data;
        this.setData({
          special_task: res.data.special_task,
          day_task: res.data.day_task
        });
      });
    },
    setTask() {
      this.setFlag = false;
    },
    setList() {
      this.setFlag = true;
    },
    onGotoDayTask(item) {
      console.log(item.id)
      // 立即前往
      // TODO: 立即前往
      switch (item.id) {
        case 1: // 赛场
          this.jumpToPage(
            {
              url: "/caimi/competition",
              type: "native",
              param: {}
            },
            function() {}
          );
          console.log('跳转')
          break;
        case 2: // 个人资料
          if (window.isApp) {
            this.jumpToPage(
              {
                url: "/wd/jbxx",
                type: "native",
                param: {}
              },
              function() {}
            );
          } else {
            this.$router.push("/user/info");
          }
          break;
        case 3:
          this.jumpToPage(
            {
              url: "/caimi/competition",
              type: "native",
              param: {}
            },
            function() {}
          );
          break;
        case 4: // 每到练习题
          this.$router.push("/user/studyPlan");
          break;
        case 5: // 评论他人
          this.$router.push("/user/studyPlan");
          break;
        case 6: // 邀请注册
          if (window.isApp) {
            this.openSharePage("register");
          } else {
            this.$router.push("/user/index");
          }
          break;
        case 7: // 分享学习证书
          this.$router.push("/user/achievements");
          break;
        case 8:
          if (window.isApp) {
            this.openSharePage("register");
          } else {
            this.$router.push("/user/index");
          }
          break;
        case 9:
        if (window.isApp) {
            this.openSharePage("register");
          } else {
            this.$router.push("/user/index");
          }
          break;
        case 10:
        if (window.isApp) {
            this.openSharePage("register");
          } else {
            this.$router.push("/user/index");
          }
          break;
      }
    },
    onGotoSpecTask(item) {
      switch (item.id) {
        case 1: // 注册
          // 必定完成
          break;
        case 2: // 个人资料
          if (window.isApp) {
            this.jumpToPage(
              {
                url: "/wd/jbxx",
                type: "native",
                param: {}
              },
              function() {}
            );
          } else {
            this.$router.push("/user/info");
          }
          break;
      }
    },
    setData(data) {
      Object.getOwnPropertyNames(data).forEach(k => {
        console.log("setData", k);
        this[k] = data[k];
      });
    }
  }
};
</script>

<style lang="less" scoped>
.record_h {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    display: block;
  }
  .con {
    position: absolute;
    color: #fff;
    font-size: 26px;
    text-align: center;
    .num {
      font-size: 60px;
      margin-right: 5px;
    }
    .line2 {
      margin-top: 10px;
      font-size: 26px;
      text-align: center;
      display: block;
      width: 100%;
    }
  }
}
.record_c {
  padding: 30px;
  .bread {
    width: 100%;
    display: flex;
    height: 80px;
    font-size: 28px;
    text-align: center;
    background: #fff;
    border-radius: 15px;
    & > div {
      width: 50%;
      height: 80px;
      span {
        display: inline-block;
        height: 100%;
        line-height: 80px;
      }
    }
    & > div.act {
      color: #db4447;
      span {
        border-bottom: 2px solid #db4447;
      }
    }
  }
  .list {
    margin-top: 23px;
    .item {
      height: 120px;
      background: #fff;
      border-bottom: 2px solid #dddddd;
      display: flex;
      padding: 0 30px;
      &:last-child {
        border: 0;
      }
      .des {
        width: 80%;
        height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
          font-size: 28px;
          color: #333333;
          margin-bottom: 10px;
        }
        .time {
          font-size: 20px;
          color: #999999;
        }
      }
      .num {
        text-align: center;
        display: block;
        height: 120px;
        width: 20%;
        font-size: 30px;
        color: #db4447;
        line-height: 120px;
        font-weight: bold;
        &.act {
          color: #74b078;
        }
      }
    }
  }
  .task {
    .task_list {
      border-radius: 10px;
      padding: 30px 0;
      position: relative;
      .head {
        height: 88px;
        display: flex;
        align-items: center;
        font-size: 28px;
        margin-top: 16px;
        padding: 0 30px;
        background: #fff;
        img {
          position: absolute;
          left: 0;
          width: 8px;
        }
      }
      .list_item {
        padding: 0 30px;
        background: #fff;
      }
      .item {
        height: 100px;
        display: flex;
        padding: 0 30px;
        align-items: center;
        border-top: 1px solid #ececec;
        font-size: 26px;
        & > img {
          width: 50px;
          height: 50px;
        }
        .text {
          margin-left: 30px;
        }
        .right_text {
          position: absolute;
          right: 30px;
          &.over {
            color: #74b078;
          }
          &.none {
            color: #366cc6;
          }
        }
      }
    }
  }
}
</style>

