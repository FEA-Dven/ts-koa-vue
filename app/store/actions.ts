import { ActionTree } from 'vuex';

const actions: ActionTree<any, any> = {
    changeNickName({ state, commit }, nickName) {
        commit('changeNickName', nickName);
    },
};

export default actions;
