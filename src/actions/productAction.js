import {
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    START_DOWNLOAD_PRODUCTS,
    DOWNLOAD_PRODUCTS_SUCCESS,
    DOWNLOAD_PRODUCTS_ERROR,
    GET_DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR,
    GET_PRODUCT_EDIT,
    START_EDIT_PRODUCT,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_EDIT_ERROR
} from '../types';
import axiosClient from '../config/axios';
import Swal from 'sweetalert2';

//Crear nuevos productos 
export function createNewProductAction(product){
    return async (dispatch) => {
        dispatch(addProduct());

        try {
            //Insertar en la API
            await axiosClient.post('/products', product);

            //Bien: Pasar State
            dispatch( addProductSucess(product) );

            //Alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            );
        } catch (error) {
            console.log(error);
            dispatch( addProductError(true) );
            
            //Alerta de error 
            Swal.fire({
                icon: 'error',
                tittle: 'ERROR',
                text: 'Hubo un error, intenta de nuevo'
,            });
        }
    }
}

const addProduct = () => ({
    type: ADD_PRODUCT,
    payload: true 
});

//Si el producto se guarda en la bd
const addProductSucess = product => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product
});

const addProductError = state => ({
    type: ADD_PRODUCT_ERROR,
    payload: state
});

//Cargar productos desde la bd
export function getProductsAction(){
    return async dispatch => {
        dispatch( downloadProducts() );
        try {
            const response = await axiosClient.get('/products');
            dispatch( downloadProductsSuccess(response.data) );
        } catch (error) {
            console.log(error);
            dispatch( downloadProductsError());
        }
    }
}

const downloadProducts = () => ({
    type: START_DOWNLOAD_PRODUCTS,
    payload: true 
});

const downloadProductsSuccess = products => ({
    type: DOWNLOAD_PRODUCTS_SUCCESS,
    payload: products
});

const downloadProductsError = () => ({
    type: DOWNLOAD_PRODUCTS_ERROR,
    payload: true
});

//Selecciona y elimina producto 
export function deleteProductAction(id) {
    return async dispatch => {
        dispatch( getProductDelete(id) );
        try {
            await axiosClient.delete(`/products/${id}`);
            dispatch( deleteProductSucess() );

            //Si se elimina 
            Swal.fire(
                '¡Eliminado!',
                'Producto Eliminado Satisfactoriamente',
                'success'
              );

        } catch (error) {
            console.log(error);
            dispatch( deleteProductError() );
        }
    }
}

const getProductDelete = id => ({
    type: GET_DELETE_PRODUCT,
    payload: id
});

const deleteProductSucess = () => ({
    type: DELETE_PRODUCT_SUCCESS
});

const deleteProductError = () => ({
    type: DELETE_PRODUCT_ERROR,
    payload: true
});

export function getProductEdit(product){
    return (dispatch) => {
        dispatch( getProductEditAction(product) );
    }
}

const getProductEditAction = product => ({
    type: GET_PRODUCT_EDIT,
    payload: product
});

//Edita en la API Y State
export function editProductAction(product){
    return async (dispatch) => {
        dispatch( editProduct(product) );
        try {
            await axiosClient.put(`/productos/${product.id}`, product);
            dispatch( editProductSuccess(product) )
        } catch (error) {
            console.log(error);
        }
    }
}

const editProduct = () => ({
    type: START_EDIT_PRODUCT
});

const editProductSuccess = product => ({
    type: PRODUCT_EDIT_SUCCESS,
    payload: product
});