import React, { Fragment, useEffect } from 'react';
import Product from './Product';

//Redux 
import { useSelector, useDispatch } from 'react-redux';
import { getProductsAction } from '../actions/productAction';

const Products = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        //Consultar API
        const loadProducts = () => dispatch( getProductsAction() );
        loadProducts();
    }, []);

    //Obtener State
    const products = useSelector(state => state.products.products);
    const error = useSelector(state => state.products.error);
    const loading = useSelector(state => state.products.loading);


    return ( 
        <Fragment>
            <h2 className="text-center my-5">Listado de Productos</h2>
            {error ? <p className="font-weight-bold alert alert-danger text-center mt-4">
                Hubo un error </p> : null }
            {loading ? <p className="text-center">Cargando...</p> : null}
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <th scope="col">Nombre Producto</th>
                    <th scope="col">Precio Producto</th>
                    <th scope="col">Acciones Producto</th>
                </thead>
                <tbody>
                    {products.length === 0 ? 'No hay productos' : (
                        products.map(product => (
                            <Product 
                                key={product.id}
                                product={product}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </Fragment>
     );
}
 
export default Products;