<template>
    <kw-tabs class="zy-home-tabs" bg-color="light" color="#999" active-color="green" font-size="12" icon-size="20" fixed>
        <kw-tab class="zy-home-tab" title="聊天" icon="user"></kw-tab>
        <kw-tab class="zy-home-tab" title="通讯录" icon="user"></kw-tab>
        <kw-tab class="zy-home-tab" title="发现" icon="user"></kw-tab>
        <kw-tab class="zy-home-tab" title="我" icon="user">
            <contact-list></contact-list>
        </kw-tab>
    </kw-tabs>
</template>
<script>
    import contactList from '../contact/contact-list.vue'
    export default {
        components: {contactList},
        name: ''
    }
</script>
<style lang="scss">
    .zy-home-tabs {
        .zy-home-tab {
            background: #efefef;
        }
    }
</style>
