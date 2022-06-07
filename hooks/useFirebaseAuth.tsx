import { useCallback } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { auth } from "../common/config/firebase";

interface CreateUserPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export const useFirebaseAuth = () => {
  const signInLocal = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const createLocalUser = useCallback(
    async ({
      firstName,
      lastName,
      email,
      password,
    }: CreateUserPayload): Promise<User> => {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      // await sendEmailVerification(user);
      return user;
    },
    []
  );

  const signOutUser = useCallback(async () => {
    await signOut(auth);
  }, []);

  return {
    createLocalUser,
    signInLocal,
    signOutUser,
  };
};
