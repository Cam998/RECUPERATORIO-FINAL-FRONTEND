import React from 'react';
import { Route, Routes, Link } from 'react-router';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import AddFoodRecipe from './Screens/AddFoodRecipe/AddFoodRecipe';
import EditFoodRecipe from './Screens/EditFoodRecipe/EditFoodRecipe';
import MainNavigation from './Components/MainNavigation/MainNavigation';
import RecipeItemsScreen from './Screens/RecipeItemsScreen/RecipeItemsScreen';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainNavigation />}>
        <Route index element={<HomeScreen />} />
        <Route path='home' element={<HomeScreen />} />
        <Route path='/miReceta' element={
          <div style={{ padding: '3rem 0', maxWidth: '1180px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', padding: '0 1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ color: '#213547', fontSize: '2rem', margin: 0 }}>Mis Recetas</h2>
              <Link to='/agregarReceta' style={{ padding: '0.6rem 1.2rem', backgroundColor: '#3182ce', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: '500', transition: 'background-color 0.3s' }}>
                + Agregar receta
              </Link>
            </div>
            <RecipeItemsScreen mineOnly={true} showEmptyMessage={true} allowDelete={true} />
          </div>
        } />
        <Route path='/favReceta' element={
          <div style={{ padding: '3rem 0', maxWidth: '1180px', margin: '0 auto' }}>
            <h2 style={{ color: '#213547', fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', padding: '0 1.5rem' }}>Recetas Favoritas</h2>
            <RecipeItemsScreen favoritesOnly={true} showEmptyMessage={true} />
          </div>
        } />
        <Route path='/agregarReceta' element={<AddFoodRecipe />} />
        <Route path='/editarReceta/:id' element={<EditFoodRecipe />} />
      </Route>
    </Routes>
  )
};

export default App;
