import { create } from 'zustand';

type PokemonStore = {
	pokemon: string[];
	setPokemon: (pokemon: string[]) => void;
};

const usePokemonStore = create<PokemonStore>((set) => ({
	pokemon: [],
	setPokemon: (pokemon) => set({ pokemon }),
}));

export default usePokemonStore;
