import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Actions Redux
import { createNewProductAction } from '../actions/productAction';

const NewProduct = ({history}) => {

    //State local del componente 
    const [name, saveName] = useState('');
    const [price, savePrice] = useState(0);

    // Usar UseDispatch, devuelve funcion
    const dispatch = useDispatch();

    //Acceder al state del store 
    const loading = useSelector(state => state.products.loading); 
    const error = useSelector(state => state.products.error);   

    // Mandar a llamar el action
    const addProducto = product => dispatch( createNewProductAction(product) );

    const submitNewProduct = e => {
        e.preventDefault();

        //Validar Form
        if(name.trim() === '' || price <= 0){
            return;
        }

        //Si hay errores

        //Crear Producto
        addProducto({
            name,
            price
        });

        //Redirect al home
        history.push('/');

    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 fontweight-bold">
                            Agregar Nuevo Producto
                        </h2>

                        <form
                            onSubmit={submitNewProduct}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input 
                                type="text" 
                                className="form-control"
                                placeholder="Nombre Producto"
                                name="name"
                                value={name}
                                onChange={e => saveName(e.target.value)}
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
                                onChange={e => savePrice(Number(e.target.value))}
                                />
                            </div>

                            <button 
                            type="submit" 
                            className="btn btn-primary font-weight-bold 
                            text-uppercase d-block w-100"
                            >Agregar Producto</button>
                        </form>

                        {loading ? <p className="text-center">Cargando...</p>: null}
                        {error 
                        ? <p 
                            className="alert alert-danger p2 mt-4 text-center"
                            >Hubo un error</p>
                        : null }
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NewProduct;