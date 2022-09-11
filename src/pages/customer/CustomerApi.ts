import { Customer } from './Customer';
//Esta funcion sera nuestra busqueda por aqui llamaremos a nuestra API para traer los datos
export async function searchCustomers() {
  let url = process.env.REACT_APP_API + 'customers'
  /* agregamos la url de la api que llamaremos  */
  let response =await fetch(url, {
    //metodo GET
    "method": 'GET',
    //cabecero despuesta de tipo JSON
    "headers": {
      "Content-Type": 'application/json'
    }
  })
  //aqui tenemos el json el listado de customers
  return await response.json();
}

//Funcion que nos permita eliminar
export async function removeCustomer(id: string) {
  let url = process.env.REACT_APP_API + 'customers/' + id
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
export async function saveCustomer(customer: Customer) {
  let url = process.env.REACT_APP_API + 'customers'
  /* agregamos la url de la api que llamaremos  */
  await fetch(url, {
    //metodo GET
    "method": 'POST',
    //enviamos la respuesta a la api
    "body":JSON.stringify(customer),
    //cabecero despuesta de tipo JSON
    "headers": {
      "Content-Type": 'application/json'
    }
  })
}

export async function searchCustomerById(id: string) {
  let url = process.env.REACT_APP_API + 'customers/' + id
  /* agregamos la url de la api que llamaremos  */
  let response =await fetch(url, {
    //metodo GET
    "method": 'GET',
    //cabecero despuesta de tipo JSON
    "headers": {
      "Content-Type": 'application/json'
    }
  })
  //aqui tenemos el json el listado de customers
  return await response.json();
}
