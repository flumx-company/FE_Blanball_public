<template>
    <div class="notification-button" :class="[buttonType || 'flat', buttonColor || 'standard']" @click.stop="$emit('click-event')">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "NotificationButton",
        props: {
            buttonColor: {
                type: String,
                default: 'standard'
            },
            buttonType: {
                type: String,
                default: 'flat'
            }
        }
    }
</script>

<style scoped>
    .notification-button  {
        cursor: pointer;
        display: inline-block;
        padding: 2px 12px;
        border-radius: 6px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 24px;
        text-align: center;
        margin-right: 8px;
    }

    .flat {
        border: 1px solid;
    }

    .stroked {
        border: 1px solid;
    }

    .notification-button.flat {
        background: #575775;
        border-color: #575775;
        color: #FFFFFF;
    }
    .notification-button.stroked {
        background: #262541;
        border-color: #C5C5D3;
        color: #FFFFFF;
    }
    .notification-button.flat.success {
        background:#148581;
        border-color: #148581;
        color: #FFFFFF;
    }
    .notification-button.stroked.success {
        background: #148581;
        border-color: #C5C5D3;
        color: #FFFFFF;
    }
    .notification-button.flat.error {
        background:#A4284D;
        border-color: #A4284D;
        color: #FFFFFF;
    }
    .notification-button.stroked.error {
        background: #A4284D;
        border-color: #C5C5D3;
        color: #FFFFFF;
    }

</style>