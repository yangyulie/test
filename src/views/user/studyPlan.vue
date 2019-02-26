<template>
  <div>
    <div class="study_plan f7_con">
      <div class="none" v-if="planData.length==0">暂未购买课程</div>
      <div
        class="plan_list"
        v-for="(item,index) in planData"
        :key="item.id"
        :class="(item.total_num == item.complete_num)?'blue':''"
      >
        <router-link :to="'/class/outline?type=1&id=' + item.course_id">
          <div class="item_title">《{{item.name}}》</div>
          <div class="item_hour">
            <span class="text all">总课时
              <span class="text hour_num">{{item.total_num}}</span>课
            </span>
            <span class="text com">已完成
              <span class="text hour_num">{{item.complete_num}}</span>课
            </span>
          </div>
        </router-link>
        <div class="item_progress">
          <span class="pro_con" :style="{width:(item.complete_num/item.total_num)*100+'%'}"></span>
        </div>
        <div class="item_btn">
          <span class="btn" @click="share">
            <img src="@/assets/img/user/plan_icon02.png">邀请好友
          </span>
          <router-link class="btn" :to="'/class/outline?type=1&id=' + item.course_id">
            <img src="@/assets/img/user/plan_icon01.png">课时表
          </router-link>
          <span class="btn" :data-id="item.course_id" :data-idx="index" @click="openPicker($event)">
            <img src="@/assets/img/user/plan_icon03.png" v-if="item.remind!=1">
            <img src="@/assets/img/user/plan_icon03_act.jpg" v-else>
            上课提醒
          </span>
        </div>
      </div>
      <mt-datetime-picker
        v-model="pickerVisible"
        type="time"
        ref="picker"
        @confirm="handleConfirm">
      </mt-datetime-picker>
    </div>
    <Foot></Foot>
    

    <Reg :callback="initCallback"></Reg>
    <transition v-if="showShare" name="opc">
      <Share :url='url' @hide='hideShare'></Share>
    </transition>
  </div>
</template>

<script>
import Foot from "@/components/footer";
import Reg from "@/components/register";
import Share from "@/components/shareImg";
import Api from "@/api/user";
import { DatetimePicker } from 'mint-ui';
export default {
  components: {
    Foot,
    Reg,
    Share
  },
  data() {
    return {
      planData: [],
      initCallback: null,
      url:'',
      showShare:false,
      pickerVisible:'',
    };
  },
  mounted() {
    this.initCallback = {
      value: this.init
    };
  },
  methods: {
    init() {
      this.getData();
    },
    handleConfirm(){
      let time = this.pickerVisible;
      let params = {
        course_id: this.id,
        type: 1,
        time
      }
      Api.remind(params).then(res => {
        console.log(333,res)
        if (res.code) {
          return;
        }
        this.planData[this.idx].remind=1;
        console.log(555,this.idx,this.planData[this.idx])
        this.setData({
          setShow: true,
          text:'设置成功'
        })
        setTimeout(() => {
          this.setData({
            setShow: false
          })
        }, 1000)
      })
      console.log(this.pickerVisible)
    },
    openPicker(e) {
      console.log(11,e)
      this.setData({
        id: e.target.dataset.id,
        idx:e.target.dataset.idx
      })
      if(this.planData[this.idx].remind==1){
        let params = {
          course_id: this.id,
          type: 0,
        }
        Api.remind(params).then(res => {
          console.log(333,res)
          if (res.code) {
            return;
          }
          this.planData[this.idx].remind=0;
          console.log(555,this.idx,this.planData[this.idx])
          this.setData({
            setShow: true,
            text:'取消成功'
          })
          setTimeout(() => {
            this.setData({
              setShow: false
            })
          }, 1000)
        })
      }else{
        this.$refs.picker.open();
      }
      
      
    },
    getData() {
      Api.getStudyPlan({}).then(res => {
        this.planData = res.data.list;
      });
    },
    share() {
      if(window.isApp){
        this.openSharePage('study')
      }
      Api.share({
        id: 5
      }).then(res => {
        this.showShare = true;
        this.url = res.data.url
      });
    },
    hideShare(){
       this.showShare = false;
    }
  }
};
</script>

<style lang="less" scoped>
.study_plan {
  padding: 30px;
  padding-bottom: 100px;
  .none {
    height: 100px;
    width: 100%;
    font-size: 35px;
    text-align: center;
    padding-top: 30px;
  }
  .plan_list {
    background: #fff;
    padding: 30px;
    margin-bottom: 30px;
    border-radius: 10px;
    border-left: 15px solid #f3595d;
    &.blue {
      border-left: 15px solid #366cc6;
    }
    &:last-child {
      margin: 0;
    }
    .item_title {
      color: #000;
      font-size: 28px;
      margin-bottom: 22px;
      font-weight: 400;
    }
    .item_hour {
      font-size: 24px;
      color: #999999;
      .text {
        margin-right: 40px;
        &:last-child {
          margin: 0;
        }
      }
      .hour_num {
        margin: 0 5px;
      }
      .com {
        .hour_num {
          color: #db4447;
        }
      }
      .all {
        .hour_num {
          color: #000;
        }
      }
    }
    .item_progress {
      width: 100%;
      height: 6px;
      background: #efefef;
      border-radius: 50px;
      overflow: hidden;
      margin: 30px 0;
      .pro_con {
        display: block;
        // width: 100%;
        background: #f2777a;
        height: 6px;
        border-radius: 50px;
      }
    }
    .item_btn {
      display: flex;
      .btn {
        width: 50%;
        border-right: 1px solid #dddddd;
        font-size: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
        &:last-child {
          border: 0;
        }
        img {
          height: 26px;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
