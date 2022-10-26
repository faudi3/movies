import { auth } from "~/plugins/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/plugins/firebase";
import { doc, setDoc } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";

export const state = () => ({
  optionsList: ["new", "genres", "countries", "years"],
  selected: "new",
  user: { email: "", password: "" },
  favList: [],
  currEmail: null,
  isLogged: false,
});

export const mutations = {
  changeSelected(state, payload) {
    state.selected = payload;
  },
  SET_USER(state, payload) {
    state.user.email = payload;
  },
  CLEAR_USER(state) {
    state.user = { email: "", password: "" };
  },
  SET_LIST(state, payload) {
    state.favList = payload;
  },
  CLEAR_LIST(state) {
    state.favList = [];
  },
  SET_LOGIN(state) {
    state.isLogged = !state.isLogged;
  },
};

export const actions = {
  async login({ commit }, details) {
    const { email, password } = details;
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res) {
        commit("SET_USER", res.user.email);
        commit("SET_LOGIN");
        console.log(state.user.email);
      }
    } catch (err) {
      if (!auth.currentUser) {
        alert("wrong pass");
      }
    }
  },
  async register({ commit }, details) {
    const { email, password } = details;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res) {
        commit("SET_USER", res.user.email);
        commit("SET_LOGIN");
      }
      await addDoc(collection(db, "users"), {
        email: email,
        name: email,
        list: [],
      });
    } catch (err) {
      if (!auth.currentUser) {
        alert("wrong pass");
      }
    }
  },
  async addInList({ commit }, details) {
    const q = await query(
      collection(db, "users"),
      where("email", "==", details.c)
    );
    const qs = await getDocs(q);
    let final = [];
    qs.forEach((el) => {
      let info = el.data().list;
      const cityRef = doc(db, "users", el.id);
      setDoc(cityRef, { list: info.concat(details.movie) }, { merge: true });
      final = info.concat(details.movie);
    });
    commit("SET_LIST", final);
  },
  async showList({ commit }, details) {
    const q = await query(
      collection(db, "users"),
      where("email", "==", details.c)
    );
    const qs = await getDocs(q);
    let result = [];

    await qs.forEach((el) => {
      result = el.data().list;
      commit("SET_LIST", result);
    });
  },
  async delete({ commit }, details) {
    const q = await query(
      collection(db, "users"),
      where("email", "==", details.c)
    );
    const qs = await getDocs(q);
    let final = [];
    qs.forEach((el) => {
      let info = el.data().list.filter((mov) => mov.id !== details.id);
      const cityRef = doc(db, "users", el.id);
      setDoc(cityRef, { list: info }, { merge: true });
      final = info;
      commit("SET_LIST", final);
      console.log(el.id, " => ", el.data().list);
    });
  },
  async logout({ commit }) {
    const res = await signOut(auth);
    commit("SET_LOGIN");

    commit("CLEAR_USER");
    commit("CLEAR_LIST");
  },
  /* fetchUser({ commit }) {
    auth.onAuthStateChanged(async (user) => {
      if (user === null) {
        commit("CLEAR_USER");
      } else {
        commit("SET_USER", user);
      }
    });
  },*/
};
