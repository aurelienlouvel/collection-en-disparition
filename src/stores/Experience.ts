import { defineStore } from "pinia";

export const useExperienceStore = defineStore("experience", {
  state: (): { completed: boolean; progression: number } => ({
    progression: 0 as number,
    completed: false as boolean,
  }),
  getters: {
    getProgression: (state) => {
      return state.progression;
    },
    getCompleted: (state) => {
      return state.completed;
    },
  },
  actions: {
    progress(): void {
      this.progression++;
    },
    setCompleted(): void {
      this.completed = true;
    },
  },
  persist: true,
});
