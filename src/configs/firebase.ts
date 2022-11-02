import 'dotenv/config';
import { initializeApp } from 'firebase/app';

// import 'firebase/auth';
import {
  getFirestore,
  DocumentData,
  CollectionReference,
  collection,
} from 'firebase/firestore';

export const firebaseApp = initializeApp({
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
});

export const firestore = getFirestore();

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>;
};

import { Employee } from '../models/employee.model';

export const employeeCollection = createCollection<Employee>('employees');
