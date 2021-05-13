<template>
    <div class="background">
        <canvas id="particles-line" :style="{backgroundImage: 'url('+imgSrc+')', height:'100%', width: '100%'}"></canvas>
    </div>
</template>

<script>
    import particle from '@/components/particlesLine.js'

    export default {
        data(){
            return {
                imgSrc: null
            }
        },
        mounted(){
            this.loadBackgroundImg()
            this.initAnimation()
        },
        methods: {
            initAnimation(){
                particle.initAnimation()
                particle.auto()
            },
            loadBackgroundImg(){
                this.imgSrc = require('@/assets/images/sola.jpg')
            }
        }
    }
</script>
<style>
    .background{
        height: 100%;
        width: 100%;
    }
</style>