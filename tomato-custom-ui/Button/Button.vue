<template>
    <button>{{ text }}</button>
</template>

<script type="text/javascript">
export default {
    name: "CustomButton",
    props: {
        text: {
            type: String,
            default: ""
        }
    },
}
</script>