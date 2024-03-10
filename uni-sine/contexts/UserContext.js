import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import { useUser } from "@auth0/nextjs-auth0/client";

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export const UserProviderWrapper = ({ children }) => {
  const [customUser, setCustomUser] = useState(null);
  const [isFetchingCustomUser, setIsFetchingCustomUser] = useState(true);

  const { user: authUser, isLoading: isAuthLoading } = useUser();


  const fetchUser = useCallback(debounce(async () => {
    if (authUser) {
      setIsFetchingCustomUser(true); // Indicate custom user fetching starts
      try {
        const response = await fetch(`/api/auth0/auth0-user`);
        const data = await response.json();
        setCustomUser(data);
      } catch (error) {
        console.error("Error fetching custom user data:", error);
      } finally {
        setIsFetchingCustomUser(false); // Indicate custom user fetching ends
      }
    } else {
      // If no authUser, no fetching is required, and custom user data should be cleared
      setCustomUser(null);
      setIsFetchingCustomUser(false); // Reset since there's no authUser to fetch data for
    }
  }, 5000,  { leading: true, trailing: false }), [authUser]); 

  useEffect(() => {
    fetchUser();
    // Cleanup function to cancel the debounce on component unmount
    return fetchUser.cancel;
  }, [fetchUser]);

  const isLoading = isAuthLoading || isFetchingCustomUser;

  return (
    <UserContext.Provider value={{ user: customUser, isLoading, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
