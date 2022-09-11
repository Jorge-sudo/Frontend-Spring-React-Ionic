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
import { Supplier } from "./Supplier";
import { removeSupplier, saveSupplier, searchSupplierById, searchSuppliers } from "./SupplierApi";

const SupplierEdit: React.FC = () => {
  //Aqui recibiremos un id
  const { name } = useParams<{ name: string; }>();
  //Este es un array vacio
  const [supplier, setSupplier] = useState<Supplier>({});
  const history = useHistory();

  //el routeMatch saca la variable id del  URL y le asigna a la variable id
  const routeMatch: any  = useRouteMatch("/page/suppliers/:id");
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
      setSupplier({});
    }else{
        //luego buscamos el objeto a recuperar por el Id
        let result = await searchSupplierById(id);
        //agregamos el resultado a los inputs
        setSupplier(result);
    }
  };

  const save = async () => {
    await saveSupplier(supplier);
    history.push('/page/suppliers');
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
            <IonTitle>{id === 'new' ? 'Agregar Empleado ': 'Editar Empleado'}</IonTitle>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Nombre</IonLabel>
                  <IonInput onIonChange={e => supplier.name = String(e.detail.value)}
                   value={supplier.name}> </IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Contacto</IonLabel>
                  <IonInput onIonChange={e => supplier.contact= String(e.detail.value)}
                   value={supplier.contact}> </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput onIonChange={e => supplier.email = String(e.detail.value)}
                   value={supplier.email}> </IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Direccion</IonLabel>
                  <IonInput onIonChange={e => supplier.address = String(e.detail.value)}
                   value={supplier.address}> </IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Telefono</IonLabel>
                  <IonInput onIonChange={e => supplier.phone = String(e.detail.value)}
                   value={supplier.phone}> </IonInput>
                </IonItem>
              </IonCol>
              
              <IonCol>
              <IonItem>
                  <IonLabel position="stacked">Web</IonLabel>
                  <IonInput onIonChange={e => supplier.web = String(e.detail.value)}
                   value={supplier.web}> </IonInput>
                </IonItem>
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
export default SupplierEdit;
