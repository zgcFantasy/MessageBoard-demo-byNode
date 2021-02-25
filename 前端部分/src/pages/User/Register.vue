<template>
    <div>
        <el-page-header @back="goBack" content="注册"></el-page-header>
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
                    <el-form-item label="确认密码">
                        <el-input v-model="userInfo.conformPassword" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input-number v-model="userInfo.age" :min="10" :max="100"></el-input-number>
                    </el-form-item>
                    <el-form-item label="城市">
                        <el-input v-model="userInfo.city"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio v-model="userInfo.gender" :label="0">保密</el-radio>
                        <el-radio v-model="userInfo.gender" :label="1">男</el-radio>
                        <el-radio v-model="userInfo.gender" :label="2">女</el-radio>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">注册</el-button>
                        <br>
                        <router-link to="/login">登录</router-link>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { registerService } from '../../services/user'

export default {
    data() {
        return {
            userInfo: {
                username: '',
                password: '',
                conformPassword: '',
                age: 20,
                city: '北京',
                gender: 0
            }
        }
    },
    methods: {
        goBack() {
            this.$router.push('/').catch(err => {err})
        },
        async onSubmit() {
            // 校验信息
            const { username, password, conformPassword } = this.userInfo
            if (!username || !password) {
                this.$message.error('请输入用户名和密码')
                return
            }
            if (password !== conformPassword) {
                this.$message.error('两次密码不一致')
                return
            }
            delete this.userInfo.conformPassword

            // 注册新用户
            await registerService(this.userInfo)
            this.goBack()
        }
    }
}
</script>