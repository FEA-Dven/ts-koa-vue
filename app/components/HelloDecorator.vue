<!-- src/components/HelloDecorator.vue -->
<!-- This is an alternative way to define the Hello component using decorators -->
<template>
    <div>
        <div class="greeting">Hello {{name}}{{exclamationMarks}}</div>
        <Button size='small' @click="decrement">-</Button>
        <Button size='small' @click="increment">+</Button>
    </div>
</template>

<script lang="ts">
import { Button } from 'iview';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class HelloDecorator extends Vue {
    @Prop() private name!: string;
    @Prop() private initialEnthusiasm!: number;

    private enthusiasm = this.initialEnthusiasm;

    private increment() {
        this.enthusiasm++;
    }
    private decrement() {
        if (this.enthusiasm > 1) {
            this.enthusiasm--;
        }
    }

    get exclamationMarks(): string {
        return Array(this.enthusiasm + 1).join('!');
    }
}
</script>
