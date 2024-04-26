import { createBrowserRouter } from 'react-router-dom';

import App from '../App';

import District from '../pages/District/District';
import City from '../pages/City/City';
import Peoples from '../pages/Peoples/Peoples';
import Products from '../pages/Products/Products';
import Sales from '../pages/Sales/Sales';
import PeopleList from '../pages/PeoplesList/PeoplesList';
import SalesList from '../pages/SalesList/SalesList';

import ShowDistrict from '../pages/District/ShowDistrict';
import ShowCities from '../pages/City/ShowCities';
import ShowPeoples from '../pages/Peoples/ShowPeoples';
import ShowProducts from '../pages/Products/ShowProducts';
import ShowSales from '../pages/Sales/ShowSales';

import { DistrictContextProvider } from '../contexts/DistrictContext';
import { CityContextProvider } from '../contexts/CityContext';
import { PeopleContextProvider } from '../contexts/PeopleContext';
import { ProductContextProvider } from '../contexts/ProductContext';
import { SalesContextProvider } from '../contexts/SalesContext';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/admin/bairro',
        element: (
          <DistrictContextProvider>
            <District />,
          </DistrictContextProvider>
        ),
      },
      {
        path: '/admin/listar-bairros',
        element: (
          <DistrictContextProvider>
            <ShowDistrict />,
          </DistrictContextProvider>
        ),
      },
      {
        path: '/admin/cidade',
        element: (
          <CityContextProvider>
            <City />,
          </CityContextProvider>
        ),
      },
      {
        path: '/admin/listar-cidades',
        element: (
          <CityContextProvider>
            <ShowCities />,
          </CityContextProvider>
        ),
      },
      {
        path: '/admin/pessoa',
        element: (
          <PeopleContextProvider>
            <Peoples />,
          </PeopleContextProvider>
        ),
      },
      {
        path: '/admin/listar-pessoas',
        element: (
          <PeopleContextProvider>
            <ShowPeoples />,
          </PeopleContextProvider>
        ),
      },
      {
        path: '/admin/produto',
        element: (
          <ProductContextProvider>
            <Products />,
          </ProductContextProvider>
        ),
      },
      {
        path: '/admin/listar-produtos',
        element: (
          <ProductContextProvider>
            <ShowProducts />,
          </ProductContextProvider>
        ),
      },
      {
        path: '/admin/listar-vendas',
        element: (
          <SalesContextProvider>
            <ShowSales />,
          </SalesContextProvider>
        ),
      },
      {
        path: '/admin/vendas',
        element: (
          <SalesContextProvider>
            <Sales />,
          </SalesContextProvider>
        ),
      },
      {
        path: '/admin/lista-vendas',
        element: (
          <SalesContextProvider>
            <SalesList />,
          </SalesContextProvider>
        ),
      },
      {
        path: '/admin/lista-pessoas',
        element: (
          <PeopleContextProvider>
            <PeopleList />,
          </PeopleContextProvider>
        ),
      },
    ],
  },
]);
