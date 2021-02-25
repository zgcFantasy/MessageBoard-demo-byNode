<template>
    <div>
        <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="content">
        </el-input>
        <br><br>
        <el-button type="primary" @click="onSubmit">提交留言</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            content: ''
        }
    },
    methods: {
        onSubmit() {
            if (!this.content.trim()) {
                return
            }
            this.$emit('addComment', this.content)
            this.content = ''
        }
    }
}
</script>