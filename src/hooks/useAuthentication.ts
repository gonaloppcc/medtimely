import React from 'react';
import {AuthenticatedUserContext} from '../providers/AuthProvider';

export function useAuthentication() {
  return React.useContext(AuthenticatedUserContext)
}
