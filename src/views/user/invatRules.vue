<template>
  <wx-view class="inv_container f7_con">
    <wx-view class="con">
      <wx-view class="item" v-for="(item) in invatRulesData" :key="item.id">
        <wx-text class="item_h">{{item.title}}</wx-text>
        <wx-view class="item_list">
          <wx-text>{{item.content}}</wx-text>
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
      invatRulesData: [
        {
          title: "用户名修改",
          content: "点击下面我的按钮,然后点击您的头像,进入用户信息进行修改"
        },
        {
          title: "课程如何显示",
          content: "进入课程页面,可以进行购买,购买后会在首页显示"
        },
        {
          title: "如何下载APP",
          content: "在应用商店里搜索财咪,可进行下载"
        }
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.inv_container {
  padding-top: 25px;
}
.con {
  padding: 0 40px;
  background: #fff;
  .item {
    border-bottom: 1px solid #dddddd;
    padding: 40px 0;
    font-size: 30px;
    &:last-child {
      border: 0;
    }
    .item_h {
      display: block;
      padding-left: 20px;
      border-left: 6px solid #366cc6;
      margin-bottom: 30px;
    }
    .item_list {
      & > span {
        padding: 0 24px;
        display: block;
        font-size: 28px;
        margin-bottom: 10px;
        line-height: 45px;
        display: flex;
      }
      .l {
        height: 100%;
        font-weight: bold;
      }
      .r {
        display: inline-block;
        height: 100%;
        line-height: 40px;
      }
    }
  }
}
</style>
