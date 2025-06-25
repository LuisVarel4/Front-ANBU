import { createContext, type JSX, type ReactNode, useContext } from "react";

type ProviderComponent<T> = ({
  children,
  value,
}: {
  children: ReactNode;
  value: T;
}) => JSX.Element;

/**
 * @template T - Tipo de datos que manejará el contexto.
 * @param errorMessage - Mensaje de error cuando el contexto es usado fuera del provider.
 * @returns {[React.FC<{ value: T; children: React.ReactNode }>, () => T]} - Componente Provider y hook de acceso seguro.
 */
export const createSafeContext = <T,>(
  errorMessage: string,
): [ProviderComponent<T>, () => T] => {
  const Context = createContext<T | undefined>(undefined);

  const useSafeContext = (): T => {
    const ctx = useContext(Context);
    if (ctx === undefined) {
      throw new Error(errorMessage);
    }
    return ctx;
  };

  const Provider: ProviderComponent<T> = ({ children, value }) => (
    <Context.Provider value={value}>{children}</Context.Provider>
  );

  return [Provider, useSafeContext];
};
