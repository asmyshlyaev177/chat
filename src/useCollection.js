import { useState, useEffect } from 'react';
import { db } from "./firebase";

function useCollection(path, orderBy=undefined) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    let collection = db.collection(path);
    if (orderBy) {
        collection = collection.orderBy(orderBy)
    }
    return collection.onSnapshot(snapshot => {
        const docs = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        setDocs(docs);
      });
  }, [path, orderBy]);

  return docs;
}

export default useCollection;