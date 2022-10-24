import { auth } from "~/plugins/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const state = () => ({
  optionsList: ["new", "genres", "countries", "years"],
  selected: "new",
  user: null,
});

export const mutations = {
  changeSelected(state, payload) {
    state.selected = payload;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  CLEAR_USER(state) {
    state.user = null;
  },
};

export const actions = {
  async login({ commit }, details) {
    const { email, password } = details;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      if (!auth.currentUser) {
        alert("wrong pass");
        return;
      }
    }
    commit("SET_USER", auth.currentUser);
    this.$router.push("/");
  },

  async register({ commit }, details) {
    const { email, password } = details;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      if (!auth.currentUser) {
        alert("wrong pass");
        return;
      }
    }
    commit("SET_USER", auth.currentUser);
    this.$router.push("/");
  },
  async logout({ commit }) {
    await signOut(auth);
    commit("CLEAR_USER");
    this.$router.push("/login");
  },
  fetchUser({ commit }) {
    auth.onAuthStateChanged(async (user) => {
      if (user === null) {
        commit("CLEAR_USER");
      } else {
        commit("SET_USER", user);
      }
    });
  },
};
