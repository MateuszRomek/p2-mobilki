import { auth } from "./firebase";

class ApiFetcher {
  get<T extends any>(endpoint: string): Promise<T> {
    if (!auth.currentUser) {
      return new Promise((r, reject) => reject("No user"));
    }

    return auth.currentUser
      .getIdToken()
      .then((userToken) => {
        const header = {
          authorization: `Bearer ${userToken}`,
        };
        return fetch(`https://carrentalwebapi.azurewebsites.net/${endpoint}`, {
          headers: {
            ...header,
          },
        })
          .then((response) => response.json())

          .catch(console.error);
      })
      .catch(console.error);
  }
  delete(endpoint: string) {
    if (!auth.currentUser) {
      return new Promise((r, reject) => reject("No user"));
    }

    return auth.currentUser
      ?.getIdToken()
      .then((userToken) => {
        const header = {
          authorization: `Bearer ${userToken}`,
        };
        return fetch(`https://carrentalwebapi.azurewebsites.net/${endpoint}`, {
          headers: {
            ...header,
          },
          method: "DELETE",
        });
      })

      .catch(console.error);
  }

  post(endpoint: string, data: any) {
    if (!auth.currentUser) {
      return new Promise((r, reject) => reject("No user"));
    }

    return auth.currentUser
      ?.getIdToken()
      .then((userToken) => {
        const header = {
          authorization: `Bearer ${userToken}`,
        };
        return fetch(`https://carrentalwebapi.azurewebsites.net/${endpoint}`, {
          headers: {
            ...header,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          method: "POST",
        });
      })
      .catch(console.error);
  }
}

export const apiFetcher = new ApiFetcher();
