<template>
  <wx-view class="class_index">
      <wx-view class="questionsBox">
        <wx-view class="mt" v-for="(item,index) in questionList" :key="index">
          <wx-view class="question">
            <wx-text class="questionIcon">问</wx-text>
            <wx-text class="questionCon">{{item.name}}</wx-text>
          </wx-view>
          <wx-view class="question_text">
            <wx-text class="question_Tips" v-show="!item.answer.content.length">请输入你的答案</wx-text>
            <textarea v-model="item.answer.content" data-id="item.id" data-index="index" @input="draft(item.id,index)"></textarea>
          </wx-view>
        </wx-view>
      </wx-view>
    <wx-view class="submit" @click.native="submitAnswer">提交</wx-view>
  </wx-view>
</template>

<script>

  import Api from "@/api/class";
  import wxView from "@/components/view";
  import wxText from "@/components/text";

  import { MessageBox } from 'mint-ui';
  import { Indicator } from 'mint-ui';
  //这个时候APi里就有 api.getxxxx方法了，这个方法会把你请求的结果返回用.then（res=》{xxxx}）
  export default {
    components:{
      wxView,
      wxText
    },
    data() {
      return {
        id:this.$route.query.id,
        getExercisesIn:[],
        questionList: [],
      }
    },
    mounted() {
      this.data = this
      this.id = this.$route.query.id
      const questionList = JSON.parse(this.$route.query.data)
      questionList.forEach(v => {
        v.answer = v.answer || {
          question_id: v.id,
          content: ''
        }
      })
      this.setData({
        questionList,
      })
    },
    methods: {
      draft: function(id, index) { //存储草稿
        // TODO: 存储草稿
        let answer = this.data.questionList[index].answer
      },
      submitAnswer:function(){
        let data = this.data.questionList.map(v => {
          return {
            question_id: v.answer.question_id,
            content: v.answer.content,
          }
        });
        let getUrl = 'index/course/answer.html';
        let isRequest = data.every(function (i) {
          return i.answer_con != '';
        });
        if(!isRequest){
          MessageBox.alert('全部答完才可提交');
        }else{
          Api.answer({
            data: JSON.stringify(data),
          }).then(res => {
            this.$appStore.state = res.data.type;
            this.$appStore.integral = res.data.integral;
            Indicator.close();
            this.$router.back(-1);
          })
        }
      },
    }
  };
</script>

<style lang="less" scoped>
  .class_index{ background-color: #f7f7f7; position: absolute; left: 0; top: 0; width: 100%; height: 100%; display: flex; flex-direction: column;}
  .questionsBox{ flex: 1;}
  .question{ display: flex; justify-content: flex-start; align-items: flex-start; padding: 25px; border-bottom: 1px solid #ddd;}
  .mt{  margin-top: 25px; background-color: #fff;}
  .questionIcon{ display: inline-block; width: 35px; height: 35px; text-align: center; line-height: 35px; border-radius: 50%; background-color: #fff1f1; font-size: 20px; color: #db4447; margin-right: 10px;}
  .questionCon{ font-size: 30px; font-weight: bold; width: 600px;}
  .question_text{ border-bottom: 1px solid #ddd; position: relative; margin: 10px;}
  .question_Tips{ color: #999; font-size: 22px; display: flex; justify-content: center; align-items: center; position: absolute; width: 100%; height: 100%; left: 0; top: 0;}
  .question_text textarea{ resize: none; width: 100%; height: 160px; position: relative; z-index: 2; vertical-align: middle; border: 0; outline: none; font-size: 22px; background: none;}
  .submit{ width: 100%; height: 70px; text-align: center; line-height: 70px; color: #fff; background-color: #db4447; font-size: 28px;}

  </style>

