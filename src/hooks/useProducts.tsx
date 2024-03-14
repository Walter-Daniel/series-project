import { AxiosResponse } from 'axios';
import { ProductsResponse } from '../interfaces/product';
import { productsApi } from '../api/products';
import { useQuery } from '@tanstack/react-query';

interface Options {
    filterKey?: string
}

const getProducts = async({filterKey}: Options) => {
    const filterURL = (filterKey) ? `category=${filterKey}` : '';
    const response:AxiosResponse<ProductsResponse> = await productsApi.getAll(filterURL);
    const { products } = response.data;
    return products;
}

export const useProducts = ({ filterKey }: Options) => {

    const { isLoading, error, isError, data = [] } = useQuery({
        queryKey: ['products', {filterKey}],
        queryFn: () => getProducts({filterKey}),
        staleTime: 1000*60*60
        // refetchOnWindowFocus: false
    });
    
    return {isLoading, error, isError, data}
}