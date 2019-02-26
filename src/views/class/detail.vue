<template>
  <wx-view class="class_index">
    <audio
      class="audio"
      ref="audio"
      :src="audioUrl"
      preload
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
      @pause="submitTime"
      @ended="ended"
    ></audio>
    <wx-view class="index_h">
      <mt-swipe :show-indicators="false" :auto="0" @change="handleChange">
        <mt-swipe-item v-for="(item,index) in bannerList" :key="index" @click.native="showLayer">
          <img :src="item" alt class="c_slidImg">
        </mt-swipe-item>
      </mt-swipe>
      <wx-view class="slidImgInfo">
        <wx-text>PPT课件</wx-text>
        <wx-text>{{imgsIndex}}/{{bannerList.length}}</wx-text>
        <wx-text @click.native="showLayer">
          <img class="bigImgBtn" src="../../assets/img/class/icon_07.png" alt>
        </wx-text>
      </wx-view>
      <wx-view class="audioBox">
        <wx-view class="control" :class="{play:audio.isPlay}" @click.native="controlAudio">
          <wx-text class="onplay" v-show="!audio.isPlay"></wx-text>
          <wx-text v-show="audio.isPlay" class="pause"></wx-text>
        </wx-view>
        <wx-view class="progressWrap" ref="progress">
          <wx-view class="progressInner" :style="{width:audio.playTime*audio.progress+'px'}">
            <wx-text class="progressRound"></wx-text>
          </wx-view>
          <wx-view class="timeBox">
            <wx-text>{{audio.startTime}}</wx-text>
            <wx-text>{{audio.endTime}}</wx-text>
          </wx-view>
        </wx-view>
        <wx-view class="playSpeed" @click.native="onSpeed">X{{audio.speed}}</wx-view>
      </wx-view>
    </wx-view>
    <wx-view class="c_lists">
      <wx-view class="c_tabLists">
        <wx-text
          v-for="(item,index) in tabList"
          :key="index"
          :class="{now:index==isNow}"
          class="c_tabList"
          @click.native="setNow(index,item.type)"
        >{{item.text}}</wx-text>
      </wx-view>
      <wx-view v-show="isNow==0">
        <wx-view class="desc">
          <wx-view class="descTit">练习题</wx-view>
          <wx-view class="descWrap" v-html="questionData.desc"></wx-view>
          <wx-view class="questionsBox">
            <wx-view class="mt" v-for="(item,index) in questionData.question_list" :key="index">
              <wx-view class="question">
                <wx-text class="questionIcon">问</wx-text>
                <wx-text class="questionCon">{{item.name}}</wx-text>
              </wx-view>
              <wx-view v-if="questionData.is_answer">
                <wx-view
                  class="question q_answer"
                  data-type="answer"
                  :data-id="item.id"
                  :data-text="item.answer.content"
                  @click.native="showTextareaLayer"
                >
                  <wx-text class="questionIcon">答</wx-text>
                  <wx-view class="questionCon">
                    {{item.answer.content}}
                    <img src="../../assets/img/class/icon_13.png" alt>
                  </wx-view>
                </wx-view>
                <wx-view class="info">
                  <wx-view>{{item.answer.create_time}}</wx-view>
                  <wx-view class="info_icons">
                    <wx-view
                      data-type="answer_comment"
                      data-text
                      :data-index="index"
                      :data-id="item.answer.id"
                      @click.native="showTextareaLayer"
                    >
                      <img src="../../assets/img/class/icon_09.png" alt>
                    </wx-view>
                    <wx-view class="line"></wx-view>
                    <wx-view
                      :class="{red:item.answer.is_praise, ani:item.answer.is_praise&&isIntegral&&praiseIdx_0==index+1}"
                      @click.native="onPraise(item.id,index,item.answer.praise_num,item.answer.is_praise,'')"
                    >
                      <img
                        v-if="item.answer.is_praise"
                        src="../../assets/img/class/icon_11.png"
                        alt
                      >
                      <img v-else src="../../assets/img/class/icon_10.png" alt>
                      {{item.answer.praise_num}}
                    </wx-view>
                    <wx-view class="line"></wx-view>
                    <wx-view>
                      <img src="../../assets/img/class/icon_12.png" alt>
                    </wx-view>
                  </wx-view>
                </wx-view>
                <wx-view class="comment" v-show="item.answer.comment_list.length>0">
                  <wx-view v-for="(i,idx) in item.answer.comment_list" :key="idx" class="msgBox">
                    <wx-view class="msg_name">{{i.name}}:</wx-view>
                    <wx-view class="msg_con">{{i.content}}</wx-view>
                  </wx-view>
                </wx-view>
              </wx-view>
            </wx-view>
            <!-- <router-link class="submit" :to="{path:'/class/answer',query: {id: getExercisesLists.id}}" v-if="!getExercisesLists.type">答题</router-link> -->
            <wx-view v-if="!is_audition">
              <wx-view
                class="submit"
                v-if="!questionData.is_answer"
                :data-id="questionData.id"
                @click.native="onBtnAnswer"
              >答题</wx-view>
            </wx-view>
          </wx-view>
        </wx-view>
        <wx-view class="answerBox">
          <wx-view class="descTit">已有 {{answerNum}}人 回答</wx-view>
          <wx-view v-for="(item,index) in otherAnswerList" :key="index" class="answerList">
            <wx-view class="userImg">
              <img :src="item.user.avatar" alt>
            </wx-view>
            <wx-view class="answerWrap">
              <wx-view class="name">{{item.user.nickname}}</wx-view>
              <wx-view class="book cmt_book">
                <wx-text>已解锁{{item.user.period}}课时</wx-text>
                <wx-text>{{item.time}}</wx-text>
              </wx-view>
              <wx-view class="answer">{{item.answer}}</wx-view>
              <wx-view class="info">
                <wx-view class="question_cmt">
                  <wx-text class="questionIcon">问</wx-text>
                  <wx-text class="question_cmt_Con">{{item.question}}</wx-text>
                </wx-view>
                <wx-view class="info_icons">
                  <!-- <wx-view  @click.native="isShowAnswerLayer(item.id,$event,'',index)"><img src="../../assets/img/class/icon_09.png" alt=""></wx-view> -->
                  <wx-view
                    data-type="other_comment"
                    data-text
                    :data-id="item.id"
                    @click.native="showTextareaLayer"
                  >
                    <img src="../../assets/img/class/icon_09.png" alt>
                  </wx-view>
                  <wx-view class="line"></wx-view>
                  <wx-view
                    :class="{red:item.is_praise, ani:item.is_praise&&isIntegral&&praiseIdx_1==index+1}"
                    @click.native="onPraise(item.id,index,item.praise_num,item.is_praise,'otherAnswerList')"
                  >
                    <img v-if="item.is_praise" src="../../assets/img/class/icon_11.png" alt>
                    <img v-else src="../../assets/img/class/icon_10.png" alt>
                    {{item.praise_num}}
                  </wx-view>
                </wx-view>
              </wx-view>
              <wx-view class="comment comment_other" v-if="item.comment_list.length">
                <wx-view
                  v-for="(i,idx) in item.comment_list.slice(0, commentMore || 5)"
                  :key="idx"
                  class="msgBox"
                >
                  <wx-view class="msg_name">{{i.user.nickname}}:</wx-view>
                  <wx-view class="msg_con">{{i.content}}</wx-view>
                </wx-view>
                <wx-view
                  v-if="item.comment_list.length>commentMore"
                  :data-index="index"
                  class="msg_len"
                  @click.native="onOtherComment"
                >共{{item.comment_list.length}}条回复</wx-view>
              </wx-view>
            </wx-view>
          </wx-view>
        </wx-view>
      </wx-view>
      <wx-view class="draft" v-show="isNow==1">
        <!-- <wx-view class="draftTit">{{draft.title}}</wx-view> -->
        <!-- TODO: html -->
        <wx-view class="draftDesc" v-html="draft.desc"></wx-view>
      </wx-view>
    </wx-view>
    <wx-view class="swiperLayer" :class="{show:isShow}" @click.native="showLayer">
      <mt-swipe :auto="0" @change="handleChange" :defaultIndex="imgsIndex">
        <mt-swipe-item v-for="(item,index) in bannerList" :key="index">
          <img :src="item" @click.native="showLayer" alt class="c_slidImg">
        </mt-swipe-item>
      </mt-swipe>
    </wx-view>
    <!-- <wx-view class="answerLayer" :class="{show:isShowAnswer}" @click.native="isShowAnswerLayer">
      <wx-view class="answerLayerInner">
        <wx-view class="question_text">
          <textarea v-model="answer" @click.stop @input="draftFn"></textarea>
        </wx-view>
        <wx-view @click.native="submitAnswer" class="send">发送</wx-view>
      </wx-view>
    </wx-view>-->
    <!-- <wx-view class="answerLayer" :class="{show:isShowAnswer}" @click.native="isShowAnswerLayer">
      <wx-view class="answerLayerInner">
        <wx-view class="question_text">
          <textarea v-model="answer" @click.stop @input="draftFn"></textarea>
        </wx-view>
        <wx-view @click.native="submitAnswer" class="send">发送</wx-view>
      </wx-view>
    </wx-view>-->
    <textarea-layer
      v-show="isShowAnswer"
      :show="isShowAnswer"
      @input="onTextareaInput"
      @submit="onTextareaSubmit"
      @hide="onTextareaHide"
      :placeholder = 'placeholder'
      :maxlength ='maxlength'
    ></textarea-layer>
    <wx-view class="c_payedLayer" :class="{show:isAnswerIntegral}">
      <wx-view class="c_payedInner newBox">
        <div class='closeThisBox'>
          <img src="../../assets/img/class/icon_19.png" class='icon_19' @click="closeAnswerBox" />
        </div>
        <wx-view class="integralNum">+ {{integral}}
          <img src="../../assets/img/class/icon_02.png" class='icon_02'>
        </wx-view>
        <wx-view class='thisBoxTips'>完成今天的练习题</wx-view>
        <wx-view class='shareBtnThis'>分享今天收获</wx-view>
      </wx-view>
    </wx-view>
    <wx-view class="c_payedLayer" :class="{show:isIntegral}">
      <wx-view class="c_payedInner">
        <wx-text class="integralNum">
          {{integral}}
          <img src="../../assets/img/class/icon_02.png" alt>
        </wx-text>
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
import textareaLayer from "@/components/textareaLayer";
import Share from "@/components/shareImg";
import UserApi from "@/api/user";
//这个时候APi里就有 api.getxxxx方法了，这个方法会把你请求的结果返回用.then（res=》{xxxx}）
export default {
  components: {
    wxView,
    wxText,
    textareaLayer,
    Share
  },
  data() {
    return {
      commentMore: 0,
      bannerList: [],
      getLists: [],
      audioUrl: "",
      tabList: [{ text: "练习题" }, { text: "文稿" }],
      isNow: 0,
      pageNum: 5,
      page: 0,
      type: 0,
      isScroll: true,
      imgsIndex: 1,
      isShow: false,
      audio: {
        speed: 1.0,
        isPlay: false,
        startTime: 0,
        endTime: 0,
        progress: 0,
        currentTime: 0,
        playTime: 0,
        beginTime: 0
      },
      draft: {},
      answerlist: {},
      answer: "",
      getExercisesLists: {},
      getExercisesIn: {},
      isShowAnswer: false,
      commitData: {},
      showTextObj: {},
      isIntegral: false,
      integral: 0,

      textData: {
        type: 0,
        value: ""
      },
      draftData: {},
      questionData: {},
      otherAnswerList: [],
      answerNum: 0,
      url: "",
      showShare: false,
      isAnswerIntegral:false,
      placeholder:'',
      maxlength:-1,
      praiseIdx_0: '',
      praiseIdx_1:'',
      is_audition:1
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.data = this;
    this.getDetailData();
    this.getQuestionData();
    this.getOtherAnswerData();
    if (this.$appStore.state == 1) {
      //答题结束，返回页面获取积分
      this.setData({
        isAnswerIntegral: true,
        integral: this.$appStore.integral
      });
    }

    // this.setNow(0);
    // this.getData();
    // this.getExercisesData();
    // this.getAnswerData();
    // window.addEventListener('beforeunload', e => this.submitTime(e))
    // window.addEventListener('scroll', this.onScroll);
  },
  methods: {
    getDetailData() {
      Api.getDetail({
        id: this.id
      }).then(res => {
        const data = res.data;
        let audio = this.$refs.audio;
        audio.currentTime = data.view_time;
        console.log(data.view_time);
        (this.audio.playTime = data.view_time),
          (this.audio.beginTime = data.view_time),
          (this.audio.startTime = this.realFormatSecond(data.view_time)),
          this.setData({
            bannerList: data.file_list,
            audioUrl: data.audio,
            is_audition:data.is_audition,
            draft: {
              title: "",
              desc: data.content
            }
          });
        console.log(this.audio);
      });
    },
    closeAnswerBox(){
      this.setData({
        isAnswerIntegral: !this.data.isAnswerIntegral
      });
    },
    getOtherAnswerData() {
      Api.getOtherAnswer({
        subsection_id: this.id
      }).then(res => {
        this.setData({
          otherAnswerList: res.data.answer_list,
          answerNum: res.data.answer_num
        });
      });
    },
    /**
     * 获取问题列表
     */
    getQuestionData() {
      Api.getQuestion({
        subsection_id: this.id
      }).then(res => {
        const questionData = res.data;
        if (!questionData.hasOwnProperty("is_answer")) {
          questionData.is_answer = true;
        }
        questionData.question_list.forEach(v => {
          if (!v.is_answer) {
            questionData.is_answer = false;
          }
        });
        this.setData({
          questionData
        });
      });
    },
    /**
     * 跳到答题页
     */
    onBtnAnswer() {
      this.$router.push({
        path: "/class/answer",
        query: {
          data: JSON.stringify(this.data.questionData.question_list)
        },
        params: {
          data: this.data.questionData.question_list
        }
      });
    },
    onPraise(id, idx, num, ispraise, texttype) {
      let index = idx;
      if (texttype == "otherAnswerList") {
        if (ispraise == 0) {
          num += 1;
          this.otherAnswerList[index].is_praise = true;
          this.otherAnswerList[index].praise_num = num;
        } else {
          num -= 1;
          this.otherAnswerList[index].is_praise = false;
          this.otherAnswerList[index].praise_num = num;
        }
        this.setData({
          praiseIdx_1: index+1,
          praiseIdx_0: ''
        });
      } else {
        if (ispraise == 0) {
          num += 1;
          this.questionData.question_list[index].answer.is_praise = true;
          this.questionData.question_list[index].answer.praise_num = num;
        } else {
          num -= 1;
          this.questionData.question_list[index].answer.is_praise = false;
          this.questionData.question_list[index].answer.praise_num = num;
        }
        this.setData({
          praiseIdx_0: index + 1,
          praiseIdx_1: '',
        });
      }
      Api.praise({
        answer_id: id
      }).then(res => {
        if (res.data.type == 1) {
          //答题结束，返回页面获取积分
          this.setData({
            isIntegral: true,
            integral: '-' +res.data.integral
          });
        }else{
          this.setData({
            isIntegral: true,
            integral: '+'+res.data.integral
          });
        }
        let _this = this;
        setTimeout(function () {
          _this.setData({
            isIntegral: false
          });
        }, 1500)
        // TODO: 点赞积分
      });
    },
    /**
     * 其他人回答的评论
     */
    onOtherComment(e) {
      const ele = e.currentTarget;
      this.$router.push({
        path: "/class/comment",
        query: {
          data: JSON.stringify(this.data.otherAnswerList[ele.dataset.index])
        },
        params: {
          data: this.data.otherAnswerList[ele.dataset.index]
        }
      });
    },

    showTextareaLayer(e) {
      this.setData({
        isShowAnswer: !this.data.isShowAnswer
      });

      const ele = e.currentTarget;
      const id = ele.dataset.id;
      const textData = this.data.textData;
      textData.id = id;
      textData.index = ele.dataset.index >> 0;
      textData.type = ele.dataset.type;
      if (ele.dataset.type =='other_comment'){
        this.setData({
          placeholder:'限制140字内',
          maxlength:140
        });
      }
      textData.value = this.data.draft[id] || ele.dataset.text || "";
    },

    onTextareaInput(e) {
      const value = e.value;
      const textData = this.data.textData;
      switch (textData.type) {
        case 1:
          // 答题
          // 存草稿
          this.data.draftData[textData.id] = value;
          break;
      }
    },
    onTextareaHide(e) {
      this.data.isShowAnswer = false;
    },
    onTextareaSubmit(e) {
      console.log("submit", e.value);
      const value = e.value;
      const questionData = this.data.questionData;
      const textData = this.data.textData;
      textData.value = value;
      delete this.data.draftData[textData.id];
      switch (textData.type) {
        case "answer":
          for (const v of questionData.question_list) {
            if (v.id == textData.id) {
              v.answer.content = value;
              this.setData({
                questionData: questionData
              });
              Api.answer({
                data: JSON.stringify([
                  {
                    question_id: textData.id,
                    content: value
                  }
                ])
              }).then(res => {
                // TODO: 修改答案
              });
              break;
            }
          }
          break;
        case "answer_comment":
          const myAnswer = questionData.question_list[textData.index].answer;
          myAnswer.comment_list.push({
            name: "我",
            content: value
          });
          this.setData({
            questionData
          });
          Api.comment({
            answer_id: textData.id,
            content: value
          }).then(res => {
            // TODO: 评论积分 已改
            this.setData({
              isPayed: true
            });
            let _this = this;
            setTimeout(function() {
              _this.setData({
                isPayed: false
              });
            }, 1500);
          });
          break;
        case "other_comment":
          const otherAnswerList = this.data.otherAnswerList;
          const myComment = otherAnswerList[textData.index];
          myComment.comment_list.push({
            user: this.$appStore.myUser(),
            content: value,
            create_time: "刚刚"
          });
          this.setData({
            otherAnswerList
          });
          Api.comment({
            answer_id: textData.id,
            content: value
          }).then(res => {
            // TODO: 评论积分 已改
            this.setData({
              isPayed: true
            });
            let _this = this;
            setTimeout(function() {
              _this.setData({
                isPayed: false
              });
            }, 1500);
          });
          break;
      }
    },
    ended: function() {
      this.audio.isPlay = false;
      this.audio.startTime = "00:00";
      this.audio.currentTime = "00:00";
      this.audio.playTime = 0;
    },
    submitTime: function() {
      let getUrl = "/index/course/audio_view_time.html";
      let data = {
        subsection_id: this.$route.query.id,
        view_time: Math.floor(this.audio.playTime)
      };
      Api.getCourseList(data, getUrl).then(res => {
        console.log(res.message);
      });
      let langTimeUrl = "/index/course/audio_time_log";
      let langTime =
        Math.floor(this.audio.playTime) - Math.floor(this.audio.beginTime);
      let langTimeData = {
        time: langTime,
        subsection_id: this.$route.query.id
      };
      Api.getCourseList(langTimeData, langTimeUrl).then(res => {
        this.audio.beginTime = this.audio.playTime;
        console.log(res.message);
      });
    },
    onSpeed: function() {
      this.audio.speed = this.audio.speed + 0.5;
      if (this.audio.speed > 3) {
        this.audio.speed = 1;
      }
      let audio = this.$refs.audio;
      audio.playbackRate = this.audio.speed;
    },
    controlAudio: function() {
      this.audio.isPlay = !this.audio.isPlay;
      let audio = this.$refs.audio;
      if (this.audio.isPlay) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    onTimeupdate: function(res) {
      this.audio.startTime = this.realFormatSecond(res.target.currentTime);
      this.audio.playTime = res.target.currentTime;
      this.audio.currentTime = this.realFormatSecond(res.target.currentTime);
    },
    onLoadedmetadata: function(res) {
      let progressEle = this.$refs.progress;
      let progressWid = progressEle.$el.offsetWidth;
      this.audio.progress = progressWid / parseInt(res.target.duration);
      this.audio.endTime = this.realFormatSecond(parseInt(res.target.duration));
    },
    realFormatSecond: function(second) {
      //格式化时分秒
      let secondType = typeof second;
      if (secondType === "number" || secondType === "string") {
        second = parseInt(second);
        let hours = Math.floor(second / 3600);
        second = second - hours * 3600;
        let mimute = Math.floor(second / 60);
        second = second - mimute * 60;
        if (hours < 1) {
          return ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2);
        } else {
          return (
            hours +
            ":" +
            ("0" + mimute).slice(-2) +
            ":" +
            ("0" + second).slice(-2)
          );
        }
      } else {
        return "0:00:00";
      }
    },
    handleChange(index) {
      this.imgsIndex = index + 1;
    },
    getData: function() {
      let getUrl = "course/getLessonDetail";
      let data = {};
      Api.getCourseList(data, getUrl).then(res => {
        this.bannerList = res.data.imgs;
        this.audioUrl = res.data.audio.audioUrl;
        this.audio.startTime = this.realFormatSecond(
          res.data.audio.current_time
        );
        this.audio.currentTime = this.realFormatSecond(
          res.data.audio.current_time
        );
        this.audio.playTime = res.data.audio.current_time;
        let audio = this.$refs.audio;
        audio.currentTime = res.data.audio.current_time;
        this.draft = res.data.draft;
      });
    },
    setNow: function(index) {
      this.isNow = index;
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
          id: 1,
          start: this.page,
          num: this.pageNum
        };
        let getUrl = "course/answers";
        Api.getCourseList(requestData, getUrl).then(res => {
          this.answerlist.list = this.answerlist.list.concat(res.data.list);
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
    showLayer: function() {
      this.isShow = !this.isShow;
    }
  },
  share() {
    if(window.isApp){
      this.openSharePage('course')
      return;
    }
    UserApi.share({
      id: 6
    }).then(res => {
      this.showShare = true;
      this.url = res.data.url;
    });
  },
  hideShare() {
    this.showShare = false;
  },
  destroyed() {
    window.removeEventListener("beforeunload", e => this.submitTime(e));
    this.$appStore.state = "";
    this.$appStore.integral = "";
    let audio = this.$refs.audio;
    if (audio) {
      audio.pause();
      this.submitTime();
    }
  }
};
</script>

<style lang="less" scoped>
.question_cmt {
  display: flex;
  box-sizing: border-box;
  padding: 0 10px;
  width: 354px;
  height: 45px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 23px;
  background-color: #f8f8f8;
  font-size: 22px;
  color: #999;
}
.question_cmt_Con {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cmt_book {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.msg_len {
  color: #366cc6;
  font-size: 24px;
  margin-top: 10px;
}
.answerLayer {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  visibility: hidden;
}
.answerLayer.show {
  visibility: visible;
}
.answerLayerInner {
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  padding: 20px 0 20px 20px;
}
.send {
  width: 105px;
  height: 160px;
  line-height: 160px;
  text-align: center;
  font-size: 32px;
  color: #366cc6;
}

.q_answer .questionIcon {
  color: #366cc6;
  background-color: #eaf2ff;
}
.q_answer .questionCon {
  font-weight: normal;
}
.mint-swipe {
  height: 430px;
}
.c_slidImg {
  width: 100%;
}
.slidImgInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  background-color: #fff;
  border-bottom: 2px solid #f4f4f4;
  height: 80px;
  font-size: 28px;
  color: #333;
}
.swiperLayer {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  z-index: 2;
  visibility: hidden;
}
.swiperLayer .mint-swipe {
  width: 100%;
}
.swiperLayer.show {
  visibility: visible;
}
.bigImgBtn {
  width: 40px;
}
.audioBox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 25px;
}
.control {
  display: flex;
  justify-content: center;
  background-color: #ee575a;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.onplay {
  background-color: #fff;
  width: 0;
  height: 0;
  border-width: 20px;
  border-color: #ee575a;
  border-style: solid;
  border-left-width: 25px;
  margin-left: 22px;
  border-left-color: #fff;
  display: block;
}
.pause {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  width: 25px;
}
.pause:before,
.pause:after {
  content: "";
  display: block;
  width: 4px;
  background-color: #fff;
  height: 100%;
}
.progressWrap {
  width: 490px;
  margin-left: 20px;
  height: 100%;
  position: relative;
}
.progressWrap:before,
.progressInner {
  content: "";
  display: block;
  width: 100%;
  height: 15px;
  background-color: #eeeeee;
  border-radius: 8px;
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -8px;
}
.progressInner {
  background-color: #ffa4a4;
  width: 1px;
}
.progressRound {
  width: 25px;
  height: 25px;
  position: absolute;
  right: -12px;
  top: -5px;
  border-radius: 50%;
  background-color: #ff6969;
}
.timeBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: #999;
  margin-top: 60px;
}
.playSpeed {
  width: 78px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  border: 1px solid #999;
  font-size: 22px;
  color: #666;
  margin-left: 30px;
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
.draft {
  background-color: #fff;
  font-size: 28px;
  line-height: 48px;
  color: #333;
  border-radius: 10px;
  margin-top: 20px;
  padding: 50px 30px;
}
.draftTit {
  text-align: center;
  color: #366cc6;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}
.desc {
  border-radius: 10px;
  background-color: #fff;
  padding: 25px 0;
  margin-top: 20px;
  font-size: 28px;
  color: #333;
  line-height: 40px;
}
.descTit {
  font-size: 30px;
  font-weight: bold;
}
.descTit:before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 28px;
  background-color: #e83015;
  border-radius: 0 5px 5px 0;
  vertical-align: middle;
  margin-right: 10px;
}
.descWrap {
  padding: 25px;
  font-size: 22px;
  border-bottom: 1px solid #dddddd;
}
.questionsBox {
  padding: 0 30px;
}
.question {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 20px;
}
.mt {
  margin-top: 40px;
}
.questionIcon {
  display: inline-block;
  width: 35px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  border-radius: 50%;
  background-color: #fff1f1;
  font-size: 20px;
  color: #db4447;
  margin-right: 10px;
}
.questionCon {
  font-size: 30px;
  font-weight: bold;
  width: 600px;
}
.question_text {
  border: 1px solid #ddd;
  border-radius: 10px;
  position: relative;
  flex: 1;
  padding: 10px;
}
.question_Tips {
  color: #999;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.question_text textarea {
  resize: none;
  width: 100%;
  height: 160px;
  position: relative;
  z-index: 2;
  vertical-align: middle;
  border: 0;
  outline: none;
  font-size: 22px;
  background: none;
}
.submit {
  margin: 30px auto 0;
  display: block;
  width: 100%;
  height: 70px;
  text-align: center;
  line-height: 70px;
  color: #fff;
  border-radius: 10px;
  background-color: #db4447;
  font-size: 28px;
}
.answerBox {
  background-color: #fff;
  border-radius: 10px;
  margin-top: 30px;
  padding: 30px 0;
}
.answerList {
  padding: 40px 25px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.userImg {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
}
.answerWrap {
  width: 556px;
  font-size: 22px;
  color: #ccc;
}
.name {
  font-size: 28px;
  color: #333;
  margin-bottom: 5px;
}
.book {
  color: #999;
  margin-bottom: 10px;
}
.answer {
  font-size: 26px;
  color: #333;
  line-height: 40px;
  margin-bottom: 15px;
}
.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.info_icons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.line {
  margin: 0 25px;
  width: 2px;
  height: 26px;
  background-color: #dddddd;
}
.info_icons .red {
  color: #db4447;
}
.comment {
  background-color: #f8f8f8;
  border-radius: 10px;
  font-size: 26px;
  color: #333;
  padding: 10px;
  margin-top: 25px;
}
.msgBox {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.msg_name {
  font-size: 28px;
}
.comment_other {
  background: none;
  border-top: 1px solid #ddd;
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
  box-shadow: 0 0 10px #ccc;
  padding: 22px 20px;
  font-size: 32px;
  color: #333;
}
.c_payedInner img {
  margin-left: 20px;
}
.integralNum {
  color: #e83015;
  font-size: 36px;
  height: 38px;
  line-height: 38px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.integralNum:before {
  content: "";
  font-size: 0.6em;
  font-weight: normal;
  margin-right: 10px;
}
.mint-swipe-indicator {
  width: 12px;
  height: 12px;
}
.newBox{ flex-direction: column;}
.closeThisBox{ text-align: right; height: 23px; width: 100%;}
.icon_19{ width: 23px; vertical-align: top;}
.thisBoxTips{ width: 240px; text-align: center; margin: 15px 0; font-size: 26px; color: #333; line-height: 40px;}
.shareBtnThis{ width: 240px; text-align: center; height: 80px; line-height: 80px; border-radius: 10px; color: #fff; font-size: 28px; background-color: #db4447;}
.red img{ transition: .2s all linear;}
.ani img{ transform: scale(1.2);}
</style>
  <style>
/*.mint-swipe-indicators{ left: 50%; right: inherit;}*/
.mint-swipe-indicator {
  width: 12px;
  height: 12px;
}
</style>

