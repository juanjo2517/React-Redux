import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import  Swal from 'sweetalert2';

//Redux 
import { useDispatch } from 'react-redux';
import { deleteProductAction, getProductEdit } from '../actions/productAction';

const Product = ({ product }) => {
    const { name, price, id } = product;

    const dispatch = useDispatch();
    const history = useHistory();  //Habilitar history para redireccion

    //Confirmar Eliminacion
    const confirmDelete = id => {
        //Preguntar 
        Swal.fire({
            title: '¿Estás Seguro de Eliminar este producto?',
            text: "Se borrará definitivamente de la Base de Datos",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: '¡Sí, quiero eliminar!'
          }).then((result) => {
            if(result.isConfirmed){
                //Pasar al Action
                dispatch( deleteProductAction(id) );
            }
          });

    }

    //Redirigir a usuario a editar
    const redirectEdit = product => {
        dispatch( getProductEdit(product));
        history.push(`/productos/${product}`); 
    }

    return ( 
        <tr>
            <td>{name}</td>
            <td><span className="font-weight-bold">$ {price}</span></td>
            <td className="acciones">
                <button
                    type='button'
                    onClick={ () => redirectEdit(product) } 
                    className="btn btn-primary mr-2">
                    Editar
                </button>
                <button 
                type="button"
                className="btn btn-danger"
                onClick={() => confirmDelete(id)}
                >Eliminar</button>
            </td>
        </tr>
     );
}

export default Product; 