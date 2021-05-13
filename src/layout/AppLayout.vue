<template>
    <div class="layout">
        <a-layout id="main_layout">
            <a-layout-header>
                <div class="layout-header">
                    <slot name="head"></slot>
                </div>
            </a-layout-header>
            <a-layout class="layout-content">
                <a-layout-content>
                    <div class="content-bg_left pos-abs"></div>
                    <slot name="content"></slot>
                </a-layout-content>
                <a-layout-sider>
                    <slot name="sider"></slot>
                </a-layout-sider>
            </a-layout>
            <a-layout-footer class="layout-footer">
                <div class="footer-bg_left pos-abs"></div>
                <slot name="foot"></slot>
            </a-layout-footer>
        </a-layout>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                collapsed: false
            }
        }
    }

</script>
