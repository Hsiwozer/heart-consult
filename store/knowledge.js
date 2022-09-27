export default {
  namespaced: true,

  state: () => ({
    knowledgeListNotadd: [],
    knowledgeListWantadd: []
  }),

  mutations: {
    updateKnowledgeListNotadd(state, knowledgeList) {
      state.knowledgeListNotadd = knowledgeList
    },
    updateKnowledgeListWantadd(state, knowledgeList) {
      state.knowledgeListWantadd = [...state.knowledgeListWantadd, ...knowledgeList]
    }
  },
  
  getters: {}
}