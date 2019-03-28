<template>
    <ul class="conversation-list">
        <ContactsMember v-for="item in $store.state.friends" :user="item"/>
    </ul>
</template>

<script>
    import ContactsMember from "./Contacts-Member";

    export default {
        name: "contacts",
        components: {
            ContactsMember
        }
    }
</script>

<style lang="less">
    @import "../assets/css/contacts";
</style>