import { Employee } from './Employee';
//Esta funcion sera nuestra busqueda por aqui llamaremos a nuestra API para traer los datos
export async function searchEmployees() {
  let url = process.env.REACT_APP_API + 'employees'
  /* agregamos la url de la api que llamaremos  */
  let response =await fetch(url, {
    //metodo GET
    "method": 'GET',
    //cabecero despuesta de tipo JSON
    "headers": {
      "Content-Type": 'application/json'
    }
  })
  //aqui tenemos el json el listado de employees
  return await response.json();
}

//Funcion que nos permita eliminar
export async function removeEmployee(id: string) {
  let url = process.env.REACT_APP_API + 'employees/' + id
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
export async function saveEmployee(emplooyee: Employee) {
  let url = process.env.REACT_APP_API + 'employees'
  /* agregamos la url de la api que llamaremos  */
  await fetch(url, {
    //metodo GET
    "method": 'POST',
    //enviamos la respuesta a la api
    "body":JSON.stringify(emplooyee),
    //cabecero despuesta de tipo JSON
    "headers": {
      "Content-Type": 'application/json'
    }
  })
}

export async function searchEmployeeById(id: string) {
  let url = process.env.REACT_APP_API + 'employees/' + id
  /* agregamos la url de la api que llamaremos  */
  let response =await fetch(url, {
    //metodo GET
    "method": 'GET',
    //cabecero despuesta de tipo JSON
    "headers": {
      "Content-Type": 'application/json'
    }
  })
  //aqui tenemos el json el listado de employees
  return await response.json();
}
