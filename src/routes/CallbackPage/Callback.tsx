import { useAuth0 } from '@auth0/auth0-react';

export default function Callback() {
  const { error } = useAuth0();

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
      CALLBACK PAGEEE
      <div className="page-layout__content" />
    </div>
  );
}
