import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useTeaCategories } from "./useTeaCategories";
import { useHistory } from "react-router";

import "./TeaCategories.css";

const TeaCategories: React.FC = () => {
  const [present] = useIonAlert();
  const history = useHistory();
  const { remove, categories } = useTeaCategories();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tea Categories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tea Categories</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push(`/tea-categories/add`)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        <IonList>
          {categories.map((cat) => (
            <IonItemSliding>
              <IonItem
                onClick={() => history.push(`/tea-categories/edit/${cat.id}`)}
                key={cat.id!}
              >
                <IonLabel>
                  <div className="name">{cat.name}</div>
                  <div className="description">{cat.description}</div>
                </IonLabel>
              </IonItem>
              <IonItemOptions>
                <IonItemOption
                  color="danger"
                  onClick={() =>
                    present({
                      header: "Confirm Delete",
                      message:
                        "Are you sure you want to permanently remove this category?",
                      buttons: [
                        { text: "No", role: "cancel" },
                        { text: "Yes", handler: () => remove(cat.id!) },
                      ],
                    })
                  }
                >
                  Delete
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TeaCategories;
