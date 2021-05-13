<template>
    <div class="breadcrumb">
        <div class="breadcrumb_wrapper">
            <a-breadcrumb class="breadcrumb_container">
                <a-breadcrumb-item>首页</a-breadcrumb-item>
            </a-breadcrumb>
        </div>
    </div>
</template>

<script>
    export default{
        data() {
            return {

            }
        }
    }
</script>

<style>
    .breadcrumb{
        height: 100%;
        width: 100%;
        position: relative;
        padding-left: 139px;
    }

    .breadcrumb_wrapper{
        height: 100%;
        border-bottom: solid 1px #e5e5e5;
        font-weight: bold;
    }

    .breadcrumb_container{
        position: absolute;
        top:50%;
        left: 180px;
        transform: translate(0, -50%);
        color: #aaaaaa;
    }
</style>
