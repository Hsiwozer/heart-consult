export default {
  namespaced: true,

  state: () => ({
    knowledgeList: []
  }),

  mutations: {
    updateKnowledgeList(state, knowledgeList) {
      state.knowledgeList = [...state.knowledgeList, ...knowledgeList]
    },
    clearKnowledgeList(state) {
      state.knowledgeList = []
    }
  },
  
  getters: {
    showKnowledgeList: state => {
      return state.knowledgeList
    }
  }
}