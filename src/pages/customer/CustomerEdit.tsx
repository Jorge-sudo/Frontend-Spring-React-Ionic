import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
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
import { Customer } from "./Customer";
import { removeCustomer, saveCustomer, searchCustomerById, searchCustomers } from "./CustomerApi";

const CustomerEdit: React.FC = () => {
  //Aqui recibiremos un id
  const { name } = useParams<{ name: string; }>();


  //Este es un array vacio
  const [customer, setCustomer] = useState<Customer>({});
  const history = useHistory();
  
  //el routeMatch saca la variable id del  URL y le asigna a la variable id
  const routeMatch: any  = useRouteMatch("/page/customers/:id");
  let id = routeMatch?.params?.id;

  //lo que queremos hacer es cuando se habra la pagina se haga una busqueda en la API por lo que hacemos lo siguiente
  useEffect(() => {
    //Este metodo se ejecutara cuando se cargue por primera vez
    search(); //funcion llama a la API y llena de datos
  }, [history.location.pathname]); //con history lo que hacemos es que cada vez que se cambie de pagina se actualize

  //Aqui creamos la funcion para buscar=search
  const  search = async () => {
    
    //primero preguntamos si el id es diferente a new
    if(id ==='new'){
      //si el id == new pondremos un customer vacio a los campos de textos
      setCustomer({});
    }else{
        //luego buscamos el objeto a recuperar por el Id
        let result = await searchCustomerById(id);
        //agregamos el resultado a los inputs
        setCustomer(result);
    }
  };

  const save = async() => {
    //math.random nos devuelve un valor aleatorio entre 0 a 1000
    //si el await el guardar y listar hacen al mismo tiempo el await hace que se guarde primero despues listar 
    await saveCustomer(customer);
    history.push('/page/customers');
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
            <IonTitle> {id === 'new' ? 'Agregar Cliente ': 'Editar Cliente'} </IonTitle>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Nombre</IonLabel>
                  <IonInput onIonChange={e => customer.firstname = String(e.detail.value)}
                   value={customer.firstname}> </IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Apellido</IonLabel>
                  <IonInput onIonChange={e => customer.lastname= String(e.detail.value)}
                   value={customer.lastname}> </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput onIonChange={e => customer.email = String(e.detail.value)}
                   value={customer.email}> </IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Direccion</IonLabel>
                  <IonInput onIonChange={e => customer.address = String(e.detail.value)}
                   value={customer.address}> </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Telefono</IonLabel>
                  <IonInput onIonChange={e => customer.phone = String(e.detail.value)}
                   value={customer.phone}> </IonInput>
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
export default CustomerEdit;
