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
});

export const mutations = {
  changeSelected(state, payload) {
    state.selected = payload;
  },
  SET_USER(state, payload) {
    state.user = payload;
  },
  CLEAR_USER(state) {
    state.user = { email: "", password: "" };
  },
  SET_LIST(state, payload) {
    state.favList = payload;
  },
  CLEAR_LIST(state) {
    state.favList = null;
  },
};

export const actions = {
  async login({ commit }, details) {
    const { email, password } = details;
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res) {
        console.log(res.user);
        commit("SET_USER", auth.currentUser);
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
        commit("SET_USER", res.user);
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
      console.log(el.id, " => ", el.data().list);
      let info = el.data().list;
      const cityRef = doc(db, "users", el.id);
      setDoc(cityRef, { list: info.concat(details.movie) }, { merge: true });
      final = el.data().list;
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
      console.log("rewriting");
    });
  },

  async logout({ commit }) {
    const res = await signOut(auth);
    if (res) {
      commit("CLEAR_USER");
      commit("CLEAR_LIST");
    }
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
