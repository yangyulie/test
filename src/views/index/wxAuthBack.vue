<template>
  <wx-view>
    <div @click="onBack">back</div>
    <div @click="onGoto">goto</div>
    <div @click="onNext">next</div>
  </wx-view>
</template>

<script>
import Api from "@/api/user";
import wxView from "@/components/view";
import wxText from "@/components/text";

export default {
  components:{
    wxView,
    wxText
  },
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
    onBack() {
      window.history.back()
    },
    onGoto() {
      window.history.go(-2)
    },
    onNext() {
      this.$router.push({
        path: '/wxAuthBack',
        query: {
          test: 1,
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
div {
  font-size: 2em;
}
</style>

