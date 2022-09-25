import Vue from 'vue'
import Vuex from 'vuex'

import moduleKnowledge from './knowledge.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    m_knowledge: moduleKnowledge,
  }
})

export default store