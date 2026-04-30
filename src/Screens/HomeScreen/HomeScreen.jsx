import React, { useContext } from 'react';
import './homescreen.css';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import homefood from '../../assets/images/homefood.jpg';
import RecipeItemsScreen from '../RecipeItemsScreen/RecipeItemsScreen';

function HomeScreen() {
    const navigate = useNavigate();
    const { isLogged, openLoginModal } = useContext(AuthContext);

    const handleCrearReceta = () => {
        if (isLogged) {
            navigate('/agregarReceta');
        } else {
            openLoginModal();
        }
    };

    return (
        <>
            <div className='home-wrapper'>
                <section className='home'>
                    <div className='home-left'>
                        <h1>Recetas</h1>
                        <h5>Compartí tu receta favorita</h5>
                        <button onClick={handleCrearReceta}>Crear receta</button>
                    </div>
                    <div className='home-right'>
                        <img src={homefood} alt="Home Food" />
                    </div>
                </section>
                <div className="wave-container">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none"><path fill="#a2d9ff" fill-opacity="0.7" d="M0,32L80,64C160,96,320,160,480,197.3C640,235,800,245,960,213.3C1120,181,1280,107,1360,69.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
                </div>
            </div>
            <RecipeItemsScreen mineOnly={true} />
        </>
    );
}

export default HomeScreen;