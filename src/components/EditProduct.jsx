import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProductAction } from '../actions/productAction';
import { useHistory } from 'react-router-dom';

const EditProduct = () => {

    const dispacth = useDispatch();
    const history = useHistory();

    const [product, saveProduct] = useState({
        name: '',
        price: 0
    });

    
    //Producto Editar 
    const productEdit = useSelector(state => state.products.productEdit); 
    
    //Llenar local stage
    useEffect(() => {
        saveProduct(productEdit);
    }, [productEdit])

    //Leer datos del form
    const onChangerForm = e => {
        saveProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    }

    const { name, price} = product;

    const submitEditProduct = e => {
        e.preventDefault();
        
        dispacth( editProductAction(product) );

        history.push('/');

    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 fontweight-bold">
                            Editar Producto
                        </h2>

                        <form
                            onSubmit={submitEditProduct}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input 
                                type="text" 
                                className="form-control"
                                placeholder="Nombre Producto"
                                name="name"
                                value={name}
                                //onChange={onChangerForm}
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input 
                                type="number" 
                                className="form-control"
                                placeholder="Precio Producto"
                                name="price"
                                value={price}
                                onChange={onChangerForm}
                                />
                            </div>

                            <button 
                            type="submit" 
                            className="btn btn-primary font-weight-bold 
                            text-uppercase d-block w-100"
                            >Guardar Cambios</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditProduct;