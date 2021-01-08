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
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_EDIT_ERROR,
    START_EDIT_PRODUCT
} from '../types';


//Cada reducer tiene su propio state
const initialState = {
    products: [],
    error: false,
    loading: false,
    productDelete: null,
    productEdit: null
}

export default function(state = initialState, action){
    switch (action.type) {
        case START_DOWNLOAD_PRODUCTS:
        case ADD_PRODUCT:
            return {
                ...state,
                loading: action.payload 
            }
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false, 
                error: false,
                products: [...state.products, action.payload]
            }
        case ADD_PRODUCT_ERROR:
        case DELETE_PRODUCT_ERROR:
        case DOWNLOAD_PRODUCTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DOWNLOAD_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false, 
                products: action.payload
            }
        case GET_DELETE_PRODUCT:
            return {
                ...state,
                productDelete: action.payload
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.filter( product => product.id !== state.productDelete),
                productDelete: null

            }
        case GET_PRODUCT_EDIT:
            return {
                ...state,
                productEdit: action.payload
            }
        case PRODUCT_EDIT_SUCCESS:
            return { 
                ...state,
                productEdit: null,
                products: state.products.map(product => 
                    product.id === action.payload.id ? product = action.payload
                    : product )
            }
        default:
            return state;
    }
}