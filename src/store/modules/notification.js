import * as types from "@/store/mutationTypes";

const state = {
  notifications: [],
  timeout: 3000,
};

let notificationId = 1;

const mutations = {
  [types.PUSH_NOTIFICATION]: (state, payload) => {
    state.notifications.push({
      ...payload,
      id: notificationId++,
    });
  },
  [types.REMOVE_NOTIFICATION]: (state, payload) => {
    state.notifications = state.notifications.filter(
      (n) => n.id !== payload.id
    );
  },
};

const actions = {
  pushNotification: ({ commit, state }, payload) => {
    commit(types.PUSH_NOTIFICATION, payload);
  },
  removeNotification: ({ commit }, payload) => {
    commit(types.REMOVE_NOTIFICATION, payload);
  },
};

export default {
  state, mutations, actions, namespaced: true
}