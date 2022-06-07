import { useEffect } from "react";
import { auth } from "../common/config/firebase";
import {
  UserContextActions,
  useUserContext,
} from "../common/context/userContext";

export const useOnAuthChange = () => {
  const { dispatch } = useUserContext();

  useEffect(() => {
    dispatch({ type: UserContextActions.SetLoading, payload: "pending" });

    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser) {
        dispatch({ type: UserContextActions.SignOutUser });

        return;
      }

      dispatch({
        type: UserContextActions.SignInUser,
        payload: {
          displayName: firebaseUser.displayName ?? "",
          email: firebaseUser.email as string,
          uid: firebaseUser.uid,
          isEmailVerified: firebaseUser.emailVerified,
        },
      });
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);
};
