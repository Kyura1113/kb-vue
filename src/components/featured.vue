<template>
  <div class="featured-wrapper">
    <div class="featured-container">
      <div class="featured-top">
        <h3>推荐</h3>
        <a-icon class="featured-icon" type="plus" />
      </div>
      <div class="featured-content" @mouseover="stop" @mouseleave="loop">
        <div class="featured-list" :style="[transformAction, transformSpeed]">
          <div class="featured-item" v-for="(item, index) in loopList" :key="'featured_'+index">
            <div class="featured-item-top">
              <img class="featured-item-image" :src="item.image" height="100%" width="100%" />
            </div>
            <div class="featured-item-bottom">
              <div class="featured-item-title">{{ item.title }}</div>
              <div class="featured-item-content">{{ item.content }}</div>
              <div class="featured-item-date">{{ item.date }}</div>
            </div>
          </div>
        </div>
        <div class="featured-arrows">
          <div class="featured-arrow-circle left" @click="previous">
            <a-icon type="left" class="arrow" />
          </div>
          <div class="featured-arrow-circle right" @click="next">
            <a-icon type="right" class="arrow" />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [{
          title: 'CSS',
          content: 'SVG制作蒙层图片和闪烁边框的应用教程',
          date: '2020年5月14日',
          image: require('@/assets/images/cat.jpg')
        }, {
          title: 'Vue',
          content: '造轮子:Vue轮播卡片',
          date: '2020年6月3日',
          image: require('@/assets/images/little_cat.png')
        }, {
          title: 'JavaScript',
          content: 'ES6常用方法总结',
          date: '2020年5月31日',
          image: require('@/assets/images/double_cat.png')
        }],
        distance: -240,
        speed: 1,
        transformEnd: true,
        timer: null,
        interval1: null,
        interval2: null,
      }
    },
    computed: {
      loopList: function() {
        let length = this.list.length
        return [this.list[length - 1], ...this.list, this.list[0]]
      },
      transformAction: function() {
        return {
          transform: `translateX(${this.distance}px)`,
        }
      },
      transformSpeed: function() {
        return {
          transition: `all ${this.speed}s ease-in-out 0s`
        }
      }
    },
    mounted(){
      this.loop()
      // window.onblur = function(){ this.clearInterval() }.bind(this)
      // window.onfocus = function(){ this.loop() }.bind(this)
    },
    methods: {
      loop(){
        if(this.timer){
          window.clearInterval(this.timer)
          this.timer = null
        }

        this.timer = window.setInterval(()=>{
          this.next()
        },5000)
      },
      next() {
        if (!this.transformEnd) return
        this.transformEnd = false

        if(this.distance -240 <= -240 * this.loopList.length){
          this.speed = 0
          this.distance = -240
          let interval1 = window.setInterval(()=>{
            this.speed = 1
            this.distance = -240 * 2
            window.clearInterval(interval1)
          },50)
        }else{
          this.distance += -240
        }

        let interval2 = window.setInterval(()=>{
          this.transformEnd = true
          window.clearInterval(interval2)
        },1000)

      },
      previous() {
        if (!this.transformEnd) return
        this.transformEnd = false

        if(this.distance >= 0){
          this.speed = 0
          this.distance = -240 * this.list.length
          let interval1 = window.setInterval(()=>{
            this.speed = 1
            this.distance = -240 * (this.list.length - 1)
            window.clearInterval(interval1)
          },50)
        }else{
          this.distance += 240
        }

        let interval2 = window.setInterval(()=>{
          this.transformEnd = true
          window.clearInterval(interval2)
        },1000)

      },
      stop(){
        if(this.timer){
          window.clearInterval(this.timer)
          this.timer = null
        }
      },
    }
  }
</script>

<!--<style lang="scss">-->
<!--  .featured-wrapper {-->
<!--    width: 100%;-->
<!--    padding: 30px 40px 30px;-->
<!--    border-bottom: solid 1px #e6e6e6;-->
<!--  }-->

<!--  .featured-container {-->
<!--    overflow: hidden;-->
<!--  }-->

<!--  .featured-top {-->
<!--    height: 26px;-->
<!--    text-align: left;-->

<!--    h3 {-->
<!--      float: left;-->
<!--      color: #e93ead;-->
<!--      font-weight: bold;-->
<!--    }-->
<!--  }-->

<!--  .featured-content{-->
<!--    position: relative;-->
<!--    height: 100%;-->
<!--  }-->

<!--  .featured-icon {-->
<!--    float: right;-->
<!--    margin-top: 4px;-->
<!--    font-size: 18px;-->
<!--    font-weight: bold;-->
<!--    color: #e93ead;-->
<!--  }-->

<!--  .featured-list {-->
<!--    position: relative;-->
<!--    display: inline-block;-->
<!--    white-space: nowrap;-->
<!--    padding-top: 20px;-->
<!--  }-->

<!--  .featured-item {-->
<!--    display: inline-block;-->
<!--    width: 240px;-->
<!--    white-space: normal;-->
<!--    vertical-align: top;-->

<!--    &:hover {-->
<!--      .featured-item-content {-->
<!--        cursor: pointer;-->
<!--        color: #e93ead;-->
<!--      }-->

<!--      .featured-item-top {-->
<!--        cursor: pointer;-->
<!--        filter: contrast(120%);-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--  .featured-item:first-child {-->
<!--    padding-left: -240px;-->
<!--  }-->

<!--  .featured-item-top {-->
<!--    height: 165px;-->
<!--    width: 240px;-->
<!--  }-->

<!--  .featured-item-image {-->
<!--    border: solid 1px #f4f4f4;-->
<!--    border-radius: 10px;-->
<!--  }-->

<!--  .featured-item-bottom {-->
<!--    text-align: left;-->
<!--  }-->

<!--  .featured-item-title {-->
<!--    font-size: 14px;-->
<!--    font-weight: bold;-->
<!--    color: #e93ead;-->

<!--    &:hover {-->
<!--      cursor: pointer;-->
<!--      color: #000000;-->
<!--    }-->
<!--  }-->

<!--  .featured-item-content {-->
<!--    font-size: 16px;-->
<!--    font-weight: bold;-->
<!--    margin-bottom: 2px;-->
<!--  }-->

<!--  .featured-item-date {-->
<!--    font-size: 14px;-->
<!--    color: #999999;-->
<!--  }-->

<!--  .featured-arrows {-->
<!--    position: absolute;-->
<!--    top: 100px;-->
<!--    width: 220px;-->
<!--    margin: 0 auto;-->
<!--    left: 50%;-->
<!--    transform: translate(-50%, 0);-->
<!--    pointer-events: none;-->

<!--    .featured-arrow-circle {-->
<!--      display: table;-->
<!--      width: 24px;-->
<!--      height: 24px;-->
<!--      background-color: rgba(#000000, 0.3);-->
<!--      border-radius: 50%;-->
<!--      pointer-events: auto;-->

<!--      &:hover {-->
<!--        cursor: pointer;-->
<!--        opacity: 0.8;-->
<!--      }-->
<!--    }-->

<!--    .left {-->
<!--      float: left;-->
<!--    }-->

<!--    .right {-->
<!--      float: right;-->
<!--    }-->

<!--    .arrow {-->
<!--      display: table-cell;-->
<!--      vertical-align: middle;-->
<!--      font-size: 16px;-->
<!--      color: #ffffff;-->
<!--    }-->
<!--  }-->
<!--</style>-->
