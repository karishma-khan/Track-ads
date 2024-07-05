export const state = () => ({
    dashboardDataObj:{},
    adviserDataObj:{},
    noiseOutput:{},
    searchResponse:[],
    indexData:{},
    dateRange:[]
  });

export const mutations = {
    set_dashboard_data(state, value) {
        let res = {}
        for(let item in value)
            {
              res[value[item].chart_id] = value[item]
            }
        state.dashboardDataObj = res;
        console.log('commited',state.dashboardDataObj);
    },
    set_adviser_data(state, value) {
        let res = {}
        for(let item in value)
            {
              res[value[item].chart_id] = value[item]
            }
        state.adviserDataObj = res;
    },
    set_advertisers_data(state, value) {
      console.log('from mutation',value);
      state.searchResponse = value[0].data;
    },
    set_index_data(state, value) {
      state.indexData = value[0].data;
    },
    set_date(state, value) {
      state.dateRange = value;
    }
};

export const actions = {
  async set_date_range({commit}, dateRange){
    commit("set_date", dateRange );
  },
  async get_advertisers({ commit }, searchText) {
    try {
      let resp = await fetch(`http://34.131.71.160:8085/api/overview?country=IN&start=2024-06-29&end=2024-07-03`)
      resp = await resp.json()
      console.log(resp);
      commit("set_index_data", resp);
      return resp
    } catch (error) {
      console.log(error);
      return false;
    }
  },
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
      let resp = await fetch('http://34.131.71.160:8085/api/data?country=IN&start=2024-04-07&end=2024-04-09&advertiser_ad_id=960055112177032')
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
    get_advertisers_search_data: (state) => state.searchResponse,
    get_index_data: (state) => state.indexData,
    get_date: (state) => state.dateRange,
};