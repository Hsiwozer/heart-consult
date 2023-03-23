export default {
  namespaced: true,

  state: () => ({
    existSyn: [],
    syndromes: [],
    main: [],
    sub: []
  }),

  mutations: {
    updateExistSyn(state, existSyn) {
      state.existSyn = existSyn
    },
    updateOrigin(state, data) {
      state.syndromes = data
      state.main = [...new Set(data.map(item => {return item.main_syndrome}))]
      state.sub = [...new Set(data.map(item => {return item.sub_syndrome}))] 
    }
  },
  
  actions: {
    async getOrigin({commit}) {
      const { data: res } = await uni.$http.get('/api/syndrome/get')
      if(res.status !== 0) {
        return uni.showToast({
          title: '数据请求失败！',
          duration: 1500,
          icon: 'none'
        })
      }
      commit('updateOrigin', res.data)
    },
  },
  
  getters: {
    // showMain: state => {
    //   return state.main
    // },
    // showSub: state => {
    //   return state.sub
    // },
    // showSyn: state => {
    //   return state.syndromes
    // },
    
    // 分析对应病情及严重性
    showResult: state => {
      // 以下判断出符合的子证型及各子证型对应的分数，得到结果为数组sub_result
      let sub_result = []
      for (let i = 0, score = 0; i < state.sub.length; i++, score = 0) {
        for (let j = 0; j < state.syndromes.length; j++) {
          if (state.sub[i] === state.syndromes[j].sub_syndrome) {
            for (let flag = 0; flag < state.existSyn.length; flag++) {
              if (state.existSyn[flag] === state.syndromes[j].element) {
                score += state.syndromes[j].score
              }
            }
          }
        }
        if (state.sub[i] === '气虚' || state.sub[i] === '痰浊')
          score = score / 2
        if (state.sub[i] === '血瘀')
          score = score / 3
        if (score != 0)
          sub_result.push({sub: state.sub[i], score: score})
      }
      
      // 判断必选项
      if (!state.existSyn.includes('心悸失眠')) {
        for(let i = 0; i < sub_result.length; i++){
          if(sub_result[i].sub === '心阴虚' || sub_result[i].sub === '心阳虚'){
            sub_result.splice(i, 1);
          }
        }
      }
      if (!state.existSyn.includes('腰膝酸软')) {
        for(let i = 0; i < sub_result.length; i++){
          if(sub_result[i].sub === '肾阴虚'){
            sub_result.splice(i, 1);
          }
        }
      }
      if (!state.existSyn.includes('腰腹冷痛')) {
        for(let i = 0; i < sub_result.length; i++){
          if(sub_result[i].sub === '肾阳虚'){
            sub_result.splice(i, 1);
          }
        }
      }
      
      // data数组存放的是各类证型对应的子证型
      const data = [];
      state.syndromes.forEach(syndrome => {
        const { main_syndrome, sub_syndrome } = syndrome;
        const mainIndex = data.findIndex(item => item.main === main_syndrome);
        if (mainIndex === -1) {
          data.push({ main: main_syndrome, sub: [sub_syndrome] });
        } else {
          const subIndex = data[mainIndex].sub.findIndex(sub => sub === sub_syndrome);
          if (subIndex === -1) {
            data[mainIndex].sub.push(sub_syndrome);
          }
        }
      });
      
      // 以下来根据已有的子证型及分数，判断主证型及病情严重程度，得到结果为main_result
      const result = [];
      data.forEach(item => {
        const { main, sub } = item;
        let score = 0;
        let flag = 0
        sub_result.forEach(subItem => {
          if (sub.includes(subItem.sub)) {
            score += subItem.score;
            flag += 1
          }
        });
        if (score >= 8 && flag == 2) {
          result.push({ main, score });
          flag = 0
        }
      });
      
      return result;
    }
  }
}