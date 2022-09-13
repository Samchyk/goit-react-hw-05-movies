import Navigation from '../Navigation/Navigation';
import s from './Appbar.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './../Button/Button';


export default function Appbar() {
    const location = useLocation();
   const navigate = useNavigate();
   const clickGoBack = () => {
      if (location.state ? location.state.from : '/') {
         navigate(-1);
      } else {
         navigate('/', { replace: true });
      }
   };

   return (
      <header className={s.header}>
         <Navigation />
         <div className={s.btn}>
            <Button onClick={clickGoBack} title="Go back" />
         </div>
      </header>
   );
}
