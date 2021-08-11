import { InjectionToken, Injector } from '@brandingbrand/fslinker';
import React, { createContext, FC, useRef } from 'react';
import { InjectedContextProvider } from '../../lib/use-dependency';
import type { FSRouterHistory } from '../history';
import { dummyHistory } from '../history/history.dummy';

export const NavigatorContext = createContext<FSRouterHistory>(dummyHistory);
export const NAVIGATOR_CONTEXT_TOKEN = new InjectionToken<typeof NavigatorContext>(
  'NAVIGATOR_CONTEXT_TOKEN'
);

export const NAVIGATOR_TOKEN = new InjectionToken<FSRouterHistory>('NAVIGATOR');
export const useNavigator = () => {
  const ref = useRef<FSRouterHistory>();
  if (!ref.current) {
    ref.current = Injector.require(NAVIGATOR_TOKEN);
  }

  return ref.current;
};

export interface NavigatorProviderProps {
  value: FSRouterHistory;
}
export const NavigatorProvider: FC<NavigatorProviderProps> = ({ value, children }) => (
  <InjectedContextProvider token={NAVIGATOR_CONTEXT_TOKEN} value={value} children={children} />
);
