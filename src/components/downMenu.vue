<template>
    <div class="down-menu pos-rel">
        <div class="down-menu-container">
            <a-menu v-model="selectMenu" mode="horizontal" id="menu">
                <a-menu-item key="home">
                    <a-icon type="home" />首页
                </a-menu-item>
                <a-sub-menu key="categories">
          <span slot="title" class="submenu-title-wrapper">
            <a-icon type="container" />分类
          </span>
                    <a-menu-item class="sub_item" key="test1">
                        测试菜单1
                    </a-menu-item>
                    <a-menu-item class="sub_item" key="test2">
                        测试菜单2
                    </a-menu-item>
                </a-sub-menu>

                <a-menu-item key="aboutme">
                    <a-icon type="user" />关于我
                </a-menu-item>
                <a-menu-item key="contact">
                    <a-icon type="contacts" />联系
                </a-menu-item>
            </a-menu>
        </div>
        <div class="down-menu-search-container">
            <transition name='fold'>
                <div class="search-bar" v-show="isShow">
                    <a-input-search placeholder="请输出查找内容" class="search-input" />
                </div>
            </transition>
            <div class="search-btn">
                <a-icon :type="!isShow ? iconTypes[0] : iconTypes[1]" class="search-icon" @click="handleShow" />
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        data() {
            return {
                iconTypes: ['search', 'close'],
                selectMenu: ['home'],
                foldStatus: 1
            }
        },
        computed:{
            ...mapState({ isShow: 'sb_show'})
        },
        methods: {
            ...mapActions(['handleSearchBar']),
            handleShow(){
                let val = !this.isShow
                this.handleSearchBar(val)
            }
        }
    }
</script>
<!--<style>-->
<!--    .sub_item{-->
<!--        line-height: 50px !important;-->
<!--        height: 50px !important;-->
<!--        margin: 0 !important;-->
<!--        width: 100%;-->
<!--        padding: 0 16px !important;-->
<!--        border-bottom: solid 1px #EEEEEE;-->
<!--        text-align: left;-->
<!--        vertical-align: middle;-->
<!--    }-->
<!--</style>-->
