// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  updatePassword,
  deleteUser,
} from 'firebase/auth';
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  collection,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage();

export const googleProvider = new GoogleAuthProvider();
export const gitProvider = new GithubAuthProvider();

export async function signup(email, password) {
  const {
    uid: id,
    displayName: username,
    phoneNumber,
    metadata: { createdAt },
  } = await authOperation(
    async () => await createUserWithEmailAndPassword(auth, email, password)
  );

  const userRef = doc(db, 'users', id);

  await setDoc(userRef, {
    id,
    username: username || createUsername(email),
    email,
    phoneNumber,
    createdAt,
  });
}

export async function login(email, password) {
  await authOperation(
    async () => await signInWithEmailAndPassword(auth, email, password)
  );
}

export async function loginWithSocialMedia(provider) {
  const {
    uid: id,
    displayName: username,
    email,
    phoneNumber,
    metadata: { createdAt },
  } = await authOperation(async () => await signInWithPopup(auth, provider));

  const userRef = doc(db, 'users', id);
  const isUserExist = (await getDoc(userRef)).exists();

  if (!isUserExist) {
    await setDoc(userRef, {
      id,
      username: username || createUsername(email),
      email,
      phoneNumber,

      createdAt,
    });
  }
}

export async function logout() {
  return signOut(auth);
}

export async function getUserInfo() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userData = (await getDoc(userRef)).data();

        const adminRef = doc(db, 'admins', user.uid);
        const isAdmin = (await getDoc(adminRef)).exists();

        resolve({ ...userData, isAdmin });
      } else {
        resolve();
      }
    });
  });
}

export async function updateUserInfo(newInfo, updatingPassword) {
  const crrUser = auth.currentUser;
  if (updatingPassword) {
    await updatePassword(crrUser, newInfo);
    return;
  }
  const userRef = doc(db, 'users', crrUser.uid);
  await updateDoc(userRef, newInfo);
}
export async function deleteAccount() {
  const crrUser = auth.currentUser;
  const userRef = doc(db, 'users', crrUser.uid);

  await deleteDoc(userRef);
  deleteUser(crrUser);
}
export async function uploadProduct(product, url) {
  const id = uuid();
  const imageRef = ref(storage, `images/${url.name}`);
  const imageUpload = await uploadBytes(imageRef, url);
  const imageUrl = await getDownloadURL(imageUpload.ref);

  const productRef = doc(db, 'products', id);
  await setDoc(productRef, {
    id,
    ...product,
    image: { name: url.name, imageUrl },
  });
}
export async function getProducts() {
  const products = [];
  const snapshot = await getDocs(collection(db, 'products'));
  snapshot.forEach((doc) => products.push(doc.data()));
  return products;
}
export async function deleteProduct(id, name) {
  const imageRef = ref(storage, `images/${name}`);
  const productRef = doc(db, 'products', id);
  await deleteObject(imageRef);
  await deleteDoc(productRef);
}
async function authOperation(authFunction) {
  const userCredential = await authFunction();
  const user = userCredential.user;
  return user;
}

function createUsername(email) {
  return email.split('@')[0];
}
