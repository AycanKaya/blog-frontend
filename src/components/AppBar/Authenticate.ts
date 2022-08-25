import { useEffect, useState } from 'react';
import { get } from '../../api/axios';

const Authenticate = () => {
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  function requestForAuthenticate() {
    get('/Account/isValid').then((response) => {
      if (response.succeeded) setIsAuthenticate(true);
    });
  }

  useEffect(() => {
    requestForAuthenticate();
  });

  return { isAuthenticate, setIsAuthenticate };
};
export default Authenticate;
