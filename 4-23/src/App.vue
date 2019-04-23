<template>
    <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>
<script>

export default {
    name: 'app',
    provide () {
        return {
            reload: this.reload
        }
    },
    data () {
        return {
            isRouterAlive: true
        }
    },
    methods: {
        reload () {
            this.isRouterAlive = false;
            this.$nextTick(function(){
                this.isRouterAlive = true
            })
        }
    }
};
</script>

<style scoped>
html,
body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
}
body {
    background-color: #fbf9fe;
}
#app {
    height: 100%;
}
</style>