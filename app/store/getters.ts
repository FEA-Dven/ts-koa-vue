import { GetterTree } from 'vuex';

const getters: GetterTree<any, any> = {
    getStateData(state) {
        const { nickName } = state;
        return {
            nickName,
        };
    },
};

export default getters;
