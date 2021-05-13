<template>
  <div class="card-image">
    <svg height="100%" width="100%" :viewBox="viewBox">
      <defs>
        <mask :id="maskId">
          <rect x="0" y="0" :height="heigth" :width="width" fill="#000"></rect>
          <circle :cx="circleX" :cy="circleY" :r="circleR" fill="#fff"></circle>
        </mask>
        <linearGradient id="theBorder">
          <stop offset="0%" stop-color="#F79533">
            <animate attributeName="stop-color" values="#F79533; #F37055; #EF4E7B; #A166AB; #5073B8; #1098AD; #07B39B; #6DBA82; #F79533"
                     dur="4s" repeatCount="indefinite"></animate>
          </stop>
          <stop offset="100%" stop-color="#F79533">
            <animate attributeName="stop-color" values="#F37055; #EF4E7B; #A166AB; #5073B8; #1098AD; #07B39B; #6DBA82; #F79533; #F37055"
                     dur="4s" repeatCount="indefinite"></animate>
          </stop>
        </linearGradient>
      </defs>
      <template v-if="border">
        <circle :cx="circleX" :cy="circleY" :r="circleR" stroke-width="3" stroke="url(#theBorder)"></circle>
      </template>
      <image x="0" y="0" height="100%" width="100%" :href="imageSrc" :mask="'url(#'+maskId+')'" preserveAspectRatio="xMinYMin slice"/>
    </svg>
  </div>
</template>

<script>
    export default {
        props:{
            heigth: {
                type: Number,
                default: 100,
            },
            width: {
                type: Number,
                default: 124,
            },
            border: {
                type: Boolean,
                default: false,
            },
            image: {
                default: 'cat.jpg',
            }
        },
        computed:{
            circleX(){
                return this.width/2
            },
            circleY(){
                return this.heigth/2
            },
            circleR(){
                let r = this.height > this.width ? this.width/2 : this.heigth/2
                return this.border ? r-3 : r
            },

            viewBox(){
                return '0 0 ' + this.width + ' ' + this.heigth
            },
            imageSrc(){
              try{
                return this.image.indexOf('http') > -1 ? this.image : require('@/assets/images/' + this.image)
              }catch(e){
                console.log(e + ',获取远程图片失败')
                return require('@/assets/images/cat.jpg')
              }
            },
            maskId(){
                return "mask_" + (Date.now()).toString(16)
            }
        },
        data() {
            return {}
        },
    }
</script>

<!--<style lang="scss">-->
<!--  .card-image{-->
<!--    height: 100%;-->
<!--    width: 100%;-->
<!--  }-->
<!--</style>-->
