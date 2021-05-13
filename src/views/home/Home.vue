<template>
    <div class="home">
        <div class="top-area">
            <breadcrumb/>
        </div>
        <div class="body-area">
            <cardList :list="listData"/>
        </div>
        <div class="bottom-area">
            <pagination/>
        </div>
    </div>
</template>

<script>
    import cardList from './cardList.vue'
    import pagination from './pagination.vue'
    import breadcrumb from '@/components/breadcrumb.vue'

    const defaultConfig = {
        pageSize: 8,
        pageNumber: 1
    }

    export default {
        name: 'home',
        components: { breadcrumb, cardList, pagination },
        data(){
            return {
                listData: [],
            }
        },
        created(){
          this.findCardList()
        },
        methods: {
            findCardList(){
                this.$http.article.findList({ ...defaultConfig })
                    .then(res=>{
                        this.listData = res.data.dataList
                        //res.data.total
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            }
        }
    }
</script>
