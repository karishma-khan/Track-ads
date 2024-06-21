export const state = () => ({
    dashboardDataObj:{},
    adviserDataObj:{},
    noiseOutput:{}
  });

export const mutations = {
    set_dashboard_data(state, value) {
        let res = {}
        for(let item in value)
            {
              res[value[item].chart_id] = value[item].data
            }
        state.dashboardDataObj = res;
    },
    set_adviser_data(state, value) {
        let res = {}
        for(let item in value)
            {
              res[value[item].chart_id] = value[item].data
            }
        state.adviserDataObj = res;
    },
};

export const actions = {
    async set_dashboard_action({ commit }, value) {
        try {
            let resp = await this.$axios.get('http://34.131.71.160:8085/api/data?country=IN&start=2024-04-07&end=2024-04-09')
            commit("set_dashboard_data", resp.data);
            return resp.data
          } catch (error) {
            console.log(error);
            return false;
          }
    },
    async set_advertisers_action({ commit }, value) {
      try {
          let resp = await this.$axios.get('http://34.131.71.160:8085/api/data?country=IN&start=2024-04-07&end=2024-04-09&advertiser_ad_id=1266099907681747')
          commit("set_adviser_data", resp.data);
          return resp.data
        } catch (error) {
          console.log(error);
          return false;
        }
  }
}

export const getters = {
    get_dashboard_data: (state) => state.dashboardDataObj,
    get_adviser_data: (state) => state.adviserDataObj
};