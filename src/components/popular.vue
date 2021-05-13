<template>
  <div class="popular-wrapper">
    <div class="popular-list">
      <div class="popular-item" v-for="(item, index) in list" :key="'popular_'+index">
        <div class="popular-item-left">
          <circleImage :heigth="50" :width="62" :image="'cat.jpg'" />
        </div>
        <div class="popular-item-right">
          <div class="popular-item-title">CSS</div>
          <div class="popular-item-content">SVG制作蒙层图片和闪烁边框的应用教程</div>
          <div class="popular-item-date">2020年5月14日</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import circleImage from './circleImage'
  export default {
    components: {
      circleImage
    },
    data() {
      return {
        list: [{}, {}]
      }
    }
  }
</script>

<!--<style lang="scss">-->
<!--  .popular-wrapper {-->
<!--    width: 100%;-->
<!--  }-->

<!--  .popular-item {-->
<!--    display: flex;-->
<!--    margin-bottom: 20px;-->

<!--    &:hover {-->
<!--      .popular-item-content {-->
<!--        cursor: pointer;-->
<!--        color: #e93ead;-->
<!--      }-->

<!--      .popular-item-left {-->
<!--        cursor: pointer;-->
<!--        filter: contrast(110%);-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--  .popular-item-left {-->
<!--    height: 50px;-->
<!--    width: 62px;-->
<!--    margin-left: -6px;-->
<!--  }-->

<!--  .popular-item-right {-->
<!--    text-align: left;-->
<!--    padding-left: 6px;-->
<!--    flex: 1;-->
<!--  }-->

<!--  .popular-item-title {-->
<!--    font-size: 14px;-->
<!--    font-weight: bold;-->
<!--    margin: -2px 0 2px;-->
<!--    color: #e93ead;-->

<!--    &:hover {-->
<!--      cursor: pointer;-->
<!--      color: #000000;-->
<!--    }-->
<!--  }-->

<!--  .popular-item-content {-->
<!--    font-size: 16px;-->
<!--    font-weight: bold;-->
<!--    margin-bottom: 2px;-->
<!--  }-->

<!--  .popular-item-date {-->
<!--    font-size: 14px;-->
<!--    color: #999999;-->
<!--  }-->
<!--</style>-->
