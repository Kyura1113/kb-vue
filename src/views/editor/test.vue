<template>
    <div>
        <button @click="test">test</button>
    </div>
</template>
<script>
    export default {
        data(){
            return {

            }
        },
        mounted(){
          this.test()
        },
        methods: {
            test(){
                this.$axios.post('http://localhost:3000/article/find-by-page', { pageNumber: 1, pageSize: 10 }).then(res=>{
                    const dataList = res.data.dataList
                    const data = dataList[0]
                    const atc_blob = data['article_context']
                    console.log(atc_blob)
                    let reader = new FileReader()
                    reader.onload = function(){
                        let content = reader
                        console.log(content)
                    }
                    reader.readAsText(atc_blob)
                }).catch(e=>{
                    console.log(e)
                })
            }
        }
    }
</script>