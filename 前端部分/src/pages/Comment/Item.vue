<template>
    <div>
        <el-divider></el-divider>
        <div class="userinfo">
            <el-avatar :size="30" :src="circleUrl"></el-avatar>
            <span class="username">{{data.username}}</span>
            <span class="time">{{createdAt}}</span>
        </div>
        <p>{{data.content}}</p>
        <div v-if="isMy">
            <el-button type="text" @click="showEditModal = true">编辑</el-button>
            <el-button type="text" style="color: red;" @click="del">删除</el-button>
        </div>

        <!-- 编辑留言 -->
        <el-dialog
            title="编辑留言"
            :visible.sync="showEditModal"
            width="50%">
            <el-input
                type="textarea"
                :rows="3"
                v-model="newContent">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showEditModal = false">取 消</el-button>
                <el-button type="primary" @click="update">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { delCommentService, updateCommentService } from '../../services/comment'
import { formatDt } from '../../utils/dt'
import event from '../../utils/event'

export default {
    props: ['data'],
    data() {
        return {
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            showEditModal: false,
            newContent: ''
        }
    },
    computed: {
        _id() {
            return this.data._id
        },
        createdAt() {
            return formatDt(this.data.createdAt)
        },
        isMy() {
            // 这条留言，是不是我自己发的？
            const curData = this.data
            if (!curData) {
                return false
            }
            return curData.username === window.userInfo.username
        }
    },
    methods: {
        async update() {
            // 关闭弹框
            this.showEditModal = false

            // 更新数据
            const newData = await updateCommentService(this._id, this.newContent)
            event.$emit('onCommentUpdate', newData)

            this.$message.info('修改成功')
        },
        async del() {
            if (window.confirm('确定删除？')) {
                await delCommentService(this._id)
                location.reload()
            }
        }
    },
    mounted() {
        this.newContent = this.data.content
    }
}
</script>

<style lang="css" scoped>
.userinfo {
    position: relative;
}
.username {
    position: absolute;
    margin-left: 5px;
    margin-top: 7px;
}
.time {
    font-size: 12px;
    color: #666;
    position: absolute;
    right: 0;
}
</style>