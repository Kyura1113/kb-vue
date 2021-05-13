<template>
  <div class="recent-wrapper">
    <div class="recent-list">
      <div class="recent-item" v-for="(item, index) in list" :key="'recent_'+index">
        <div class="recent-item-left">
          <circleImage :heigth="50" :width="62" :image="'cat.jpg'" />
        </div>
        <div class="recent-item-right">
          <div class="recent-item-title">CSS</div>
          <div class="recent-item-content">SVG制作蒙层图片和闪烁边框的应用教程</div>
          <div class="recent-item-date">2020年5月14日</div>
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
        list: [{}, {}, {}, {}, {}]
      }
    }
  }
</script>

<!--<style lang="scss">-->
<!--  .recent-wrapper {-->
<!--    width: 100%;-->
<!--  }-->

<!--  .recent-item {-->
<!--    display: flex;-->
<!--    margin-bottom: 20px;-->

<!--    &:hover {-->
<!--      .recent-item-content {-->
<!--        cursor: pointer;-->
<!--        color: #e93ead;-->
<!--      }-->

<!--      .recent-item-left {-->
<!--        cursor: pointer;-->
<!--        filter: contrast(110%);-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--  .recent-item-left {-->
<!--    height: 50px;-->
<!--    width: 62px;-->
<!--    margin-left: -6px;-->
<!--  }-->

<!--  .recent-item-right {-->
<!--    text-align: left;-->
<!--    padding-left: 6px;-->
<!--    flex: 1;-->
<!--  }-->

<!--  .recent-item-title {-->
<!--    font-size: 14px;-->
<!--    font-weight: bold;-->
<!--    margin: -2px 0 2px;-->
<!--    color: #e93ead;-->

<!--    &:hover {-->
<!--      cursor: pointer;-->
<!--      color: #000000;-->
<!--    }-->
<!--  }-->

<!--  .recent-item-content {-->
<!--    font-size: 16px;-->
<!--    font-weight: bold;-->
<!--    margin-bottom: 2px;-->
<!--  }-->

<!--  .recent-item-date {-->
<!--    font-size: 14px;-->
<!--    color: #999999;-->
<!--  }-->
<!--</style>-->
