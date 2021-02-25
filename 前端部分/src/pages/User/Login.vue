<template>
    <div>
        <el-page-header @back="goBack" content="登录"></el-page-header>
        <el-divider></el-divider>

        <el-row>
            <el-col :span="12" :offset="6">
                <el-form ref="form" :model="userInfo" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="userInfo.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="userInfo.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">登录</el-button>
                        <br>
                        <router-link to="/register">注册新用户</router-link>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { loginService } from '../../services/user'

export default {
    data() {
        return {
            userInfo: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        goBack() {
            this.$router.push('/').catch(err => {err})
        },
        async onSubmit() {
            const { username, password } = this.userInfo
            await loginService(username, password)
            this.goBack()
        }
    }
}
</script>