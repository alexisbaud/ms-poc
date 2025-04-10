import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { logoutUser } from '../../features/auth/authThunks';
import Button from '../../components/atoms/Button/Button';
import NavBar from '../../components/molecules/NavBar/NavBar';
import './Profile.css';

const Profile = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/auth');
  };

  const handleNavigation = (pageId) => {
    if (pageId === 'home') {
      navigate('/home');
    } else if (pageId === 'create') {
      navigate('/create');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profil</h1>
        <p>Informations de votre compte</p>
      </div>

      <div className="profile-content">
        <div className="profile-info-section">
          <h2>Informations personnelles</h2>
          <div className="profile-info-item">
            <span className="profile-info-label">Pseudonyme</span>
            <span className="profile-info-value">{user?.pseudo}</span>
          </div>
          <div className="profile-info-item">
            <span className="profile-info-label">Email</span>
            <span className="profile-info-value">{user?.email}</span>
          </div>
        </div>

        <div className="profile-actions">
          <Button
            style="danger"
            importance="toned"
            size="md"
            onClick={handleLogout}
          >
            Se déconnecter
          </Button>
        </div>
      </div>
      
      {/* NavBar with only Home navigation enabled */}
      <NavBar 
        activePage="profile" 
        onNavigate={handleNavigation} 
      />
    </div>
  );
};

export default Profile; 