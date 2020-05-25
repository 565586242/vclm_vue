<template>
  <div class="choose-language" :class="{checked:languageClick}">
    <div @click="languageClick = !languageClick">
      <span>{{language[languageIndex]}}</span>
      <img class="language-icon" :class="{checked:languageClick}" src="../../assets/img/Init/login_icon_shangfan@2x.png" />
    </div>
		<div v-for="(item,index) in language" :key="index" @click="chooseLanguage(index)">
			<span>{{item}}</span>
			<img class="cp-hide" :class="{'language-checked':languageIndex == index}" src="../../assets/img/login_icon_xuanzhong@2x.png" />
		</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      language: ["中文繁體", "中文简体", "English"],
      languageIndex: 1,
      languageClick: false //选择语言是否点击
    };
  },
  methods: {
    /* 选择语言 */
    chooseLanguage(index) {
      this.languageIndex = index;
			localStorage.setItem('languageIndex',index)
      this.languageClick = false;
      if (index == "1") {
				this.$i18n.locale = "zh";
				localStorage.setItem('language','zh')
      } else if (index == "2") {
        this.$i18n.locale = "en";
				localStorage.setItem('language','en')
      } else {
        this.$i18n.locale = "ft";
				localStorage.setItem('language','ft')
      }
    }
  },
  mounted(){
    const language = localStorage.getItem('language')
    const languageIndex = localStorage.getItem('languageIndex')
    if(language && languageIndex){
      this.languageIndex = languageIndex
    }else{
      localStorage.setItem('language','zh')
      localStorage.setItem('languageIndex',1)
    }
  }
};
</script>

<style scoped>
.choose-language {
  overflow: hidden;
  box-sizing: border-box;
  width: 2.4rem;
  height: 0.8rem;
  padding: 0 0.2rem;
  border: 1px solid #4e4e54;
  border-radius: 0.08rem;
  font-size: 0.3466666666666667rem;
  line-height: 0.8rem;
  color: #fff;
  transition: all 0.3s;
}
.choose-language.checked {
  height: 3.2rem;
}
.choose-language > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.language-icon {
  width: 0.18666666666666668rem;
  height: 0.16rem;
  transition: all 0.3s;
}
.language-icon.checked {
  transform: rotate(180deg);
}
.language-checked {
  display: block;
  width: 0.29333333333333333rem;
  height: 0.29333333333333333rem;
}
</style>
