//Esto se compila en codigo JavaScript
/*Creamos interfaz(con interfaz no podemos agregar funcionalidades 
pero en clases si ) de tipo customer, si utilizamos clases se genera un codigo javaScript con clases, pero si 
utilizamos interfaces se genera un codigo JavaScript vacio por lo que no se necesita compilarlo */
export interface Customer {
  id ?: string; // dos puntos es obligatorio y dos puntos y signo de pregunta opcional
  //Los demas atributos son opcionales
  firstname?: string; 
  lastname?: string;
  email?: string;
  phone?: string;
  address?: string;
}
