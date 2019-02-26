<template>
  <div id="footer" v-if="!isApp">
    <router-link
      class="footer_wrap"
      v-for="(data,index) in footer"
      :key="index"
      :style="{width:100/footer.length+'%'}"
      :to="data.link"
      tag="div"
    >
      <img class="act" :src="data.actImg" alt>
      <img class="noAct" :src="data.img" alt>
      <span>{{data.name}}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      footer: [
        {
          name: "学习",
          img: require("../assets/img/icon/study.png"),
          actImg: require("../assets/img/icon/study_act.png"),
          link: "/user/studyPlan"
        },
        {
          name: "课程",
          img: require("../assets/img/icon/class.png"),
          actImg: require("../assets/img/icon/class_act.png"),
          link: "/class"
        },
        {
          name: "我的",
          img: require("../assets/img/icon/my.png"),
          actImg: require("../assets/img/icon/my_act.png"),
          link: "/user/index"
        }
      ],
      isApp:window.isApp
    };
  }
};
</script>

<style lang="less" scoped>
#footer {
  width: 100%;
  height: 100px;
  background: #fff;
  display: flex;
  position: fixed;
  bottom: 0;
}
.footer_wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 22px;
  img {
    width: 48px;
    margin-bottom: 3px;
  }
}
.act {
  display: none;
}
.noAct {
  display: block;
}
.router-link-active {
  color: #e65053;
  .act {
    display: block;
  }
  .noAct {
    display: none;
  }
}
</style>
