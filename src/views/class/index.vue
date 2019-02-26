<template>
  <div>
    <wx-view class="class_index">
      <wx-view class="index_h">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item,index) in getBanner" :key="index">
            <!-- <router-link :to="item.link"> -->
            <img :src="item.picture" alt class="c_slidImg" @click="onBannerItem(item)">
            <!-- </router-link> -->
          </mt-swipe-item>
        </mt-swipe>
      </wx-view>
      <wx-view class="c_lists">
        <wx-view class="c_tabLists">
          <wx-text
            v-for="(item,index) in tabList"
            :key="index"
            :class="{now:index==isNow}"
            class="c_tabList"
            @click.native="setNow(index,item.id)"
          >{{item.name}}</wx-text>
        </wx-view>
        <wx-view class="c_listsWrap">
          <!-- <router-link
            class="c_list"
            v-for="(item,index) in courseList"
            :key="index"
            :to="{path:'/class/outline',query: {id: item.id}}"
          > -->
          <wx-view
            class="c_list"
            v-for="(item,index) in courseList"
            :key="index"
            @click.native="onListItem(item)"
          >
            <wx-view class="c_listImg">
              <img :src="item.picture" alt>
            </wx-view>
            <wx-view class="c_listData">
              <wx-view class="c_title">{{item.name}}</wx-view>
              <wx-view class="c_desc">{{item.desc}}</wx-view>
              <wx-view class="c_teacher">{{item.teacher}}</wx-view>
              <wx-view class="c_data">
                <wx-text class="c_price" :class="{isIntegral:item.type == 1}">{{item.type == 1 ? item.price : item.score}}</wx-text>
                <wx-text class="c_learnersNum">{{item.view_num*1+item.buy_num*1}}人已学习</wx-text>
              </wx-view>
            </wx-view>
          </wx-view>
          <!-- </router-link> -->
        </wx-view>
      </wx-view>
    </wx-view>
    <Foot></Foot>
    <Reg :callback="initCallback"></Reg>
  </div>
</template>

<script>
import Api from "@/api/class";
import wxView from "@/components/view";
import wxText from "@/components/text";
import Foot from "@/components/footer";
import Reg from "@/components/register";
//这个时候APi里就有 api.getxxxx方法了，这个方法会把你请求的结果返回用.then（res=》{xxxx}）
export default {
  components: {
    wxView,
    wxText,
    Foot,
    Reg,
  },
  data() {
    return {
      getBanner: [],
      courseList: [],
      tabList: [],
      isNow: 0,
      pageNum: 10,
      page: 1,
      type: 0,
      isScroll: true,
      initCallback: null,
    };
  },
  mounted() {
    this.data = this;
    this.initCallback = {
      value: this.init,
    }
  },
  methods: {
    init() {
      this.getBannerData();
      this.getCategoryData();
      window.addEventListener("scroll", this.onScroll);
    },
    getCategoryData() {
      Api.getCategory({}).then(res => {
        this.setData({
          tabList: res.data,
          id: res.data[0].id
        });
        this.getCourseList();
      });
    },
    getBannerData: function() {
      let getUrl = "/index/course/course_slide.html";
      let data = {};
      // let obj = { url: getUrl,data:data};
      Api.getCourseList(data, getUrl).then(res => {
        console.log(res, "aaa");
        this.setData({
          getBanner: res.data
        });
      });
    },
    getCourseList() {
      Api.getCourse({
        category_id: this.data.id,
        page: this.data.page,
        page_size: this.data.pageNum
      }).then(res => {
        this.setData({
          courseList: res.data.data
        });
      });
    },
    setNow: function(index, id) {
      this.setData({
        isNow: index,
        page: 1,
        id: id
      });
      this.getCourseList();
    },
    onScroll: function() {
      let scrollTop = this.getScrollTop();
      let winHei = this.getClientHeight();
      let docHei = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      if (docHei - winHei - 100 < scrollTop && this.isScroll) {
        this.isScroll = false;
        this.page = this.page + 1;
        let requestData = {
          category_id: this.type,
          page: this.page,
          page_size: this.pageNum
        };
        let getUrl = "index/course/course_list.html";
        Api.getCourseList(requestData, getUrl).then(res => {
          this.courseList = this.courseList.concat(res.data.data);
          this.isScroll = true;
        });
      }
    },
    getScrollTop: function() {
      //获取滚动条高度
      let scrollTop = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
      } else if (document.body) {
        scrollTop = document.body.scrollTop;
      }
      return scrollTop;
    },
    getClientHeight: function() {
      //获取窗口高度
      var clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        var clientHeight =
          document.body.clientHeight < document.documentElement.clientHeight
            ? document.body.clientHeight
            : document.documentElement.clientHeight;
      } else {
        var clientHeight =
          document.body.clientHeight > document.documentElement.clientHeight
            ? document.body.clientHeight
            : document.documentElement.clientHeight;
      }
      return clientHeight;
    },
    onListItem(item) {
      if (window.isApp) {
        this.isLogin(() => {
          this.jumpToPage({
            url: '/class/outline?id=' + item.id,
            type: 'html'
          })
        })
        return
      }
      this.$router.push({
        path: '/class/outline',
        query: {
          id: item.id,
        }
      })
    },
    onBannerItem(item) {
      if (window.isApp) {
        this.isLogin(() => {
          this.jumpToPage({
            url: '/class/outline?id=' + item.course_id,
            type: 'html'
          })
        })
        return
      }
      this.$router.push({
        path: '/class/outline',
        query: {
          id: item.course_id,
        }
      })
    },
  }
};
</script>

<style lang="less" scoped>
  .class_index{ padding-bottom: 100px;}
.index_h {
  height: 370px;
}
.c_slidImg {
  width: 100%;
}
.c_lists {
  background: #f7f7f7;
  padding: 30px;
}
.c_tabLists {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  background-color: #fff;
}
.c_tabList {
  height: 90px;
  line-height: 90px;
  border-bottom: 2px solid transparent;
  padding: 0 20px;
  font-size: 28px;
  color: #333;
}
.c_tabList.now {
  border-color: #e83015;
  color: #db4447;
}
.c_listsWrap{ margin-top: 20px;}
.c_list {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.c_listImg {
  width: 170px;
  height: 203px;
  overflow: hidden;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.c_listImg::after {
  content: "";
  position: absolute;
  z-index: 2;
  background: url(../../assets/img/class/icon_01.png) no-repeat center/cover;
  width: 15px;
  height: 9px;
  bottom: 0;
  right: 47px;
}
.c_listData {
  margin-left: 35px;
  width: 445px;
  font-size: 22px;
  color: #666666;
  line-height: 35px;
}
.c_title {
  font-size: 30px;
  color: #333;
  margin-bottom: 10px;
}
.c_desc {
  font-size: 24px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 15px;
}
.c_data {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.c_price {
  background: url("../../assets/img/class/icon_02.png") no-repeat left
    center/21px auto;
  padding-left: 28px;
  font-size: 28px;
  color: #db4447;
  line-height: 28px;
}
.c_learnersNum {
  background: url("../../assets/img/class/icon_03.png") no-repeat left
    center/29px auto;
  padding-left: 39px;
  color: #999;
  line-height: 28px;
}
.isIntegral {
  background: none;
  padding-left: 0;
}
.isIntegral:before {
  content: "￥";
  font-size: 0.6em;
}
</style>
<style>
/*.mint-swipe-indicators{ left: 50%; right: inherit;}*/
.mint-swipe-indicator{ width:12px; height: 12px;}
</style>

