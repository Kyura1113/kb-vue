<template>
    <div class="app-layout">
        <div class="app-background">
            <app-background/>
        </div>
        <div class="app-content">
            <app-layout>
                <template #head>
                    <app-header/>
                </template>
                <template #content>
                    <router-view/>
                </template>
                <template #sider>
                    <app-sider/>
                </template>
                <template #foot>
                    <app-footer/>
                </template>
            </app-layout>
        </div>
    </div>

</template>

<script>
    import AppBackground from './Background.vue'
    import AppLayout from './AppLayout.vue'
    import AppHeader from './Header.vue'
    import AppSider from './Sider.vue'
    import AppFooter from './Footer.vue'

    export default {
        name: 'Layout',
        components: {
            AppBackground,
            AppLayout,
            AppHeader,
            AppSider,
            AppFooter
        },
        data() {
            return {}
        },
        created() {
            //console.log(sessionStorage.getItem('store'))
            // if(sessionStorage.getItem('store')){
            //   this.$store.replaceState(
            //     Object.assign(this.$store.state, JSON.parse(sessionStorage.getItem('store')))
            //   );
            //   sessionStorage.removeItem('store')
            // }
            //console.log(this.$store.state)
        },
        mounted() {
            // window.addEventListener('beforeunload', ()=>{
            //   sessionStorage.setItem('store', JSON.stringify(this.$store.state))
            // })
        }
    }
</script>
