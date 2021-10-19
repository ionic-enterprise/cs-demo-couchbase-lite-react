import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Database,
  DataSource,
  Ordering,
  QueryBuilder,
  SelectResult,
  Meta,
  DatabaseConfiguration,
  MutableDocument,
} from "@ionic-enterprise/couchbase-lite";
import { IonSpinner } from "@ionic/react";

import { TeaCategory } from "./TeaCategory";

export const TeaCategoriesContext = createContext<{
  categories: TeaCategory[];
  get: (id: string) => Promise<TeaCategory>;
  save: (category: TeaCategory) => Promise<void>;
  remove: (id: string) => Promise<void>;
}>({
  categories: [],
  get: () => Promise.resolve({ name: "default", description: "default" }),
  save: () => Promise.resolve(),
  remove: () => Promise.resolve(),
});

export const TeaCategoriesProvider: React.FC = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [categories, setCategories] = useState<TeaCategory[]>([]);

  const database: Database = useMemo(() => {
    const config = new DatabaseConfiguration();
    config.setEncryptionKey("8e31f8f6-60bd-482a-9c70-69855dd02c38");
    return new Database("teaCategories", config);
  }, []);

  const getAll = useCallback(async () => {
    const query = QueryBuilder.select(
      SelectResult.property("name"),
      SelectResult.property("description"),
      SelectResult.expression(Meta.id)
    )
      .from(DataSource.database(database))
      .orderBy(Ordering.property("name"));

    const ret = await query.execute();
    const res = await ret.allResults();
    const categories = res.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
    }));
    setCategories(categories);
  }, [database]);

  useEffect(() => {
    const initializeDatabase = async () => {
      await database.open();
      database.addChangeListener(() => getAll());
      await getAll();
      setIsLoaded(true);
    };
    initializeDatabase();
  }, [database, getAll]);

  const get = async (id: string): Promise<TeaCategory> => {
    const doc = await database.getDocument(id);
    const dict = doc.toDictionary();
    return {
      id: doc.getId(),
      name: dict.name,
      description: dict.description,
    };
  };

  const save = async (category: TeaCategory) => {
    return category.id ? update(category) : add(category);
  };

  const remove = async (id: string) => {
    const doc = await database.getDocument(id);
    return database.deleteDocument(doc);
  };

  const add = async (category: TeaCategory) => {
    const doc = new MutableDocument()
      .setString("name", category.name)
      .setString("description", category.description);
    return database.save(doc);
  };

  const update = async (category: TeaCategory) => {
    const doc = await database.getDocument(category.id!);
    const mutableDoc = new MutableDocument(
      doc.getId(),
      doc.getSequence(),
      doc.getData()
    );
    mutableDoc
      .setString("name", category.name)
      .setString("description", category.description);
    return database.save(mutableDoc);
  };

  return (
    <TeaCategoriesContext.Provider value={{ categories, get, save, remove }}>
      {isLoaded ? children : <IonSpinner>Loading...</IonSpinner>}
    </TeaCategoriesContext.Provider>
  );
};
