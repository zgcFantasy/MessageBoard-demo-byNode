<template>
    <router-view/>
</template>

<script>
import { getUserInfoService } from './services/user'

export default {
    methods: {
        async getUserInfo() {
            // 获取用户信息
            try {
                const userInfo = await getUserInfoService()
                // 成功获取用户信息
                window.userInfo = userInfo
                this.$router.push('/').catch(err => {err})
            } catch (ex) {
                // 获取失败，去登录
                if (location.hash === '#/') {
                    this.$router.push('/login').catch(err => {err})
                }
            }
        }
    },
    async created() {
        await this.getUserInfo()
    },
    updated() {
        this.getUserInfo()
    }
}
</script>