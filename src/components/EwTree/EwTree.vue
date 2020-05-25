<template>
  <ul class="l_tree">
    <li class="l_tree_branch" v-for="item in model" :key="item.id">
      <div class="l_tree_click">
          <button type="button" class="l_tree_children_btn" v-if="item.children"  @click="toggle(item)">{{ !item.show ? '-' : '+' }}</button>
          <span class="l_folder">{{ item.name }}</span>
      </div>
      <ew-tree v-show="!item.show" v-if="item.children" :model="item.children"></ew-tree>
    </li>
</ul>
</template>

<script>
export default {
  name: 'EwTree',
  data() {
    return {
      
    }
  },
  props: {
    model: {}
  },
  methods: {
    toggle: function (item) {
      var idx = this.model.indexOf(item)
      this.$set(this.model[idx], 'show', !item.show)
    }
  }
}
</script>

<style scoped>
.l_folder{
	font-size: .26rem;
}
*{
	box-sizing: border-box;
	margin: 0;padding: 0;
}
*:before,*:after{
	box-sizing: border-box;
}
ul,
li {
	list-style: none;
}

.l_tree_container {
	width: 100%;
	height: 100%;
	box-shadow: 0 0 3px #ccc;
	margin: 0 .2rem 0 .2rem;
	position: relative;
}

.l_tree {
	width: calc(100%);
	height: 100%;
	padding-left: .4rem;
	margin-block-start: 0;
	margin-block-end: 0;
}
.l_tree_branch {
	width: 100%;
	height: 100%;
	display: block;
	position: relative;
}

.l_tree_branch .l_tree_children_btn {
	position: relative;
	z-index: 9999;
	width: .4rem;
	height: .4rem;
	background-color: #23b1f0;
	font-size: 14px;
	text-align: center;
	line-height: .4rem;
	color: #ffffff;
	outline: none;
	border: 0;
}

ul.l_tree:before {
	content: '';
	border-left: 1px dashed #999999;
	height: calc(100%);
	position: absolute;
	left: .18rem;
	top: 0.3rem;
}

.l_tree,
.l_tree_branch {
	position: relative;
}

.l_tree_branch::after {
	content: '';
	width: .16rem;
	height: 0;
	border-bottom: 1px dashed #fff;
	position: absolute;
	right: calc(100%);
	top: .9rem;
}

.l_tree_container>.l_tree::before,
.l_tree_container>.l_tree>.l_tree_branch::after {
	display: none;
}
</style>