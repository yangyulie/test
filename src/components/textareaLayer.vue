<template>
  <wx-view class="wrap" :class="{show: show}">
    <wx-view class="box">
      <wx-view class="textarea-box">
        <textarea
          ref="textarea"
          v-model="textValue"
          :placeholder="placeholder"
          :maxlength="maxlength"
          @input="onInput"
          bindinput="onInput"
          bindfocus='onFocus'
          autofocus
          @blur='onBlur'></textarea>
      </wx-view>
      <wx-view @click.native="onSubmit" class="submit">发送</wx-view>
    </wx-view>
  </wx-view>
</template>

<script>
import wxView from "@/components/view";
import wxText from "@/components/text";
export default {
  components:{
      wxView,
      wxText
    },
    data() {
      return {
        textValue: ''
      }
    },
    props: [
      'show',
      'value',
      'placeholder',
      'maxlength'
    ],
    watch: {
      show(value) {
        console.log(this)
        console.log('area', value)
        if (value) {
          setTimeout(() => {
            this.$refs.textarea.focus()
          })
        }
      },
      value(value) {
        this.textValue = value
      },
      // placeholder(value){
      //   console.log('placeholder', value)
      //   this.placeholder_t = value
      // },
      // maxlength(value){
      //   console.log('maxlength', value)
      //   this.maxlength_m = value
      // }
    },
    mountend() {
    },
    methods: {
      onInput() {
        this.$emit('input', {
          value: this.textValue,
        })
      },
      onFocus(e) {
        this.setData({
          boxStyle: 'margin-bottom:' + e.detail.height + 'px',
        })
      },
      onBlur(e) {
        this.setData({
          // show: false,
          boxStyle: '',
          textareaStyle: 'height:0px',
        })
        this.$emit('hide')
      },
      onSubmit(e) {
        this.$emit('submit', {
          value: this.textValue,
        })
        this.setData({
          textValue: '',
        })
      }
    }
};
</script>

<style scoped>
.wrap {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  visibility: hidden;
}

.wrap.show {
  visibility: visible;
}

.box {
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  padding: 20px 0 20px 20px;
}

.textarea-box {
  border: 1px solid #ddd;
  border-radius: 10px;
  position: relative;
  flex: 1;
  padding: 10px;
}

.textarea-box textarea {
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
  width: 105px;
  height: 160px;
  line-height: 160px;
  text-align: center;
  font-size: 32px;
  color: #366cc6;
}
</style>
