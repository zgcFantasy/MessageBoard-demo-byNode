<template>
    <div>
        <Item
            v-for="itemData in list"
            :key="itemData._id"
            :data="itemData"
        />
    </div>
</template>

<script>
import Item from './Item'

export default {
    components: { Item },
    props: ['list']
}
</script>