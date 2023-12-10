import React from 'react';
import { AuthenticatedUserContext } from '../providers/AuthProvider';

export function useAuthentication() {
  const user = React.useContext(AuthenticatedUserContext)

  return user
}
