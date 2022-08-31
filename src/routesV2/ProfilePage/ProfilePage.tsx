import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../../components/Buttons/LogoutButton';

export default function ProfilePage() {
  const { user } = useAuth0();

  if (!user) {
    return null;
  }

  return (
    <div>
      <div>
        <LogoutButton />
      </div>
      <h1 id="page-title" className="content__title">
        Profile Page
      </h1>
      You can use the <strong>ID Token</strong> to get the profile information of an authenticated
      user.
      <strong>Only authenticated users can access this page.</strong>
      <img src={user.picture} alt="Profile" className="profile__avatar" />
      <h2 className="profile__title">User Name: {user.name}</h2>
      <span className="profile__description">User Email: {user.email}</span>
      <span> Code : {JSON.stringify(user, null, 2)}</span>
    </div>
  );
}
