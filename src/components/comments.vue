<template>
  <div class="comment-wrapper">
    <div class="comment-list">
      <div class="comment-item" v-for="(item, index) in list" :key="'comment_'+index">
        <div class="comment-item-left">
          <circleImage :heigth="50" :width="62" :image="'little_cat.png'" />
        </div>
        <div class="comment-item-right">
          <div class="comment-item-title">CSS</div>
          <div class="comment-item-content">SVG制作蒙层图片和闪烁边框的应用教程</div>
          <div class="comment-item-date">2020年5月14日</div>
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
<!--  .comment-wrapper {-->
<!--    width: 100%;-->
<!--  }-->

<!--  .comment-item {-->
<!--    display: flex;-->
<!--    margin-bottom: 20px;-->

<!--    &:hover {-->
<!--      .comment-item-content {-->
<!--        cursor: pointer;-->
<!--        color: #e93ead;-->
<!--      }-->

<!--      .comment-item-left {-->
<!--        cursor: pointer;-->
<!--        filter: contrast(110%);-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--  .comment-item-left {-->
<!--    height: 50px;-->
<!--    width: 62px;-->
<!--    margin-left: -6px;-->
<!--  }-->

<!--  .comment-item-right {-->
<!--    text-align: left;-->
<!--    padding-left: 6px;-->
<!--    flex: 1;-->
<!--  }-->

<!--  .comment-item-title {-->
<!--    font-size: 14px;-->
<!--    font-weight: bold;-->
<!--    margin: -2px 0 2px;-->
<!--    color: #e93ead;-->

<!--    &:hover {-->
<!--      cursor: pointer;-->
<!--      color: #000000;-->
<!--    }-->
<!--  }-->

<!--  .comment-item-content {-->
<!--    font-size: 16px;-->
<!--    font-weight: bold;-->
<!--    margin-bottom: 2px;-->
<!--  }-->

<!--  .comment-item-date {-->
<!--    font-size: 14px;-->
<!--    color: #999999;-->
<!--  }-->
<!--</style>-->
