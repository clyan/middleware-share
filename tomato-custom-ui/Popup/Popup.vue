<template>
    <div>我是一个popup, {{ text }}</div>
</template>

<script type="text/javascript">
export default {
    name: "CustomPopup",
    props: {
        text: {
            type: String,
            default: ""
        }
    },
}
</script>