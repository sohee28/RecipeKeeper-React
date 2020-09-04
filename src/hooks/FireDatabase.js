import React, { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const FireDatabase = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore.collection(collection).onSnapshot((snap) => {
      let documents = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });

    return () => unsub();
  }, []);

  return { docs };
};

export default FireDatabase;
