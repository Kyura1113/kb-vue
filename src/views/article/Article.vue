<template>
    <div class="article">
<!--        <div class="top-area">-->
<!--            <breadcrumb/>-->
<!--        </div>-->
        <div class="body-area">
            <div class="body-area__left">
                <div class="avatar">
                    <div class="avatar-container">
                        <cardImage :heigth="100" :width="124" border :image="'el_cat.png'" />
                    </div>
                    <div class="avatar-date">
                        <h2>{{ formatTime.d }}</h2>
                        <h3>{{ formatTime.m }}</h3>
                        <div class="avatar-date-year">
                            <span>{{ formatTime.y }}</span>
                        </div>
                    </div>
                    <div class="avatar-tri"></div>
                </div>
            </div>
            <div class="body-area__right">
                <div class="article_title">
                    <h2>{{ title }}</h2>
                </div>
                <div class="article_info">
                    <a-icon type="user" />
                    <span>user</span>
                    <a-icon type="folder" />
                    <span>a</span>
                    <span>a</span>
                </div>
                <div class="article_cover">
                    <img :src="cover"/>
                </div>
                <div id="content" class="article_content md-content" v-html="content"></div>
            </div>
        </div>
        <div class="bottom-area">

        </div>
    </div>
</template>

<script>
    import cardImage from '@/components/circleImage.vue'
    //import breadcrumb from '@/components/breadcrumb.vue'
    import marked from 'marked';
    import Vue from "vue";

    let renderer = new marked.Renderer()
    marked.setOptions({
        renderer: renderer,
        highlight: function(code) {
            return require('highlight.js').highlightAuto(code).value;
        },
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
    });

    export default {
        name: 'article_index',
        components: {
            cardImage,
            //breadcrumb
        },
        data() {
            return {
                id: '',
                toc: [],
                index: 0,
                title: '',
                createTime: '',
                content: ''
            }
        },
        computed: {
            formatTime(){
                if (this.createTime !== ''){
                    let time = new Date(this.createTime)
                    return {
                        d: time.getDay(),
                        m: time.getMonth() + 1 + '月',
                        y: time.getFullYear()
                    }
                }else{
                    return {}
                }
            }
        },
        mounted() {
            this.id = this.$route.query.id
            this.loadArticlePage()
        },
        beforeDestroyed(){
            this.cancelToc()
        },
        methods: {
            async loadArticlePage(){
                //const load =
                await this.getArticle()
                this.loadAnchor()
            },

            getArticle(){
                const _this = this

                const add = (text, level) => {
                    let anchor = `toc${level}${++this.index}`
                    _this.toc.push({ anchor: anchor, level: level, text: text })
                    return anchor
                }

                return new Promise((resolve, reject)=>{
                    _this.$http.article.findDetail({ id: this.id }).then(res=>{
                        const data = res.data.data
                        const content = data.content
                        _this.title = data.title
                        _this.cover = data.cover
                        _this.createTime = data.time
                        renderer.heading = function(text, level) {
                            if(level > 1 && level < 4){
                                let anchor = add(text, level)
                                return `<a id=${anchor} class="anchor"></a><h${level}>${text}</h${level}>\n`
                            }else{
                                return `<h${level}>${text}</h${level}>\n`
                            }
                        }
                        _this.content = marked(content)
                        resolve()
                    }).catch((err)=>{
                        console.log(err)
                        reject(err)
                    })
                })
             },

            loadAnchor(){
                let result = ''
                const addChild = (anchor, text) => { result += `<a-anchor-link href="${'#'+anchor}" title="${text}" />\n` }
                this.toc.forEach(item => { addChild(item.anchor, item.text) })
                this.createToc(result)
            },

            createToc(htmlStr){
                const navComponent = Vue.extend({
                    template:
                        `<a-anchor>`+
                            htmlStr +
                        `</a-anchor>`
                    ,
                    data() {
                        return {}
                    },
                    methods:{
                        // scrollTo(e){
                        //     document.querySelector(e.target.id).scrollIntoView(true)
                        // }
                    }
                })

                let component = new navComponent().$mount()
                let dom = document.querySelector("#article_toc")
                while(dom.hasChildNodes()){
                    dom.removeChild(dom.firstChild)
                }
                dom.appendChild(component.$el)
            },

            cancelToc(){
                let dom = document.querySelector("#article_toc")
                while(dom.hasChildNodes()){
                    dom.removeChild(dom.firstChild)
                }
            }


        }
    }
</script>
