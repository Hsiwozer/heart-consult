import Vue from 'vue'
import Vuex from 'vuex'

import moduleUser from './user.js'
import moduleKnowledge from './knowledge.js'
import moduleSyndromes from './syndromes.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    m_user: moduleUser,
    m_knowledge: moduleKnowledge,
    m_syndromes: moduleSyndromes
  },
})

export default store