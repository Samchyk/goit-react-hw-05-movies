import Navigation from '../Navigation/Navigation';
import s from './Appbar.module.css';
import { useNavigate} from 'react-router-dom';
import Button from './../Button/Button';


export default function Appbar() {
   const navigate = useNavigate();
   const clickGoBack = () => {
       if (window.history.state && window.history.state.idx > 0) {
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
