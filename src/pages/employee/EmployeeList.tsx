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
import ExploreContainer from "../../components/ExploreContainer";
import { Employee } from "./Employee";
import { removeEmployee, saveEmployee, searchEmployees } from "./EmployeeApi";

const EmployeeList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  //Este es un array vacio
  const [clientes, setClientes] = useState<Employee[]>([]);
  const history = useHistory();

  //lo que queremos hacer es cuando se habra la pagina se haga una busqueda en la API por lo que hacemos lo siguiente
  useEffect(() => {
    //Este metodo se ejecutara cuando se cargue por primera vez
    search(); //funcion llama a la API y llena de datos
  }, [history.location.pathname]); //con history lo que hacemos es que cada vez que se cambie de pagina se actualize

  //Aqui creamos la funcion para buscar=search
  const search = async () => {
    let result = await searchEmployees();
    setClientes(result);
  };

  //Esta funcion va recibir un id
  const remove = async (id:string)=>{
    //Elimina cliente
    await removeEmployee(id);
    //y hace la busqueda de vuelta 
    search();
  }

  const addEmployee = () => {
    //de esta forma agrega nuestra ruta a nuestro history 
    history.push('/page/employees/new');
  }

  const editEmployee = (id:string) => {
    //de esta forma agrega nuestra ruta a nuestro history 
    history.push('/page/employees/' + id);
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
            <IonTitle>Gestion de Empleados</IonTitle>

            <IonItem>
              <IonButton onClick={addEmployee} color="primary" fill="solid" slot="end" size="default">
                <IonIcon icon={add}> </IonIcon>
                Agregar Empleado
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

              {clientes.map((cliente: Employee) => (
                <IonRow>
                  <IonCol>
                    {cliente.firstname} {cliente.lastname}
                  </IonCol>
                  <IonCol>{cliente.email}</IonCol>
                  <IonCol>{cliente.phone}</IonCol>
                  <IonCol>{cliente.address}</IonCol>
                  <IonCol>
                    <IonButton onClick={() => editEmployee(String(cliente.id))} fill="solid" color="secondary">
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
export default EmployeeList;
