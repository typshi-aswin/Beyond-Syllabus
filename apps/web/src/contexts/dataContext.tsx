"use client";
import { useGetDirectoryStructure } from "@/hooks/query";
import { createContext, useContext, useEffect } from "react";

type DataContextType = {
  data: any;
  isFetching: boolean;
  isError: boolean;
  error: any;
};

const DataContext = createContext<DataContextType>({} as DataContextType);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, refetch, isFetching, isError, error } =
    useGetDirectoryStructure();
  useEffect(() => {
    refetch();
  }, []);

  return (
    <DataContext.Provider value={{ data, isFetching, isError, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
