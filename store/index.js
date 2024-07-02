export const state = () => ({
    dashboardDataObj:{},
    adviserDataObj:{},
    noiseOutput:{},
    searchResponse:[]
  });

export const mutations = {
    set_dashboard_data(state, value) {
        let res = {}
        for(let item in value)
            {
              res[value[item].chart_id] = value[item].data
            }
        state.dashboardDataObj = res;
        console.log('commited',state.dashboardDataObj);
    },
    set_adviser_data(state, value) {
        let res = {}
        for(let item in value)
            {
              res[value[item].chart_id] = value[item].data
            }
        state.adviserDataObj = res;
    },
    set_advertisers_data(state, value) {
      console.log('from mutation',value);
      state.searchResponse = value[0].data;
    }
};

export const actions = {
  async search_advertisers({ commit }, searchText) {
    try {
        let resp = await fetch(`http://34.131.71.160:8085/api/search?query=${searchText}`)
        resp = await resp.json()
        commit("set_advertisers_data", resp);
        return resp
      } catch (error) {
        console.log(error);
        return false;
      }
},
    async set_dashboard_action({ commit }, value) {
        try {
            let resp = await fetch('http://34.131.71.160:8085/api/data?country=IN&start=2024-04-07&end=2024-04-09')
            resp = await resp.json()
            commit("set_dashboard_data", resp);
            return resp
          } catch (error) {
            console.log(error);
            return false;
          }
    },
    async set_advertisers_action({ commit }, value) {
      try {
          let resp = await fetch('http://34.131.71.160:8085/api/data?country=IN&start=2024-04-07&end=2024-04-09&advertiser_ad_id=1266099907681747')
          resp = await resp.json()
          commit("set_adviser_data", resp);
          return resp
        } catch (error) {
          console.log(error);
          return false;
        }
  }
}

export const getters = {
    get_dashboard_data: (state) => state.dashboardDataObj,
    get_adviser_data: (state) => state.adviserDataObj,
    get_advertisers_search_data: (state) => state.searchResponse
};