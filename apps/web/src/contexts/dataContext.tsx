"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { orpc } from "@/lib/orpc";

type DataContextType = {
  data: any;
  isFetching: boolean;
  isError: boolean;
  error: any;
};

const DataContext = createContext<DataContextType>({} as DataContextType);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    setIsFetching(true);
    setIsError(false);
    setError(null);
    try {
      const result = await orpc.syllabus.call();
      setData(result);
    } catch (err: any) {
      setIsError(true);
      setError(err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, isFetching, isError, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
