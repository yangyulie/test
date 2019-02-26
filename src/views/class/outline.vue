<!--
  TODO:
  兑换的逻辑未完成
 -->
<template>
  <wx-view class="class_index">
    <wx-view class="wrap">
      <wx-view class="index_h">
        <img src="../../assets/img/class/pic_01.jpg">
        <!-- <img :src="outlineData.picture"/> -->
        <wx-view class="c_title">
          <!-- <wx-view class="c_author">{{outlineData.teacher}} · {{outlineData.name}}</wx-view> -->
          <wx-view class="c_author">{{outlineData.name}}</wx-view>
          <wx-view class="c_name">{{outlineData.title}}</wx-view>
        </wx-view>
      </wx-view>
      <wx-view class="c_lists">
        <wx-view class="c_tabLists">
          <wx-text
            v-for="(item,index) in tabList"
            :key="index"
            :class="{now:index==isNow}"
            class="c_tabList"
            @click.native="setNow(index,item.tabType)"
          >{{item.text}}</wx-text>
        </wx-view>
        <wx-view v-show="isNow==0">
          <wx-view class="introduce_star">
            <wx-view class="star_tit">
              <wx-view>{{outlineData.name}}</wx-view>
              <wx-view class="num_total">{{learnNum}}人学过</wx-view>
            </wx-view>
            <wx-view class="model">{{introduceData.model}}</wx-view>
            <!-- <wx-view class="starBox" v-for="(item,index) in introduceData.rating" :key="index">
              <wx-view class="icon"><img :src="item.img" alt=""></wx-view>
              <wx-view>{{item.name}}</wx-view>
              <wx-view class="star" :style="{backgroundPosition:(item.num-5)*66+'px'}"></wx-view>
            </wx-view>-->
            <!-- <img src="/static/imgs/pic_06.jpg" style="width:100%" alt=""> -->
            <img :src="introduceData.picture_star" style="width:100%" alt>
          </wx-view>
          <wx-view class="introduce_box">
            <wx-view class="introduce_tit">课程简介</wx-view>
            <wx-view class="introduce_con">
              {{str}}
              <wx-text
                @click.native="onMore"
                v-if="isShowMore"
                class="more"
              >{{isShowText?'收起':'更多'}}</wx-text>
            </wx-view>
          </wx-view>
          <wx-view class="imgsBox" v-for="(item,index) in introduceData.intro_imgs" :key="index">
            <img :src="item" style="width:100%" alt>
          </wx-view>
        </wx-view>
        <wx-view class="c_outline" v-show="isNow==1">
          <wx-view v-for="(item,index) in list" :key="index">
            <router-link
              class="c_publication"
              :to="{path:'/class/detail',query: {id: item.id}}"
              v-if="outlineData.is_buy||(!outlineData.is_buy&&item.is_audition)"
            >
              <wx-view class="c_publicationWrap">
                <wx-text class="c_publicationTit">{{item.sequence}}</wx-text>
                <wx-text class="c_publicationText">{{item.name}}</wx-text>
              </wx-view>
              <wx-view v-if="!outlineData.is_buy">
                <wx-view v-if="item.is_audition">
                  <wx-text class="c_audition">试听</wx-text>
                </wx-view>
                <wx-view class="c_auditionImg" v-else>
                  <img src="../../assets/img/class/icon_15.png" alt>
                </wx-view>
              </wx-view>
              <wx-view v-else>
                <img src="../../assets/img/class/icon_16.png" alt>
              </wx-view>
            </router-link>
            <wx-view class="c_publication" v-else>
              <wx-view class="c_publicationWrap">
                <wx-text class="c_publicationTit">{{item.sequence}}</wx-text>
                <wx-text class="c_publicationText">{{item.name}}</wx-text>
              </wx-view>
              <wx-view v-if="!outlineData.is_buy">
                <wx-view v-if="item.is_audition">
                  <wx-text class="c_audition">试听</wx-text>
                </wx-view>
                <wx-view class="c_auditionImg" v-else>
                  <img src="../../assets/img/class/icon_15.png" alt>
                </wx-view>
              </wx-view>
              <wx-view v-else>
                <img class="icon_16" src="../../assets/img/class/icon_16.png" alt>
              </wx-view>
            </wx-view>
          </wx-view>
        </wx-view>
      </wx-view>
    </wx-view>
    <wx-view class="foot">
      <div class="c_share" @click="share">分享</div>
      <wx-view class="c_outlineBtn" @click.native="jumpPage" v-if="!outlineData.is_buy">试听</wx-view>
      <wx-view v-if="!outlineData.is_buy" class="payBtn" @click.native="showLayer()">
        <wx-view class="c_exchange" v-if="outlineData.type == 2">兑换小黄鱼
          <wx-text class="c_exchangeNum">{{outlineData.score}}</wx-text>
        </wx-view>
        <wx-view class="c_exchange" v-else>立即购买
          <wx-text>￥：{{outlineData.price || '--'}}</wx-text>
        </wx-view>
      </wx-view>
      <!--<wx-view v-else  class="payBtn">-->
      <!--<wx-view class="c_exchanged">播放<img src="../../assets/img/class/icon_17.png" alt=""></wx-view>-->
      <!--</div>-->
    </wx-view>
    <wx-view class="c_payLayer" :class="{show:isShow}" @click.native="showLayer()">
      <wx-view class="c_layerWrap">
        <wx-view class="c_layerTit">
          <wx-view class="c_layerTitName">兑换信息</wx-view>
          <wx-text class="c_layerClose">取消</wx-text>
        </wx-view>
        <wx-view class="c_layerLists" v-if="outlineData.type == 2">
          <wx-view class="c_layerList">
            <wx-text>小黄鱼总值</wx-text>
            <wx-text class="strong">{{outlineData.remain}}</wx-text>
          </wx-view>
          <wx-view class="c_layerList">
            <wx-text>确认支付</wx-text>
            <wx-text class="red strong">{{outlineData.score}}</wx-text>
          </wx-view>
          <wx-view class="c_layerList">
            <wx-text>课程名称</wx-text>
            <wx-text class="strong">&lt;&lt;{{outlineData.name}}>></wx-text>
          </wx-view>
        </wx-view>
        <wx-view class="c_layerLists" v-else>
          <wx-view class="c_layerList">
            <wx-text>确认支付</wx-text>
            <wx-text class="red strong">{{outlineData.price}}</wx-text>
          </wx-view>
          <wx-view class="c_layerList">
            <wx-text>课程名称</wx-text>
            <wx-text class="strong">《{{outlineData.name}}》</wx-text>
          </wx-view>
        </wx-view>
        <wx-view
          class="c_submit"
          v-if="outlineData.type == 2"
          @click.native="submitPay($event)"
        >{{outlineData.remain>outlineData.score?'确定':'小黄鱼不够，做任务送小黄鱼'}}</wx-view>
        <wx-view class="c_submit" @click.native="submitPay($event)" v-else>确定</wx-view>
      </wx-view>
    </wx-view>
    <wx-view class="c_payedLayer" :class="{show:isPayed}">
      <wx-view class="c_payedInner">
        <img src="../../assets/img/class/icon_18.png" alt>
        <wx-text>兑换成功</wx-text>
      </wx-view>
    </wx-view>
    <transition v-if="showShare" name="opc">
      <Share :url="url" @hide="hideShare"></Share>
    </transition>
  </wx-view>
</template>

<script>
import Api from "@/api/class";
import wxView from "@/components/view";
import wxText from "@/components/text";
import Share from "@/components/shareImg";
import UserApi from "@/api/user";
//这个时候APi里就有 api.getxxxx方法了，这个方法会把你请求的结果返回用.then（res=》{xxxx}）
export default {
  components: {
    wxView,
    wxText,
    Share
  },
  data() {
    return {
      introduce: {},
      getLists: {},
      tabList: [
        { text: "课程介绍", tabType: 0 },
        { text: "课程大纲", tabType: 1 }
      ],
      outlineData: {
        is_buy: 1
      },
      isNow: 0,
      type: 0,
      publication: {},
      id: 1,
      list: [],
      isShow: false,
      introduceData: {
        intro: ""
      },
      str: "",
      isShowMore: false,
      isShowText: false,
      // 学习人数
      learnNum: 0,
      isPayed: false,
      url: "",
      showShare: false
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.setNow(this.$route.query.type >> 0);
    this.getOutline();
    this.getIntroduce();
    this.getWXSdk();
  },
  methods: {
    getWXSdk:function(){
      if (window.isWeixin) {
        let requestData = {
          url: location.href
        };
        let getUrl = "/index/weixin/share";
        Api.getCourseList(requestData, getUrl).then(res => {
          wx.config(res.data);
        })
      }
    },
    jumpPage: function() {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].is_audition) {
          this.$router.push({ path: "/class/detail?id=" + this.list[i].id });
          break;
        }
      }
    },
    share() {
      if(window.isApp){
        this.openSharePage('course')
        return;
      }
      UserApi.share({
        id: 4
      }).then(res => {
        this.showShare = true;
        this.url = res.data.url;
      });
    },
    hideShare() {
      this.showShare = false;
    },
    onMore: function() {
      this.isShowText = !this.isShowText;
      if (this.isShowText) {
        this.str = this.introduceData.desc;
      } else {
        this.subStr();
      }
    },
    subStr: function() {
      let str = this.introduceData.desc || "";
      if (str.length > 80) {
        this.str = str.slice(0, 80) + "...";
        this.isShowMore = true;
      } else {
        this.str = str;
        this.isShowMore = false;
      }
    },
    getIntroduce: function() {
      let requestData = {
        course_id: this.id
      };
      let getUrl = "/index/course/course_detail.html";
      Api.getCourseList(requestData, getUrl).then(res => {
        const data = res.data;
        data.intro_imgs = [
          data.picture_mode,
          data.picture_people,
          data.picture_teacher,
          data.picture_recite,
          data.picture_notice
        ];
        this.introduceData = res.data;
        this.learnNum =
          this.introduceData.view_um + this.introduceData.buy_um || 0;
        this.subStr();
      });
    },
    submitPay: function(e) {
      if(this.outlineData.type == 2){
        if(this.outlineData.remain<this.outlineData.score){
          this.$router.push({ path: "./../user/invatRecord"});
          return
        }
      }
      // let isPay = e.target.getAttribute("data-is-pay");
      // console.log(e)
      // console.log(isPay)
      // if (!isPay) {
      //   this.$router.push({ path: "./views/user/invatRecord"});
      //   return
      // };
      // TODO: 购买
      let getUrl = "index/course/buy.html";
      let price =
        this.outlineData.type == 2
          ? this.outlineData.score
          : this.outlineData.price;
      let data = {
        course_id: this.id,
        type: this.outlineData.type,
        price: price
      };
      console.log(this.outlineData.type)
      if (this.outlineData.type==1){//人民币支付
        if (window.isWeixin) {
          data.pay_source='weixin';
          Api.getCourseList(data, getUrl).then(res => {//请求支付数据
            console.log(222, res)
            let _data=res.data;
            //发起支付
            wx.chooseWXPay({
              timestamp: res.data.pay.timeStamp,
              nonceStr: res.data.pay.nonceStr,
              package: res.data.pay.package,
              signType: res.data.pay.signType,
              paySign: res.data.pay.paySign,
              success(res) {
                let getUrl = '/index/course/query_payment_result';
                let data = {
                  order_no: _data.order_no,
                  pay_source: _data.pay_source
                }
                Api.getCourseList(data, getUrl).then(res => {
                  console.log(222, res)
                  if(res.code==0){
                    this.outlineData.is_buy =1;
                    this.setData({
                      isPayed: true,
                      'outlineData.is_buy': 1
                    });
                    setTimeout(() => {//关闭浮层
                      this.setData({
                        isPayed: false
                      });
                    }, 1500)
                  }
                  
                })
                console.log(111, res)
              },
              fail(res) {
                alert('支付失败')
                console.log(3333, res)
              }
            })
          })
        } else if (window.isApp) {
          data.pay_source = 'weixin_app'
          Api.getCourseList(data, getUrl).then(res => {//请求支付数据
            let _data=res.data;
            this.appPay({
              type: 'weixin',
              order: res.data.pay,
            }, () => {
              let getUrl = '/index/course/query_payment_result';
                let data = {
                  order_no: _data.order_no,
                  pay_source: _data.pay_source
                }
                Api.getCourseList(data, getUrl).then(res => {
                  console.log(222, res)
                  if(res.code==0){
                    this.outlineData.is_buy =1;
                    this.setData({
                      isPayed: true,
                      'outlineData.is_buy': 1
                    });
                    setTimeout(() => {//关闭浮层
                      this.setData({
                        isPayed: false
                      });
                    }, 1500)
                  }
                  
                })
            })
          })
        }
      }else{//小黄鱼兑换
        Api.getCourseList(data, getUrl).then(res => {
          console.log(9999,res)
          //支付成功
          this.outlineData.is_buy =1;
          this.setData({
            isPayed:true,
            'outlineData.is_buy':1
          });
          console.log(666,this.outlineData.is_buy)
          setTimeout(() => {//关闭浮层
            this.setData({
              isPayed:false
            });
          }, 1500)
        })
      }
    },
    setNow: function(index) {
      this.isNow = index;
    },
    getOutline: function() {
      let requestData = {
        course_id: this.id
      };
      let getUrl = "index/course/course_subsection.html";
      Api.getCourseList(requestData, getUrl).then(res => {
        let index = -1;
        res.data.list = res.data.list.map((v, i) => {
          if (v.sequence) {
            index = i;
          } else {
            i -= index;
            v.sequence = i < 10 ? "0" + i : i;
          }
          return v;
        });
        this.outlineData = res.data;
        this.list = res.data.list;
        console.log(this.outlineData);
      });
    },
    showLayer: function() {
      this.isShow = !this.isShow;
    }
  }
};
</script>

<style lang="less" scoped>
.imgsBox {
  margin-left: -30px;
  margin-right: -30px;
}
.introduce_box {
  background-color: #fff;
  border-radius: 10px;
  margin-top: 20px;
  overflow: hidden;
  font-size: 28px;
  line-height: 52px;
  color: #666;
  margin-bottom: 20px;
}
.introduce_con {
  padding: 25px;
  height: 100%;
}
.more {
  color: #db4447;
  margin-left: 0px;
}
.introduce_tit {
  color: #333;
  font-size: 28px;
  padding: 27px 0;
  line-height: 28px;
  border-bottom: 1px solid #ddd;
}
.icon_16{ width: 42px;}
.introduce_tit:before {
  content: "";
  display: inline-block;
  width: 15px;
  vertical-align: middle;
  height: 28px;
  margin-right: 10px;
  background-color: #db4447;
  border-radius: 0 5px 5px 0;
}
.icon {
  margin-right: 20px;
}
.introduce_star {
  background-color: #fff;
  overflow: hidden;
  border-radius: 10px;
  padding: 50px 25px 0;
  margin-top: 20px;
}
.star_tit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 42px;
  color: #333;
}
.num_total,
.model {
  font-size: 22px;
  color: #999;
}
.star {
  background: url(../../assets/img/class/icon_14.png) no-repeat left center/auto
    25px;
  width: 290px;
  height: 28px;
  margin-left: 30px;
}
.starBox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 60px;
  height: 28px;
  line-height: 28px;
  font-size: 28px;
  color: #333;
}
.model {
  margin-top: 15px;
  margin-bottom: 50px;
}
.strong {
  font-weight: bold;
}
.class_index {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
.wrap {
  overflow-y: auto;
  flex: 1;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  background: #f7f7f7;
}
.foot {
  display: flex;
  background-color: #fff;
  height: 90px;
}
.index_h {
  position: relative;
}
.c_title {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  z-index: 2;
  padding: 108px 30px 0;
  color: #fff;
  font-size: 42px;
}
.c_author {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.c_name {
  font-size: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.c_lists {
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
.c_publication {
  margin-top: 20px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 30px 20px;
  font-size: 28px;
  color: #333;
  border-radius: 10px;
}
.c_publicationWrap {
  display: flex;
  line-height: 32px;
  justify-content: flex-start;
  align-items: center;
}
.c_publicationTit {
  font-size: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.c_publicationTit:after {
  content: "";
  background-color: #b6b6b6;
  display: block;
  width: 2px;
  height: 22px;
  margin: 0 20px;
}
.c_audition {
  border-radius: 10px;
  border: 1px solid #db4447;
  color: #db4447;
  font-size: 24px;
  height: 43px;
  line-height: 43px;
  padding: 0 15px;
}
.foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
  color: #333;
  border-top: 1px solid #eee;
}
.c_share {
  background: url("../../assets/img/class/icon_04.png") no-repeat center
    center/45px auto;
  padding: 10px 50px 10px 160px;
  margin-left: -53px;
  border-right: 2px solid #eee;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
}
.c_outlineBtn {
  background: url("../../assets/img/class/icon_05.png") no-repeat left
    center/33px auto;
  padding-left: 47px;
  margin: 0 50px;
  white-space: nowrap;
}
.payBtn {
  height: 100%;
  flex: 1;
}
.payBtn .c_exchanged {
  width: 100%;
}
.payBtn .c_exchanged img {
  margin-left: 10px;
}
.c_exchange,
.c_exchanged {
  width: 332px;
  box-sizing: border-box;
  height: 100%;
  background-color: #db4447;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  padding: 0 50px 0 30px;
}
.c_exchangeNum {
  background: url("../../assets/img/class/icon_06.png") no-repeat left
    center/28px auto;
  padding-left: 39px;
}
.c_payLayer {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  visibility: hidden;
  align-items: flex-end;
}
.c_payLayer.show {
  visibility: visible;
}
.c_layerWrap {
  background-color: #fff;
  box-shadow: 0 -10px 10px #dfdedf;
  width: 100%;
  transform: translateY(1000px);
  transition: all 0.5s;
}
.c_payLayer.show .c_layerWrap {
  transform: translateY(0);
}
.c_layerTit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  height: 90px;
  font-size: 32px;
  color: #333;
}
.c_layerTitName {
  flex: 1;
  text-align: center;
}
.c_layerClose {
  font-size: 28px;
  color: #366cc6;
  margin-right: 35px;
}
.c_layerLists {
  padding: 10px 28px;
  color: #333;
  font-size: 26px;
}
.c_layerList {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f4f4f4;
  height: 99px;
}
.red {
  color: #db4447;
}
.c_submit {
  margin: 30px auto 50px;
  width: 670px;
  height: 90px;
  line-height: 90px;
  color: #fff;
  font-size: 32px;
  font-weight: bold;
  background-color: #db4447;
  text-align: center;
  border-radius: 10px;
}
.c_exchanged {
  justify-content: center;
}
.c_publicationText {
  margin: 0 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 400px;
}
.c_audition {
  white-space: nowrap;
}
.c_publicationTit {
  flex: 1;
}
.c_payedLayer {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9;
  display: none;
  justify-content: center;
  align-items: center;
}
.c_payedLayer.show {
  display: flex;
}
.c_payedInner {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  width: 275px;
  box-shadow: 0 0 10px #ccc;
  height: 100px;
  font-size: 32px;
  color: #333;
}
.c_payedInner img {
  margin-right: 20px;
}
</style>

