export const state = () => ({
  optionsList: ["new", "genres", "countries", "years"],
  selected: "new",
});

export const mutations = {
  changeSelected(state, payload) {
    console.log(payload);
    state.selected = payload;
  },
};
