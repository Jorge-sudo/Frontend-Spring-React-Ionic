import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, close, pencil } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Customer } from "./Customer";
import { removeCustomer, saveCustomer, searchCustomers } from "./CustomerApi";

const CustomerList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  //Este es un array vacio
  const [clientes, setClientes] = useState<Customer[]>([]);
  const history = useHistory();

  //lo que queremos hacer es cuando se habra la pagina se haga una busqueda en la API por lo que hacemos lo siguiente
  useEffect(() => {
    //Este metodo se ejecutara cuando se cargue por primera vez
    search(); //funcion llama a la API y llena de datos
  }, [history.location.pathname]); //con history lo que hacemos es que cada vez que se cambie de pagina se actualize

  //Aqui creamos la funcion para buscar=search
  const search = async () => {
    let result = await searchCustomers();
    setClientes(result);
  };

  //Esta funcion va recibir un id
  const remove = async (id:string)=>{
    //Elimina cliente
    // al no tener el await ejecuta el remove y el search al mismo tiempo 
    await removeCustomer(id);
    //y hace la busqueda de vuelta 
    search();
  }

  const addCustomer = () => {
    //de esta forma agrega nuestra ruta a nuestro history 
    history.push('/page/customers/new');
  }

  const editCustomer = (id:string) => {
    //de esta forma agrega nuestra ruta a nuestro history 
    history.push('/page/customers/' + id);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonCard>
            <IonTitle>Gestion de Clientes</IonTitle>

            <IonItem>
              <IonButton onClick={addCustomer} color="primary" fill="solid" slot="end" size="default">
                <IonIcon icon={add}> </IonIcon>
                Agregar Cliente
              </IonButton>
            </IonItem>

            <IonGrid className="table">
              <IonRow>
                <IonCol>Nombre</IonCol>
                <IonCol>Email</IonCol>
                <IonCol>Telefono</IonCol>
                <IonCol>Direccion</IonCol>
                <IonCol>Acciones</IonCol>
              </IonRow>

              {clientes.map((cliente: Customer) => (
                <IonRow>
                  <IonCol>
                    {cliente.firstname} {cliente.lastname}
                  </IonCol>
                  <IonCol>{cliente.email}</IonCol>
                  <IonCol>{cliente.phone}</IonCol>
                  <IonCol>{cliente.address}</IonCol>
                  <IonCol>
                    <IonButton onClick={() => editCustomer(String(cliente.id))} fill="solid" color="secondary">
                      <IonIcon icon={pencil} slot="icon-only"></IonIcon>
                    </IonButton>
                    <IonButton fill="solid" color="danger"
                      onClick={() => remove(String(cliente.id))}>
                      <IonIcon icon={close} slot="icon-only"></IonIcon>
                    </IonButton>
                  </IonCol>
                </IonRow>
              ))}
            </IonGrid>
          </IonCard>

        </IonContent>
      </IonContent>
    </IonPage>
  );
};
export default CustomerList;
