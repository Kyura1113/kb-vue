<template>
    <div class="cardlist-wrapper">
        <div class="card" v-for="item in list" :key="item.id" @click="goArticle(item.id)">
            <div class="card-left">
                <div class="card-image-container">
                    <cardImage :heigth="100" :width="124" border :image="item.cover === null ? 'cat.jpg' : item.cover"/>
                </div>
                <div class="card-date">
                    <h2>{{ new Date(item.time).getDay() }}</h2>
                    <h3>{{ new Date(item.time).getMonth() + 1 + '月' }}</h3>
                    <div class="card-date-year">
                        <span>{{ new Date(item.time).getFullYear() }}</span>
                    </div>
                </div>
            </div>
            <div class="card-main">
                <div class="card-tri"></div>
                <div class="card-content">
                    <div class="card-title">
                        <h1>{{ item.title }}</h1>
                    </div>
                    <div class="card-narrate">
                        {{ item.description }}
                    </div>
                    <div class="card-relate">
                        <div class="card-type">
                            <a-icon type="tag" theme="filled" style="padding-right: 4px"/>
                            <span>{{ item.tags_name }}</span>
                        </div>
                        <div class="card-msgs">
                            <msg-icon style="padding-right: 4px"/>
                            <span>{{ item.clicks }}</span>
                        </div>
                    </div>
                </div>
                <div class="card-corner">
                    <share-icon class="share-icon" title="分享"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import cardImage from '@/components/circleImage.vue'

    const msgSvg = {
        template: `
            <svg width="1em" height="1em" viewBox="0 0 580 400">
                <path stroke="#bbbbbb"
                      d="m289.99996,1.00005c-159.61121,0 -288.99993,89.09839 -288.99993,
                      199.00338c0,37.55772 15.29645,72.64385 41.61739,102.60348l-41.61739,
                      83.77056l115.86772,-27.31382c48.28342,24.9635 108.10705,39.93633 173.13221,
                      39.93633c159.61137,0 289.00001,-89.09848 289.00001,-198.99657c0,
                      -109.90497 -129.38862,-199.00338 -289.00001,-199.00338l0,0.00002z" stroke-width="1.5" fill="#bbbbbb"/>
           </svg>
        `
    }

    const shareSvg = {
        template: `
            <svg id="share" width="1em" height="1em" viewBox="0 0 90 90">
              <path id="svg_1" d="m45,80.5c-19.575,0 -35.5,-15.925 -35.5,-35.5s15.925,-35.5 35.5,-35.5s35.5,15.925 35.5,35.5s-15.925,35.5 -35.5,35.5zm0,-60c-13.509,0 -24.5,10.991 -24.5,24.5s10.991,24.5 24.5,24.5s24.5,-10.991 24.5,-24.5s-10.991,-24.5 -24.5,-24.5z" fill="#bbbbbb"/>
              <path id="svg_2" d="m45,10c19.299,0 35,15.701 35,35s-15.701,35 -35,35s-35,-15.701 -35,-35s15.701,-35 35,-35m0,60c13.785,0 25,-11.215 25,-25s-11.215,-25 -25,-25s-25,11.215 -25,25s11.215,25 25,25m0,-61c-19.882,0 -36,16.118 -36,36s16.118,36 36,36s36,-16.118 36,-36s-16.118,-36 -36,-36l0,0zm0,60c-13.255,0 -24,-10.745 -24,-24c0,-13.255 10.745,-24 24,-24s24,10.745 24,24c0,13.255 -10.745,24 -24,24l0,0z" fill="#bbbbbb"/>
              <g id="circle1">
                <path stroke="#e5e5e5" id="svg_9" d="m45,26.5c-6.341,0 -11.5,-5.159 -11.5,-11.5s5.159,-11.5 11.5,-11.5s11.5,5.159 11.5,11.5s-5.159,11.5 -11.5,11.5z" fill="#bbbbbb"/>
                <path stroke="#e5e5e5" id="svg_10" d="m45,4c6.065,0 11,4.935 11,11s-4.935,11 -11,11s-11,-4.935 -11,-11s4.935,-11 11,-11m0,-1c-6.627,0 -12,5.373 -12,12s5.373,12 12,12s12,-5.373 12,-12s-5.373,-12 -12,-12l0,0z" fill="#bbbbbb"/>
              </g>
              <g id="circle2">
                <path stroke="#e5e5e5" id="svg_11" d="m72.346152,70.84615c-6.341,0 -11.5,-5.159 -11.5,-11.5s5.159,-11.5 11.5,-11.5s11.5,5.159 11.5,11.5s-5.159,11.5 -11.5,11.5z" fill="#bbbbbb"/>
                <path stroke="#e5e5e5" id="svg_12" d="m72.346152,48.34615c6.065,0 11,4.935 11,11s-4.935,11 -11,11s-11,-4.935 -11,-11s4.935,-11 11,-11m0,-1c-6.627,0 -12,5.373 -12,12s5.373,12 12,12s12,-5.373 12,-12s-5.373,-12 -12,-12l0,0z" fill="#bbbbbb"/>
              </g>
              <g id="circle3">
                <path stroke="#e5e5e5" id="svg_14" d="m18,70.653845c-6.341,0 -11.5,-5.159 -11.5,-11.5s5.159,-11.5 11.5,-11.5s11.5,5.159 11.5,11.5s-5.159,11.5 -11.5,11.5z" fill="#bbbbbb"/>
                <path stroke="#e5e5e5" id="svg_15" d="m18,48.153845c6.065,0 11,4.935 11,11s-4.935,11 -11,11s-11,-4.935 -11,-11s4.935,-11 11,-11m0,-1c-6.627,0 -12,5.373 -12,12s5.373,12 12,12s12,-5.373 12,-12s-5.373,-12 -12,-12l0,0z" fill="#bbbbbb"/>
              </g>
            </svg>
        `
    }

    const msgIcon = {
        template: `<a-icon :component="msgSvg" />`,
        data() {
            return {
                msgSvg
            }
        }
    }

    const shareIcon = {
        template: `<a-icon :component="shareSvg" />`,
        data(){
            return {
                shareSvg
            }
        }
    }

    export default {
        props:{
            list: {
                default: () => [],
                type: Array
            }
        },
        components: {
            msgIcon,
            shareIcon,
            cardImage,
        },
        data() {
            return {

            }
        },
        created() {
            this.$nextTick(() => {
                let elms = document.getElementsByClassName('card-title')
                for (let i = 0; i < elms.length; i++) {
                    let elm = elms[i]
                    if (elm.offsetHeight / 42 > 1) {
                        document.getElementsByClassName('card-narrate')[i].style.webkitLineClamp = 3
                        document.getElementsByClassName('card-narrate')[i].style.lineHeight = (171 - 42 * 2 - 15) / 3 + 'px'
                        console.log(document.getElementsByClassName('card-narrate')[i])
                    }
                }
            })
        },
        methods:{
            goArticle(id){
                this.$router.push({ name: 'article', query:{ id: id }})
            }
        }
    }
</script>
