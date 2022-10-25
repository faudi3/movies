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
  user: null,
  favList: [],
  currEmail: null,
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
  SET_LIST(state, item) {
    state.favList = item;
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
    qs.forEach((el) => {
      result = el.data().list;
    });
    commit("SET_LIST", result);
  },
  async register({ commit }, details) {
    const { email, password } = details;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, "users"), {
        email: email,
        name: email,
        list: [],
      });
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
