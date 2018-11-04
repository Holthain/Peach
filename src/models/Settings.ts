import _ from "lodash";
import Settings from "@/Server/Settings";
import { settings as types } from "@/vuexTypes";

export default {
  state: {
    preferences: {},
    database: {},
    users: {},
    cloud: {},
    loading: false
  },
  actions: {
    [types.startLoading]({ commit }: any) {
      commit(types.startLoading);
    },
    [types.stopLoading]({ commit }: any) {
      commit(types.stopLoading);
    },
    async [types.loadPreferences]({ commit }: any) {
      await commit(types.startLoading);
      await commit(types.loadPreferences, await Settings.getPreferences());
      await commit(types.stopLoading);
    },
    async [types.savePreferences]({ commit, dispatch }: any, preferences: any) {
      await commit(types.startLoading);
      await Settings.savePreferences(preferences);
      await dispatch(types.loadPreferences);
      await commit(types.stopLoading);
    },
    async [types.loadDatabase]({ commit }: any) {
      await commit(types.startLoading);
      await commit(types.loadDatabase, await Settings.getDatabase());
      await commit(types.stopLoading);
    },
    async [types.saveDatabase]({ commit, dispatch }: any, database: any) {
      await commit(types.startLoading);
      await Settings.saveDatabase(database);
      await dispatch(types.loadDatabase);
      await commit(types.stopLoading);
    },
    async [types.loadUsers]({ commit }: any) {
      await commit(types.startLoading);
      await commit(types.loadPreferences, await Settings.getPreferences());
      await commit(types.stopLoading);
    },
    async [types.saveUsers]({ commit, dispatch }: any, preferences: any) {
      await commit(types.startLoading);
      await Settings.savePreferences(preferences);
      await dispatch(types.loadPreferences);
      await commit(types.stopLoading);
    },
    async [types.loadCloud]({ commit }: any) {
      await commit(types.startLoading);
      await commit(types.loadCloud, await Settings.getCloud());
      await commit(types.stopLoading);
    },
    async [types.saveCloud]({ commit, dispatch }: any, cloud: any) {
      await commit(types.startLoading);
      await Settings.saveCloud(cloud);
      await dispatch(types.loadCloud);
      await commit(types.stopLoading);
    }
  },
  mutations: {
    [types.loadPreferences](state: any, preferences: any) {
      if (!preferences) state.preferences = {};
      else state.preferences = preferences;
    },
    [types.loadDatabase](state: any, database: any) {
      if (!database) state.database = {};
      else state.database = database;
    },
    [types.loadCloud](state: any, cloud: any) {
      if (!cloud) state.cloud = {};
      else state.cloud = cloud;
    },
    [types.startLoading](state: any) {
      state.loading = true;
    },
    [types.stopLoading](state: any) {
      state.loading = false;
    }
  }
};