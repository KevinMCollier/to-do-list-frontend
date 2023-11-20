import { createContext, useState, ReactNode } from 'react';
import { User } from '../types/User'; // Import the User interface

type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
