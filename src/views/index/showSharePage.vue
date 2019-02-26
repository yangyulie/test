<template>
  <div class="sharePage">
    <img v-if="imgSrc" :src="imgSrc" class="shareImg" alt>
  </div>
</template>

<script>
import Api from "@/api/user";
export default {
  data() {
    return {
      imgSrc: ""
    };
  },
  mounted() {
    console.log("我刚开始创建");
    this.getPath();
  },
  watch: {
    $route: "getPath"
  },
  methods: {
    getPath() {
      let mountTab = this.$route.query.tab;
      window.onTabChange = string => {
        let id = null;
        switch (string) {
          case "register":
            id = 1;
            break;
          case "match":
            id = 2;
            break;
          case "certificate":
            id = 7;
            break;
          case "investment":
            id = 4;
            break;
          case "study":
            id = 5;
            break;
          case "course":
            id = 6;
            break;
        }
        Api.share({
          id: id
        }).then(res => {
          console.log(this);
          this.imgSrc = res.data.url;
          console.log(this.imgSrc, "2222");
        });
      };
      window.onTabChange(mountTab);
    }
  }
};
</script>

<style lang="less" scoped>
.sharePage {
  width: 100%;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
