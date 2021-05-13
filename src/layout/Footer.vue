<template>
    <div class="footer_wrapper">
        <div class="footer_content">
            <div class="footer_toolbar"></div>
            <div class="footer_bottom">
                <div class="footer_bottom_group">
                    <div class="footer_scroll_button" @click="scrollTop">
                        <a-icon class="footer_scroll_button--upicon" type="caret-up"/>
                        <div class="footer_scroll_button--left-tri"></div>
                        <div class="footer_scroll_button--right-tri"></div>
                    </div>
                    <div class="footer_copyright">
                        Copyright @ 2020.
                        Design by Kyuara
                    </div>
                    <div class="footer_iconBar">
                        <div class="footer_icon">
                            <a-icon type="qq" />
                        </div>
                        <div class="footer_icon">
                            <a-icon type="wechat" />
                        </div>
                        <div class="footer_icon">
                            <a-icon type="weibo" />
                        </div>
                        <div class="footer_icon">
                            <a-icon type="twitter" />
                        </div>
                        <div class="footer_icon">
                            <a-icon type="github" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {

            }
        },
        methods:{
            scrollTop() {
                let top = document.documentElement.scrollTop || document.body.scrollTop
                const interval = setInterval(()=>{
                    document.body.scrollTop = document.documentElement.scrollTop = top -= 40
                    if(top <= 0){
                        clearInterval(interval)
                    }
                }, 10)
            }
        }
    }
</script>
