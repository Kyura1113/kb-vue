<template>
  <div class="tag-wrapper">
    <div class="tag-list">
      <div class="tag-item" v-for="(item, index) in list" :key="'recent_'+index">
        <a class="tag" :class="item.class">{{ item.tagName }}</a>
      </div>
    </div>
    <div style="clear:both"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [{
          tagName: 'Animation',
          count: 2
        }, {
          tagName: 'Html',
          count: 3
        }, {
          tagName: 'React',
          count: 1
        }, {
          tagName: 'Typescript',
          count: 2
        }, {
          tagName: 'Webpack',
          count: 4
        }, {
          tagName: 'Svg',
          count: 2
        }, {
          tagName: 'Vue',
          count: 12,
        }, {
          tagName: 'Canvas',
          count: 1
        }, {
          tagName: 'CSS',
          count: 10
        }, {
          tagName: 'JavaScript',
          count: 5
        }, {
          tagName: '杂谈',
          count: 4
        }],
      }
    },
    created() {
      this.appendClass()
    },
    methods: {
      appendClass() {
        let list = this.list
        let sortList = list.concat()
        sortList.sort((i, j) => j.count - i.count)
        sortList.forEach((item, index) =>{
          const name = item.tagName
          if(index === 0){
            list.forEach( i => {
              if(i.tagName === name){
                i.class = "biggest-size"
              }
            })
          }else if(index > 0 && index < list.length/3 ){
            list.forEach( i => {
              if(i.tagName === name){
                i.class = "middle-size"
              }
            })
          }
        })
        return this.list = list
      },
    }
  }
</script>

<!--<style lang="scss">-->
<!--  .tag-wrapper {-->
<!--    width: 100%;-->
<!--  }-->

<!--  .tag-list{-->
<!--    display: flex;-->
<!--    flex-wrap: wrap;-->
<!--    align-items: baseline;-->
<!--    margin-top: 12px;-->
<!--  }-->

<!--  .tag-item {-->
<!--    margin: -10px 2px 0;-->
<!--  }-->

<!--  .tag{-->
<!--    font-weight: 500;-->
<!--    color: #777777;-->
<!--    &:hover {-->
<!--      color: #2d2d2d;-->
<!--    }-->
<!--  }-->

<!--  .biggest-size{-->
<!--    font-size: 28px;-->
<!--    font-weight: bold;-->
<!--  }-->

<!--  .middle-size{-->
<!--    font-size: 18px;-->
<!--    font-weight: bold;-->
<!--  }-->
<!--</style>-->
