<template>
    <div class="pagination_wrapper">
        <div class="pagination_container">
            <div class="pagination_pageInfo">
                <div class="pagination_infoBar">
                    <a-icon type="file-text" theme="filled" style="padding-right: 8px"/>
                    <span>{{ infoText }}</span>
                </div>
            </div>
            <div class="pagination_pageNav">
                <div class="pagination_page_previous" v-if="showPre"
                     @click="previous">
                    <span class="pagination_text" title="上一页">◀</span>
                </div>
                <div class="pagination_pager" v-for="(val, index) in paginationList"
                     :key="'pageNum_' + index" :title=" '第' + val + '页' "
                     :class="{ 'pagination_page--active': currentPage === val }"
                     @click="currentPage = val">
                    <span class="pagination_text">{{ val }}</span>
                </div>
                <div class="pagination_page_next" v-if="showNext"
                     @click="next">
                    <span class="pagination_text" title="下一页">▶</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            total: {
                default: 8,
                type: Number
            }
        },
        data(){
            return {
                currentPage: 1,

                pageSize: 8,
                paginationSize: 6,

                startIndex: 1,
                endIndex: 5,

                showNext: true,
                showPre: false,
            }
        },
        computed:{
            paginationTotal: function(){
                return parseInt(this.total / this.pageSize) + 1
            },
            infoText: function() {
                return this.currentPage + ' / ' + this.paginationTotal + ' 页'
            },
            paginationList: function(){
                let list = []
                for(let i = this.startIndex; i <= this.endIndex ; i++){
                    list.push(i)
                }
                return list
            }
        },
        created(){

        },
        methods:{
            next(){
                //let a = this.startIndex
                let b = this.endIndex
                this.startIndex = b + 1
                this.currentPage = b + 1
                this.showPre = true
                if(b + this.paginationSize - 1 >= this.paginationTotal){
                    this.endIndex = this.paginationTotal
                    this.showNext = false
                }else{
                    this.endIndex = b + this.paginationSize - 2
                    this.showNext = true
                }
            },
            previous(){
                let a = this.startIndex
                //let b = this.endIndex
                this.endIndex = a - 1
                this.currentPage = a - 1
                this.showNext = true
                if(a - this.paginationSize + 1 <= 1){
                    this.startIndex = 1
                    this.showPre = false
                }else{
                    this.startIndex = a - this.paginationSize + 2
                    this.showPre = true
                }
            }
        }
    }
</script>
