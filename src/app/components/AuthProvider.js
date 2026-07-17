"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as fbSignOut } from 'firebase/auth';
import { auth } from '../lib/firebase/firebase';
// import { auth, isFirebaseConfigured } from '../lib/firebase/client';

const AuthContext = createContext({ user: null, loading: true,  });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ( !auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // const login = async (email, password) => {
  //   if (!auth) throw new Error('Firebase not configured');
  //   return signInWithEmailAndPassword(auth, email, password);
  // };

  const login = async (email, password) => {

      if (!auth) {
          throw new Error(
              "Firebase not configured"
          );
      }


      const credential =
          await signInWithEmailAndPassword(
              auth,
              email,
              password
          );


      return credential.user;

  };

  const register = async (email, password) => {

      if (!auth) {
          throw new Error(
              "Firebase not configured"
          );
      }


      const credential =
          await createUserWithEmailAndPassword(
              auth,
              email,
              password
          );


      return credential.user;

  };

  const signOut = async () => {
    if (!auth) return;
    return fbSignOut(auth);
  };

  const getToken = async () => {
    if (!auth?.currentUser) return null;
    return auth.currentUser.getIdToken();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, signOut, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
