export default {
  namespaced: true,

  state: () => ({
    knowledgeList: []
  }),

  mutations: {
    updateKnowledgeList(state, knowledgeList) {
      state.knowledgeList = [...state.knowledgeList, ...knowledgeList]
    }
  },
  
  getters: {
    showKnowledgeList: state => {
      return state.knowledgeList
    }
  }
}