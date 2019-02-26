<template>
  <wx-view class="class_index">
    <wx-view class="comment">
      <wx-view class="answerList">
        <wx-view class="userImg"><img :src="answerData.user.avatar" alt=""></wx-view>
        <wx-view class="answerWrap">
          <wx-view class="name">{{answerData.user.nickname}}</wx-view>
          <wx-view class="book cmt_book"><wx-text>已解锁{{answerData.user.period}}课时</wx-text><wx-text>{{answerData.time}}</wx-text></wx-view>
          <wx-view class="answer">{{answerData.answer}}</wx-view>
          <wx-view class="info">
            <wx-view class="question_cmt"><wx-text class="questionIcon">问</wx-text><wx-text class="question_cmt_Con">{{answerData.question}}</wx-text></wx-view>
          </wx-view>
        </wx-view>
      </wx-view>
      <wx-view class="answerLists">
      <wx-view v-for="(item,index) in answerData.comment_list" :key="index" class="answerList">
        <wx-view class="userImg"><img :src="item.user.avatar" alt=""></wx-view>
        <wx-view class="answerWrap">
          <wx-view class="name cmt_book ">{{item.user.nickname}}<wx-text class="cmt_time">{{item.create_time}}</wx-text></wx-view>
          <wx-view class="answer">{{item.content}}</wx-view>
        </wx-view>
      </wx-view>
    </wx-view>
    </wx-view>
    <wx-view class="foot">
      <wx-view class="commentInp" @click.native="isShowAnswerLayer">写评论</wx-view>
    </wx-view>
    <!-- <wx-view class="answerLayer" :class="{show:isShowAnswer}" @click.native="isShowAnswerLayer">
      <wx-view class="answerLayerInner">
        <wx-view class="question_text">
          <textarea v-model="comment_con" @click.stop ></textarea>
        </wx-view>
        <wx-view @click.native="submitAnswer" class="send">发送</wx-view>
      </wx-view>
    </wx-view> -->

    <textarea-layer v-show="isShowAnswer" :show="isShowAnswer" @submit="onTextareaSubmit" @hide="onTextareaHide"></textarea-layer>
  </wx-view>

</template>

<script>

  import Api from "@/api/class";
  import wxView from "@/components/view";
  import wxText from "@/components/text";
  import textareaLayer from "@/components/textareaLayer";

  import { MessageBox } from 'mint-ui';
  //这个时候APi里就有 api.getxxxx方法了，这个方法会把你请求的结果返回用.then（res=》{xxxx}）
  export default {
    components:{
      wxView,
      wxText,
      textareaLayer,
    },
    data() {
      return {
        isShowAnswer:false,
        answerData: {
          user: {},
        },
      }
    },
    mounted() {
      this.data = this
      const answerData = JSON.parse(this.$route.query.data)
      console.log(answerData)
      this.setData({
        answerData,
      })
      this.updateTitle()
    },
    methods: {
      updateTitle() {
        document.title = `${this.data.answerData.comment_list.length}条回复`
      },

      isShowAnswerLayer: function () {
        this.setData({
          isShowAnswer: !this.data.isShowAnswer
        });
      },

      onTextareaHide(e) {
        this.data.isShowAnswer = false
      },
      onTextareaSubmit(e) {
        console.log('submit', e.value)
        const value = e.value
        const answerData = this.data.answerData
        answerData.comment_list.push({
          user: this.$appStore.myUser(),
          content: value,
          create_time: "刚刚",
        });
        this.updateTitle()
        this.setData({
          answerData,
        });
        Api.comment({
          answer_id: answerData.id,
          content: value,
        }).then(res => {
          this.setData({
            isPayed:true
          });
          let _this = this;
          setTimeout(function(){
            _this.setData({
              isPayed: false
            });
          },1500)
          // TODO: 积分 已添加
        })
      },
    }
  };
</script>

<style lang="less" scoped>
  .class_index{ background-color: #f7f7f7; position: absolute; left: 0; top: 0; width: 100%; height: 100%; display: flex; flex-direction: column;}
  .comment{ flex: 1;}
  .foot{ height: 100px; box-sizing: border-box; padding: 10px;}
  .commentInp{ border: 1px solid #ddd; padding: 30px 10px; border-radius: 10px; width: 100%; height: 100%; outline: none; background-color: #fff; resize: none; font-size: 22px; }
  .answerList{ padding: 0 0 0 25px; display: flex; justify-content: space-between; align-items: flex-start; background-color: #fff;}
  .userImg{ display: flex; justify-content: center; align-items: center; width: 60px; height: 60px; border-radius: 50%; overflow: hidden; margin-top: 40px;}
  .answerWrap{width: 640px; font-size: 22px; color: #ccc; padding: 40px 25px 40px 0;}
  .name{ font-size: 28px; color: #333; margin-bottom: 5px;}
  .book{ color: #999; margin-bottom: 10px;}
  .answer{ font-size: 26px; color: #333; line-height: 40px; margin-bottom: 15px;}
  .question_cmt{ display: flex; box-sizing: border-box; padding: 0 10px; width: 354px; height: 45px; justify-content: flex-start; align-items: center; border-radius: 23px; background-color: #f8f8f8; font-size: 22px; color: #999;}
  .question_cmt_Con{ flex: 1;  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  .cmt_book{ display: flex; justify-content: space-between; align-items: center;}
  .questionIcon{ display: inline-block; width: 35px; height: 35px; text-align: center; line-height: 35px; border-radius: 50%; background-color: #fff1f1; font-size: 20px; color: #db4447; margin-right: 10px;}
  .cmt_time{ font-size: 22px; color: #999;}
  .answerLists{ margin-top: 10px; border-bottom: 1px solid #ddd; padding-bottom: 40px; background-color: #fff;}
  .answerLists .answerWrap{ border-bottom: 1px solid #ddd;}
  .answerLayer{ position: fixed; left: 0; top: 0; z-index: 2; width: 100%; height: 100%; background-color: rgba(0,0,0,.5); display: flex; justify-content: center; align-items: flex-end; visibility: hidden;}
  .answerLayer.show{visibility: visible;}
  .answerLayerInner{ width: 100%; background-color: #fff; display: flex; justify-content: space-between; align-items: center; overflow: hidden; box-sizing: border-box; padding: 20px 0 20px 20px;}
  .send{ width: 105px; height: 160px; line-height: 160px; text-align: center; font-size: 32px; color: #366cc6;}
  .question_text{ border: 1px solid #ddd; border-radius: 10px; position: relative; flex: 1; padding: 10px;}
  .question_text textarea{ resize: none; width: 100%; height: 160px; position: relative; z-index: 2; vertical-align: middle; border: 0; outline: none; font-size: 22px; background: none;}
</style>

