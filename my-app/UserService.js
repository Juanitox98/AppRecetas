import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

const collectionName = "recetas";

export const addReceta = async (recetaData) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), recetaData);
    console.log("Receta añadida con ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error añadiendo receta: ", e);
    throw e;
  }
};

export const updateReceta = async (recetaId, recetaData) => {
  try {
    await updateDoc(doc(db, collectionName, recetaId), recetaData);
    console.log("Receta actualizada");
  } catch (e) {
    console.error("Error actualizando receta: ", e);
    throw e;
  }
};

export const deleteReceta = async (recetaId) => {
  try {
    await deleteDoc(doc(db, collectionName, recetaId));
    console.log("Receta eliminada");
  } catch (e) {
    console.error("Error eliminando receta: ", e);
    throw e;
  }
};

export const getRecetas = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error obteniendo recetas: ", e);
    throw e;
  }
};
