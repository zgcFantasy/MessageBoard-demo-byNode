<template>
    <div class="container">
        <Input @addComment="addComment"/>
        <div style="margin-top: 20px;">
            <el-radio v-model="filterType" :label="1">看全部</el-radio>
            <el-radio v-model="filterType" :label="2">只看自己</el-radio>
        </div>
        <List :list="list"/>
    </div>
</template>

<script>
import { createCommentService, getCommentListService } from '../../services/comment'
import Input from './Input'
import List from './List'
import event from '../../utils/event'

export default {
    components: {
        Input,
        List
    },
    data() {
        return {
            filterType: 1, // 1 - 看全部；2 - 只看自己
            list: [
                // // 模拟数据
                // {
                //     _id: 1,
                //     username: 'zhangsan',
                //     content: '留言内容A 留言内容A 留言内容A 留言内容A 留言内容A ',
                //     createdAt: Date.now()
                // },
                // {
                //     _id: 2,
                //     username: 'lisi',
                //     content: '留言内容B 留言内容B 留言内容B 留言内容B 留言内容B ',
                //     createdAt: Date.now() - 5 * 60 * 1000 // 5 分钟以前
                // },
                // {
                //     _id: 3,
                //     username: 'wangwu',
                //     content: '留言内容C 留言内容C 留言内容C 留言内容C 留言内容C ',
                //     createdAt: Date.now() - 10 * 60 * 1000 // 10 分钟以前
                // },
            ]
        }
    },
    watch: {
        filterType() {
            this.getCommentList()
        }
    },
    methods: {
        async getCommentList() {
            // 获取列表
            const commentList = await getCommentListService(this.filterType)
            this.list = commentList
        },
        async addComment(content) {
            // const data = {
            //     id: this.list.length + 1,
            //     username: 'zhangsan',
            //     content,
            //     createdAt: Date.now()
            // }

            const data = await createCommentService(content)

            this.list.unshift(data)
        },
        updateHandler(newComment) {
            this.list = this.list.map(item => {
                console.log(item._id, newComment._id)
                if (item._id === newComment._id) {
                    console.log('newComment', newComment)
                    return newComment
                }
                return item
            })
        },
    },
    async mounted() {
        this.getCommentList()

        // 更新数据时，监听
        event.$on('onCommentUpdate', this.updateHandler)
    },
    beforeDestroy() {
        event.$off('onCommentUpdate', this.updateHandler)
    }
}
</script>

<style>
.container {
    margin: 20px 50px 0;
}
</style>