<template>
    <div class="sider-wrapper">
        <div class="tabs-container">
            <a-tabs default-active-key="0" size="small">
                <a-tab-pane key="0" >
          <span slot="tab" title="最新文章">
            <a-icon class="tab-icon" type="clock-circle" theme="filled"/>
          </span>
                    <recent/>
                </a-tab-pane>
                <a-tab-pane key="1">
          <span slot="tab" title="收藏最多">
            <a-icon class="tab-icon" type="star" theme="filled"/>
          </span>
                    <popular/>
                </a-tab-pane>
                <a-tab-pane key="2">
          <span slot="tab" title="最新留言">
            <a-icon class="tab-icon" type="message" theme="filled"/>
          </span>
                    <comments/>
                </a-tab-pane>
                <a-tab-pane key="3">
          <span slot="tab" title="标签">
            <a-icon class="tab-icon" type="tags" theme="filled"/>
          </span>
                    <tags/>
                </a-tab-pane>
            </a-tabs>
        </div>
        <featured/>

        <a-affix :offset-top="104">
            <articleNav/>
        </a-affix>
    </div>
</template>

<script>
    import recent from '@/components/recent.vue'
    import popular from '@/components/popular.vue'
    import comments from '@/components/comments.vue'
    import tags from '@/components/tags.vue'
    import featured from '@/components/featured.vue'
    import articleNav from '@/components/articleNav.vue'

    export default {
        components: { recent,popular,comments,tags,featured, articleNav },
        data(){
            return {

            }
        }
    }
</script>

<style>
    .sider-wrapper{
    }

    .tabs-container{
        padding: 40px 40px 30px;
        border-bottom: solid 1px #e6e6e6;
    }

    .tab-icon {
        font-size: 18px;
    }

    .ant-tabs-nav .ant-tabs-tab{
        margin: 0;
    }

    .ant-tabs-nav .ant-tabs-tab .anticon{
        margin: 0 4px;
    }
</style>
