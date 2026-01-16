'use client';

import React, { useState, useEffect, type ReactNode } from 'react';
import { FirebaseProvider, type FirebaseContextType } from './provider';
import { initializeFirebase } from './index';

type FirebaseClientProviderProps = {
  children: ReactNode;
};

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const [firebase, setFirebase] = useState<FirebaseContextType | null>(null);

  useEffect(() => {
    const { app, auth, firestore } = initializeFirebase();
    setFirebase({ app, auth, firestore });
  }, []);

  if (!firebase) {
    // You can render a loading state here if needed
    return null;
  }

  return <FirebaseProvider {...firebase}>{children}</FirebaseProvider>;
}
