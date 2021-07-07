import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory();

  const newPassInputRef = useRef();
  const { token } = useContext(AuthContext);

  const handleSubmit = e => {
    e.preventDefault();

    const enteredPassword = newPassInputRef.current.value;

    (async () => {
      try {
        const res = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBmAnCA4j13haVsbIGKS8SS6uFr3jhbYGA',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              idToken: token,
              password: enteredPassword,
              returnSecureToken: false,
            }),
          }
        );
        if (!res.ok) throw new Error('Error changing password');

        history.replace('/');
      } catch (err) {
        console.error(err);
      }
    })();
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input ref={newPassInputRef} type="password" id="new-password" />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
