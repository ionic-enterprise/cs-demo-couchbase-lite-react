import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea,
  IonFooter,
  IonButton,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { TeaCategory } from "../TeaCategory";
import { useTeaCategories } from "../useTeaCategories";

const TeaCategoryEditor: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { save, get } = useTeaCategories();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (id) {
      get(id).then((tea) => {
        setName(tea.name);
        setDescription(tea.description);
      });
    }
  }, [id, get]);

  const saveTeaCategory = async () => {
    const category: TeaCategory = { name, description };
    if (id) category.id = id;
    await save(category);
    setName("");
    setDescription("");
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>
            {id ? "Edit Tea Category" : "Add New Tea Category"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              {id ? "Edit Tea Category" : "Add New Tea Category"}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <form>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Name</IonLabel>
              <IonInput
                type="text"
                name="name"
                required
                value={name}
                onIonChange={(e) => setName(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Description</IonLabel>
              <IonTextarea
                rows={5}
                name="description"
                required
                value={description}
                onIonChange={(e) => setDescription(e.detail.value!)}
              />
            </IonItem>
          </IonList>
        </form>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton
            expand="full"
            disabled={!name.length || !description.length}
            onClick={() => saveTeaCategory()}
          >
            Save
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
export default TeaCategoryEditor;
