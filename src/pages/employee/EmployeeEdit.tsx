import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, checkmark, close, pencil } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router";
import ExploreContainer from "../../components/ExploreContainer";
import { Employee } from "./Employee";
import { removeEmployee, saveEmployee, searchEmployeeById, searchEmployees } from "./EmployeeApi";

const EmployeeEdit: React.FC = () => {
  //Aqui recibiremos un id
  const { name } = useParams<{ name: string; }>();
  
  //Este es un array vacio
  const [employee, setEmployee] = useState<Employee>({});
  const history = useHistory();

  //el routeMatch saca la variable id del  URL y le asigna a la variable id
  const routeMatch: any  = useRouteMatch("/page/employees/:id");
  let id = routeMatch?.params?.id;

  //lo que queremos hacer es cuando se habra la pagina se haga una busqueda en la API por lo que hacemos lo siguiente
  useEffect(() => {
    //Este metodo se ejecutara cuando se cargue por primera vez
    search(); //funcion llama a la API y llena de datos
  }, [history.location.pathname]); //

  //Aqui creamos la funcion para buscar=search
  const  search = async () => {
    
    //primero preguntamos si el id es diferente a new
    if(id ==='new'){
      //si el id == new pondremos un customer vacio a los campos de textos
      setEmployee({});
    }else{
        //luego buscamos el objeto a recuperar por el Id
        let result = await searchEmployeeById(id);
        //agregamos el resultado a los inputs
        setEmployee(result);
    }
  };

  const save =  async() => {
    //math.random nos devuelve un valor aleatorio entre 0 a 1000
    await saveEmployee(employee);
    history.push('/page/employees');
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
            <IonTitle>{id == 'new' ? 'Agregar Empleado ': 'Editar Empleado'}</IonTitle>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Nombre</IonLabel>
                  <IonInput onIonChange={e => employee.firstname = String(e.detail.value)}
                   value={employee.firstname}> </IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Apellido</IonLabel>
                  <IonInput onIonChange={e => employee.lastname= String(e.detail.value)}
                   value={employee.lastname}> </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput onIonChange={e => employee.email = String(e.detail.value)}
                   value={employee.email}> </IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Direccion</IonLabel>
                  <IonInput onIonChange={e => employee.address = String(e.detail.value)}
                   value={employee.address}> </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Telefono</IonLabel>
                  <IonInput onIonChange={e => employee.phone = String(e.detail.value)}
                   value={employee.phone}> </IonInput>
                </IonItem>
              </IonCol>
              
              <IonCol>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Salario</IonLabel>
                  <IonInput onIonChange={e => employee.salary = Number(e.detail.value)}
                   value={employee.salary}> </IonInput>
                </IonItem>
              </IonCol>
              
              <IonCol>
              </IonCol>
            </IonRow>

            <IonItem>
              <IonButton onClick={save} color="success" fill="solid" slot="end" size="default">
                <IonIcon icon={checkmark}> </IonIcon>  Guardar
              </IonButton>
            </IonItem>
          </IonCard>

        </IonContent>
      </IonContent>
    </IonPage>
  );
};
export default EmployeeEdit;
