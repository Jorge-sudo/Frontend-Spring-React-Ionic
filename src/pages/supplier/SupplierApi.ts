import { Supplier } from './Supplier';
//Esta funcion sera nuestra busqueda por aqui llamaremos a nuestra API para traer los datos
export async function searchSuppliers() {
  let url = process.env.REACT_APP_API + 'suppliers'
  /* agregamos la url de la api que llamaremos  */
  let response =await fetch(url, {
    //metodo GET
    "method": 'GET',
    //cabecero despuesta de tipo JSON
    "headers": {
      "Content-Type": 'application/json'
    }
  })
  //aqui tenemos el json el listado de suppliers
  return await response.json();
}

//Funcion que nos permita eliminar
export async function removeSupplier(id: string) {
  let url = process.env.REACT_APP_API + 'suppliers/' + id
  /* agregamos la url de la api que llamaremos  */
  await fetch(url, {
    //metodo GET
    "method": 'DELETE',
    //cabecero despuesta de tipo JSON
    "headers": {
      "Content-Type": 'application/json'
    }
  })
}

//funcion que nos permita agregar
export async function saveSupplier(supplier: Supplier) {
  let url = process.env.REACT_APP_API + 'suppliers'
  /* agregamos la url de la api que llamaremos  */
  await fetch(url, {
    //metodo GET
    "method": 'POST',
    //enviamos la respuesta a la api
    "body":JSON.stringify(supplier),
    //cabecero despuesta de tipo JSON
    "headers": {
      "Content-Type": 'application/json'
    }
  })
}

export async function searchSupplierById(id: string) {
  let url = process.env.REACT_APP_API + 'suppliers/' + id
  /* agregamos la url de la api que llamaremos  */
  let response =await fetch(url, {
    //metodo GET
    "method": 'GET',
    //cabecero despuesta de tipo JSON
    "headers": {
      "Content-Type": 'application/json'
    }
  })
  //aqui tenemos el json el listado de suppliers
  return await response.json();
}
