import { useAuth0 } from '@auth0/auth0-react';

export default function Callback() {
  const { getAccessTokenSilently, getIdTokenClaims, user } = useAuth0();

  const accessToken = getAccessTokenSilently();

  const idTokenClaims = getIdTokenClaims();

  const { error } = useAuth0();
  console.log('accessToken', accessToken);
  console.log('id token claims', idTokenClaims);
  console.log('user', user);

  if (error) {
    return (
      <div>
        <div className="content-layout">
          <h1 id="page-title" className="content__title">
            Error
          </h1>
          <div className="content__body">
            <p id="page-description">
              <span>{error.message}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <div className="page-layout">CALLBACK PAGEEE</div>;
}
