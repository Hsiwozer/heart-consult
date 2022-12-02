export default {
  namespaced: true,

  state: () => ({
    syndromes: []
  }),

  mutations: {
    updateSyndromes(state, syndromes) {
      state.syndromes = syndromes
    }
  },
  
  getters: {
    showMainSyndrome: state => {
      return [...new Set(state.syndromes.map(item => {return item.main_syndrome}))]
    },
    showSubSyndrome: state => {
      return [...new Set(state.syndromes.map(item => {return item.sub_syndrome}))]
    },
  }
}