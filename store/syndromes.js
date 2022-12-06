export default {
  namespaced: true,

  state: () => ({
    syndromes: [],
    main_syndromes: []
  }),

  mutations: {
    updateSyndromes(state, syndromes) {
      state.syndromes = syndromes
      state.main_syndromes = [...new Set(syndromes.map(item => {return item.main_syndrome}))]
    }
  },
  actions: {
    async getSyndromes({commit}) {
      const { data: res } = await uni.$http.get('/api/syndrome/get')
      if(res.status !== 0) {
        return uni.showToast({
          title: '数据请求失败！',
          duration: 1500,
          icon: 'none'
        })
      }
      commit('updateSyndromes', res.data)
    },
  },
  
  getters: {
    showMainSyndrome: state => {
      return [...new Set(state.syndromes.map(item => {return item.main_syndrome}))]
    },
    showSubSyndrome: state => {
      return [...new Set(state.syndromes.map(item => {return item.sub_syndrome}))]
    },
    showSyndromeInLogic: state => {
      let res = [];
      for(let i = 1; i <= state.main_syndromes.length; i++) {
        const obj = new Object();
        obj.id = i;
        obj.mainSyn = state.main_syndromes[i - 1];
        obj.elements = [...new Set(state.syndromes.map(item => {return (state.main_syndromes[i - 1] === item.main_syndrome ? item.element : '')}))];
        res.push(obj)
      }
      return res;
    },
    showSyndrome: state => {
      return state.syndromes
    }
  }
}