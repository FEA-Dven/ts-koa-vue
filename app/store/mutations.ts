import { State } from './state';

export default {
    changeNickName(state: State, nickName: string) {
        state.nickName = nickName;
    },
};
