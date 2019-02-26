<template>
  <wx-view class="cash_des_container f7_con">
    <wx-view class="con">
      <wx-view class="item">
        <wx-text class="item_h">获奖通知</wx-text>
        <wx-text class="item_c">获奖牛人在比赛结束后两个工作日内会受到牛股王模拟大赛的获奖通知，我们通过站内消息方式发给您。在受到消息后一周内，添加牛股王获奖微信号（stockhn668），联系获奖，如一周内未联系领奖。牛股王有权取消获奖。</wx-text>
      </wx-view>
      <wx-view class="item">
          <wx-text class="item_h">提供相关有效证件</wx-text>
          <wx-view class="item_img">
              <wx-view class="img imgL">
                  <img src="@/assets/img/user/cash01.jpg" alt="" />
                  <wx-text class="imgT">财咪教育APP登陆后<br/>"我的"页面截图</wx-text>
              </wx-view>
              <wx-view class="img imgR">
                  <img src="@/assets/img/user/cash02.jpg" alt="" />
                  <wx-text class="imgT">我的大赛<br/>参赛获奖截图</wx-text>
              </wx-view>
          </wx-view>
          <wx-view class="item_idCard">
              <img src="@/assets/img/user/cash03.jpg" class="idCard" alt="" />
              <wx-text class="imgT">获奖人身份证正反面截图</wx-text>
          </wx-view>
      </wx-view>
      <wx-view class="item">
         <wx-text class="item_h">操作流程</wx-text>
         <wx-view class="item_list">
           <wx-text>1. 扫一扫，添加财咪教育微信号（sotckhnn668）</wx-text>
           <wx-text>2. 提供先关证件给客服人员。</wx-text>
           <wx-text>3. 确认信息无误后，我们会在3个工作日内给您转账。<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;请确认收款。如未收到，联系获奖微信客服处理。</wx-text>
           <wx-text>4. 涉及税款由财咪教育代为缴扣。</wx-text>
         </wx-view>
         <wx-view class="item_weixin">
           <wx-view class="item_l">
             <wx-text class="line1">财咪教育获奖联系微信号</wx-text>
             <wx-text class="line2">stockhn668</wx-text>
             <wx-text class="line3">或者截图保存图片识别微信二维码</wx-text>
           </wx-view>
           <img src="@/assets/img/user/erweima.jpg" alt="" />
         </wx-view>



      </wx-view>
    </wx-view>
  </wx-view>
</template>

<script>
import wxView from "@/components/view";
import wxText from "@/components/text";
export default {
  components: {
    wxView,
    wxText
  }
};
</script>

<style lang="less" scoped>
.cash_des_container {
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
    .item_c{
        display: inline-block;
        line-height: 45px;
        text-align: justify;
    }
    .item_img{
        display: flex;
        .img{
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 50%;
            img{
                width: 80%;
                margin-bottom: 30px;
            }
        }
        .imgT{
            text-align: center;
            width: 100%;
            display: block;
            font-size: 24px;
            line-height: 40px;
        }
    }
    .item_idCard{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 50px;
        font-size: 24px;
        line-height: 40px;
        .idCard{
            width: 80%;
            margin-bottom: 30px;
        }
    }
    .item_list{
      & > span{
        padding: 0 24px;
        display: block;
        font-size: 26px;
        margin-bottom: 10px;
        line-height: 35px;
      }
    }
    .item_weixin{
      background: #f8f8f8;
      border-radius: 10px;
      padding: 35px 30px;
      display: flex;
      width: 100%;
      position: relative;
      margin-top: 40px;
      .item_l{
        display: flex;
        flex-direction: column;
        .line1{
          font-size: 26px;
          margin-bottom: 20px
        }
        .line2{
          font-size: 30px;
          font-weight: bold;
          margin-bottom: 30px;
        }
        .line3{
          font-size: 24px;
          color: #666666;
        }
      }
      img{
        position: absolute;
        right: 30px;
        width: 152px;
        height: 152px;
        float: right
      }
    }
  }
}
</style>
