import PokemonSingle from '../components/pokemon/PokemonSingle';
import PokemonCard from '../components/pokemon/PokemonGrid';

const Home = () => {
	return (
		<main className='max-w-7xl p-10 gap-5 mx-auto grid grid-cols-1 md:grid-cols-4'>
			<section className='md:col-span-3'>
				<PokemonCard />
			</section>
			<aside className='md:col-span-1 pt-20'>
				<PokemonSingle />
			</aside>
		</main>
	);
};

export default Home;
