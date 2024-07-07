import dashboardData from '../data/dashboard.json'
import homepageData from '../data/homepage.json'
import advertiserData from '../data/advertiser.json'
export const state = () => ({
    dashboardDataObj:{},
    adviserDataObj:{},
    noiseOutput:{},
    searchResponse:[],
    indexData:{},
    dateRange:[],
    nation:'IN'
  });

export const mutations = {
    set_dashboard_data(state, value) {
        let res = {}
        for(let item in value)
            {
              res[value[item].chart_id] = value[item]
            }
        state.dashboardDataObj = res;
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
      state.searchResponse = value[0]?.data;
    },
    set_index_data(state, value) {
      state.indexData = value[0]?.data;
    },
    set_date(state, value) {
      state.dateRange = value;
    },
    set_nation(state, value) {
      state.nation = value;
    }
};

export const actions = {
  async submitFeedback({commit},data){
    try {
      let resp = await fetch(`http://34.131.71.160:8085/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      return await resp.json()
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async set_date_range({commit}, dateRange){
    commit("set_date", dateRange );
  },
  async filter_by_nation({commit}, nation){
    commit("set_nation", nation );
  },
  async get_advertisers({ commit }, searchText) {
    try {
      let resp = homepageData
      // let resp = await fetch(`http://34.131.71.160:8085/api/overview?country=IN&start=2024-06-29&end=2024-07-03`)
      // resp = await resp.json()
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
        let prevDate = new Date(value[0][0])
        let newDate = new Date(value[0][1])
        let resp = dashboardData
        // let resp = await fetch(`http://34.131.71.160:8085/api/data?country=${value[1]}&start=${prevDate.toISOString().substring(0,10)}&end=${newDate.toISOString().substring(0,10)}`)
        // resp = await resp.json()
        commit("set_dashboard_data", resp);
        return resp
      } catch (error) {
        console.log(error);
        return false;
      }
  },
  async set_advertisers_action({ commit }, value) {
    try {
      let prevDate = new Date(value[0][0])
      let newDate = new Date(value[0][1])
      let pageDetail=''
      if(value[3])
        pageDetail = '&pageId='+value[3]
      let resp = advertiserData
      // let resp = await fetch(`http://34.131.71.160:8085/api/data?country=${value[1]}&start=${prevDate.toISOString().substring(0,10)}&end=${newDate.toISOString().substring(0,10)}&advertiser_ad_id=${value[2]}${pageDetail}`)
      // resp = await resp.json()
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
    get_nation: (state) => state.nation,
};