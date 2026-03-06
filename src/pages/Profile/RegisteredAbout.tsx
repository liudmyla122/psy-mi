import { Sidebar } from '../../layout';
import { ProfileLanding } from './ProfileLanding';
import './Profile.css';

export function RegisteredAbout() {
  return (
    <div className="profile-page">
      <Sidebar />
      <main className="profile-main">
        <div className="profile-container">
          <ProfileLanding />
        </div>
      </main>
    </div>
  );
}
