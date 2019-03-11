<template>
    <div>
        <h1>测试组件</h1>
        <hello-decorator-component :name="name" :initialEnthusiasm="5" />
        Name: <input v-model="name" type="text">
        <Button @click='changeMyNickName'>更改vuex名字</Button>
        <Button class='jump-btn' @click='testJump'>路由跳转测试vuex</Button>
        <Button type='primary' @click='showMessage'>测试iview事件</Button>
        <Icon type="ios-checkmark" />
    </div>
</template>

<script lang='ts'>
import { Button, Message, Icon } from 'iview';
import { Vue, Component } from 'vue-property-decorator';
import { Mutation, State, Action } from 'vuex-class';
import HelloDecoratorComponent from '@components/HelloDecorator.vue';
@Component({
    components: {
        HelloDecoratorComponent,
    },
})
export default class Home extends Vue {
    @Action public changeNickName!: (nickName: string ) => void;
    private name!: number;
    private data() {
        return {
            name: 'hello'
        };
    }
    private testJump() {
        this.$router.push('/my');
    }
    private changeMyNickName() {
        this.changeNickName(this.name);
    }
    private showMessage() {
        this.$Message.error({ content: '成功调用', duration: 20 });
    }
}
</script>

<style >

</style>

