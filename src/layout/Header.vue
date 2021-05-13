<template>
    <div class="header flex-center">
        <div class="header-upper">
            <div class="header-container__left">
                <div class="lt-tri-bg"></div>
                <div class="switch pos-abs-center">
                    <a-switch size="small"/>
                </div>
            </div>
            <div class="header-container__mid flex-center pos-rel">
                <div class="header-logo-bg pos-abs"></div>
                <div class="header-logo">
                    <h2>{{ info.auth }}</h2>
                    <span>Private Blogging</span>
                </div>
            </div>
            <div class="header-container__right">
                <a-button shape="circle" :icon="!isFold ? dropMenu.icon: dropMenu.foldIcon" @click="handleShow" />
            </div>
        </div>

        <transition name='expand'>
            <div class="header-lower" v-show="isFold">
                <div class="header-menu-icon pos-rel">
                    <a-icon type="book" theme="outlined" />
                    <div class="header-menu-icon-tri pos-abs-center"></div>
                </div>
                <a-affix class="header-menu" :offset-top="0">
                    <div class="header-menu-container">
                        <downMenu/>
                    </div>
                    <div class="header-menu-tri"></div>
                </a-affix>
            </div>
        </transition>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import downMenu from '@/components/downMenu.vue'

    export default {
        components: { downMenu },
        data() {
            return {
                info: {
                    auth: 'Kyuara'
                },
                dropMenu: {
                    icon: 'unordered-list',
                    foldIcon: 'arrow-down',
                }
            }
        },
        computed: {
            ...mapState({ isFold: 'dm_show' }),
        },
        methods: {
            ...mapActions(['handleDropMenu']),
            handleShow(){
                let val = !this.isFold
                this.handleDropMenu(val)
            }
        }
    }
</script>
