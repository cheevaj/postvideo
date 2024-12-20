<template>
    <Collapse v-model="dataItem">
        <Panel name="1">
            史蒂夫·乔布斯
            <template #content>史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</template>
        </Panel>
    </Collapse>
</template>
<script>
    export default {
        data () {
            return {
                dataItem: '1'
            }
        }
    }
</script>
