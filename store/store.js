import Vue from 'vue'
import Vuex from 'vuex'

import moduleUser from './user.js'
import moduleKnowledge from './knowledge.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    m_user: moduleUser,
    m_knowledge: moduleKnowledge
  },
})

export default store