export const state = () => ({
  optionsList: ["new", "genres", "countries", "years"],
  selected: "new",
});

export const mutations = {
  changeSelected(state, payload) {
    state.selected = payload;
  },
};
