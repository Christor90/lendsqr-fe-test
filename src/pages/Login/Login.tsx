import { LoginForm } from '../../components/feature/LoginForm/LoginForm';
import styles from './Login.module.scss';

export const Login: React.FC = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.leftSection}>
        <div className={styles.logoContainer}>
          <img src="/logo.svg" alt="Lendsqr Logo" className={styles.logo} />
        </div>
        <div className={styles.illustrationContainer}>
          <img
            src="/sign-img.svg"
            alt="Login Illustration"
            className={styles.illustration}
          />
        </div>
      </div>

      <div className={styles.rightSection}>
        <LoginForm />
      </div>
    </div>
  );
};
