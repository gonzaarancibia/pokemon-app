import { createBrowserRouter } from 'react-router';
import Home from '../pages/home/Home.jsx';
import ErrorPage from '../pages/ErrorPage.jsx';
import PokemonDetail from '../pages/PokemonDetail.jsx';
import Layout from './Layout.jsx';
import { fetchPokemonDetail } from '../services/pokemonApi.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, path: '/home', element: <Home /> }],
  },
  {
    path: 'pokemon/:id',
    loader: async ({ params }) => {
      const pokemon = await fetchPokemonDetail(params.id);
      return { pokemon: pokemon };
    },
    element: <PokemonDetail />,
  },
]);

export default router;
