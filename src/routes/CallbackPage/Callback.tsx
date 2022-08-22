import { useAuth0 } from '@auth0/auth0-react';
import ResponsiveAppBar from '../BlogPage/BlogForm/Elements/BasicUserResponsiveBar';

export default function Callback() {
  const { getAccessTokenSilently } = useAuth0();

  const accessToken = getAccessTokenSilently();

  const { error } = useAuth0();
  console.log('accessToken', accessToken);
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

  return (
    <div className="page-layout">
      <ResponsiveAppBar />
      CALLBACK PAGEEE
    </div>
  );
}
