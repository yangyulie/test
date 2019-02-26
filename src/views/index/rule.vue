<template>
  <div class="rule_container">
    <div class="content">
      <div class="item item_rule">
        <div class="item_h">
          <span class="h_text">炒股大赛规则</span>
          <span class="line"></span>
        </div>
        <div class="item_c">
          <div>
            <div class="list_h">
              <span class="list_num">1</span>
              <span class="list_text">参赛时间</span>
            </div>
            <p class="list_c">每周一9:30开赛，周五15:00收盘结算排名。周六领奖，具体内容见<router-link class="href" to="./user/cashDes">
     提现规则</router-link>；</p>
          </div>
          <div>
            <div class="list_h">
              <span class="list_num">2</span>
              <span class="list_text">参赛方式</span>
            </div>
            <div class="list_c">在炒股大赛界面点击“立即参赛”即可参与当周炒股大赛，每次参赛需缴纳报名费99条小黄鱼。
注意：首次参赛前至少交易3次才视为有效参赛，无效参赛者不参与排名，不参与奖金分配；</div>
          </div>
          <div>
            <div class="list_h">
              <span class="list_num">3</span>
              <span class="list_text">大赛规则</span>
            </div>
            <div class="list_c">①	每位参赛用户报名成功后，将获得10万元炒股虚拟金。 <br>②	参赛用户凭借虚拟金在炒股大赛中进行股票交易。 <br>
            ③	炒股大赛将实时计算参赛用户的收益率，并按照收益率进行排名，每周五15:00收盘结算排名时，排名越靠前的用户，瓜分的奖金将越多。</div>
          </div>
          <div>
            <div class="list_h">
              <span class="list_num">4</span>
              <span class="list_text">奖金规则</span>
            </div>
            <div class="list_c">每周的炒股大赛奖金为10000元现金，奖金将按照排名被参赛者瓜分。</div>
          </div>
          <div>
            <div class="list_h">
              <span class="list_text">瓜分规则</span>
            </div>
            <div class="list_c">①	排名1-10名的奖金固定为1000-100元现金，剩余的奖金按周收益率排名瓜分。<br>② 邀请用户成功注册，将有机会抽取该用户参赛所奖金的20%作为奖励。</div>
          </div>
        </div>
      </div>
      <div class="item item_man">
        <div class="item_h">
          <span class="h_text">主办方</span>
          <span class="line"></span>
        </div>
        <div class="item_c">
          <div class="item_img">
            <img src="@/assets/img/rule/rule_logo01.png" alt>
          </div>
          <div class="item_img">
            <img src="@/assets/img/rule/rule_logo02.png" alt>
          </div>
          <div class="item_img">
            <img src="@/assets/img/rule/rule_logo03.png" alt>
          </div>
          <div class="item_img">
            <img src="@/assets/img/rule/rule_logo04.png" alt>
          </div>
          <div class="item_img">
            <img src="@/assets/img/rule/rule_logo05.png" alt>
          </div>
          <div class="item_img">
            <img src="@/assets/img/rule/rule_logo06.png" alt>
          </div>
        </div>
      </div>
    </div>
    <div class="rule_f" @click="gotoSaichang">立即参赛, 一起瓜分万元大奖</div>
  </div>
</template>

<script>
import Api from "@/api/user";
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    gotoSaichang() {
      console.log('跳转')
      window.jBridgeProxy.callHandler(
        "jumpToPage",
        {
          url: "/caimi/competition",
          type:'native',
          param: {}
        },
        this.callback()
      );
    },
    callback(){

    }
  }
};
</script>

<style lang="less" scoped>
@raduis: 10px;
@backfff: #fff;
@textColor: #ef342a; //字体颜色
@textBg: #ffe4e4; //字体背景
.rule_container {
  font-family: "Microsoft Yahei";
  font-weight: 400;
  min-height: 100vh;
  background: url("../../assets/img/rule/rule_bg_1.jpg") center top no-repeat;
  background-color: #fff8ed;
  .content {
    padding: 0 30px;
    padding-top: 500px;
    padding-bottom: 100px;
    & > div {
      padding: 30px;
    }
  }
  .item {
    border-radius: @raduis;
    background: @backfff;
    margin-bottom: 30px;
  }
  .item_h {
    height: 55px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 25px;
    .h_text {
      padding: 0 20px;
      height: 55px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      border-radius: 50px;
      font-size: 36px;
      color: @textColor;
      background: @textBg;
      position: relative;
      z-index: 9;
    }
  }
  .item_c {
    div {
      margin-bottom: 35px;
      .list_h {
        display: flex;
        margin-bottom: 16px;
        .list_num {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ffe4e4;
          color: #db4447;
          font-size: 26px;
          font-weight: bold;
        }
        .list_text {
          font-size: 30px;
          font-weight: bold;
          margin-left: 10px;
        }
      }
      .list_c {
        font-size: 24px;
        line-height: 40px;
        .href{ color: #2c80f3}
      }
    }
  }
  .item_man {
    overflow: hidden;
    .item_img {
      margin-bottom: 30px;
      width: 33.333%;
      float: left;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80px;
      img {
        width: 80%;
      }
    }
  }
  .line {
    height: 1px;
    width: 100%;
    background: #ffe4e4;
    position: absolute;
    left: 0;
    top: 50%;
  }
  .rule_f {
    height: 90px;
    width: 100%;
    background: #ef3428;
    line-height: 90px;
    text-align: center;
    color: #fff;
    font-size: 38px;
    font-weight: bold;
    position: fixed;
    bottom: 0;
    z-index: 10;
  }
}
</style>

