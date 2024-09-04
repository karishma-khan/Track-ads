// State object: defines the initial state of the store
export const state = () => ({
  dashboardDataObj: {}, // Object to hold dashboard data
  adviserDataObj: {}, // Object to hold adviser data
  noiseOutput: {}, // Object to hold noise output data (not used in mutations/actions)
  searchResponse: [], // Array to hold search responses
  indexData: {}, // Object to hold index data
  dateRange: [], // Array to hold selected date range
  nation: 'IN' // Default nation
});

// Mutations: define functions to modify the state
export const mutations = {
  // Set dashboard data in the state
  set_dashboard_data(state, value) {
      let res = {};
      for (let item in value) {
          res[value[item].chart_id] = value[item];
      }
      state.dashboardDataObj = res;
  },
  // Set adviser data in the state
  set_adviser_data(state, value) {
      let res = {};
      for (let item in value) {
          res[value[item].chart_id] = value[item];
      }
      state.adviserDataObj = res;
  },
  // Set search response data in the state
  set_advertisers_data(state, value) {
      state.searchResponse = value[0]?.data;
  },
  // Set index data in the state
  set_index_data(state, value) {
      state.indexData = value[0]?.data;
  },
  // Set date range in the state
  set_date(state, value) {
      state.dateRange = value;
  },
  // Set nation in the state
  set_nation(state, value) {
      state.nation = value;
  }
};

// Actions: define asynchronous operations and commit mutations
export const actions = {
  // Submit feedback to the server
  async submitFeedback({ commit }, data) {
      try {
          let resp = await fetch(`http://34.131.71.160:8085/api/feedback`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          });
          return await resp.json();
      } catch (error) {
          console.log(error);
          return false;
      }
  },
  // Apply for access and create a user
  async applyAccess({ commit }, data) {
      try {
          let resp = await fetch(`http://34.131.71.160:8085/auth/create-user`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          });
          return await resp.json();
      } catch (error) {
          console.log(error);
          return false;
      }
  },
  // Get a login link for authentication
  async getLoginLink({ commit }, data) {
      try {
          let resp = await fetch(`http://34.131.71.160:8085/auth/login-with-link`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          });
          return await resp.json();
      } catch (error) {
          console.log(error);
          return false;
      }
  },
  // Verify login using a token
  async verifyLogin({ commit }, sesameToken) {
      try {
          let data = { "sesame": sesameToken };
          let resp = await fetch(`http://34.131.71.160:8085/auth/verify-login`, {
              method: 'POST',
              body: JSON.stringify(data),
          });
          const { access } = await resp.json();
          if (access) {
            localStorage.setItem('access', access);
            return true;
          }
          return false;
      } catch (error) {
          console.log(error);
          return false;
      }
  },
  // Set the date range in the state
  async set_date_range({ commit }, dateRange) {
      commit("set_date", dateRange);
  },
  // Filter by nation and set it in the state
  async filter_by_nation({ commit }, nation) {
      commit("set_nation", nation);
  },
  // Fetch advertisers data based on a date range
  async get_advertisers({ commit }, searchText) {
      try {
          let prevDate = new Date(searchText[0]);
          let newDate = new Date(searchText[1]);
          // Fetch data from API
          let resp = await fetch(`http://34.131.71.160:8085/api/overview?country=IN&start=${prevDate.toISOString().substring(0,10)}&end=${newDate.toISOString().substring(0,10)}&limit=50`);
          resp = await resp.json();
          commit("set_index_data", resp);
          return resp;
      } catch (error) {
          console.log(error);
          return false;
      }
  },
  // Search for advertisers based on a query and country
  async search_advertisers({ commit }, { search, country }) {
      try {
          let resp = await fetch(`http://34.131.71.160:8085/api/search?query=${search}&country=${country}`);
          resp = await resp.json();
          commit("set_advertisers_data", resp);
          return resp;
      } catch (error) {
          console.log(error);
          return false;
      }
  },
  // Fetch dashboard data based on date range and country
  async set_dashboard_action({ commit }, value) {
      try {
          let prevDate = new Date(value[0][0]);
          let newDate = new Date(value[0][1]);
          const token = localStorage.getItem('access') || '';
          // Fetch data from API
          let resp = await fetch(`http://34.131.71.160:8085/api/data?country=${value[1]}&start=${prevDate.toISOString().substring(0,10)}&end=${newDate.toISOString().substring(0,10)}`,{
            method: 'GET', // or 'POST', etc.
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Add the token to the Authorization header
            }
          });
          resp = await resp.json();
          commit("set_dashboard_data", resp);
          return resp;
      } catch (error) {
          console.log(error);
          return false;
      }
  },
  // Fetch advertiser data based on date range, country, advertiser ID, and page ID
  async set_advertisers_action({ commit }, value) {
      try {
          let prevDate = new Date(value[0][0]);
          let newDate = new Date(value[0][1]);
          let pageDetail = ''
          if(value[3])
            pageDetail = '&pageId='+value[3]
          // Fetch data from API
          let resp = await fetch(`http://34.131.71.160:8085/api/data?country=${value[1]}&start=${prevDate.toISOString().substring(0,10)}&end=${newDate.toISOString().substring(0,10)}&advertiser_ad_id=${value[2]}${pageDetail}`);
          resp = await resp.json();
          commit("set_adviser_data", resp);
          return resp;
      } catch (error) {
          console.log(error);
          return false;
      }
  },
  // Return advertiser data based on date range, country, and advertiser ID
  async return_advertisers_action({ commit }, value) {
      try {
          let prevDate = new Date(value[0][0]);
          let newDate = new Date(value[0][1]);
          // Fetch data from API
          let resp = await fetch(`http://34.131.71.160:8085/api/data?country=${value[1]}&start=${prevDate.toISOString().substring(0,10)}&end=${newDate.toISOString().substring(0,10)}&advertiser_ad_id=${value[2]}`);
          resp = await resp.json();
          return resp;
      } catch (error) {
          console.log(error);
          return false;
      }
  }
}

// Getters: define functions to access state properties
export const getters = {
  get_dashboard_data: (state) => state.dashboardDataObj, // Get dashboard data
  get_adviser_data: (state) => state.adviserDataObj, // Get adviser data
  get_advertisers_search_data: (state) => state.searchResponse, // Get search response data
  get_index_data: (state) => state.indexData, // Get index data
  get_date: (state) => state.dateRange, // Get selected date range
  get_nation: (state) => state.nation, // Get selected nation
};