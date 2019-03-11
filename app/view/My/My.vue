<template>
    <div>
        <div>认真玩玩{{projectName}}</div>
        <div> my name is {{nickName}}</div>
        <button @click='testRequest'>测试请求</button>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Mutation, State, Action } from 'vuex-class';
import * as API from '@api/api';
@Component()
export default class My extends Vue {
    @State private nickName: string;
    private nametwo!: string;
    private data() {
        return {
            projectName: 'ts vue',
        };
    }
    private async testRequest() {
        let res = await API.getMenuList({
            fid: 1
        });
        console.log(res);
    }
}
</script>


