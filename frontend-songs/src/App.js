// import MyHeader  from './components/MyHeader'
// import { useContext } from 'react'
import { BrowserRouter,Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './utils/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Artist from './pages/Artist'
import Album from './pages/Album'
import Song from './pages/Song'
import NotFound from './pages/NotFound'
import RootLayout from './layouts/RootLayout';


function App() {
  return ( 
     <BrowserRouter>
      <AuthProvider>
          <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
              <Route path="/Artist" element={<Artist />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path='*' element={<NotFound/>}/>
              <Route element={<ProtectedRoute/>}> 
              <Route path="/Album" element={<Album />} />
              <Route path="/Song" element={<Song />} />
              </Route> 
              </Route>
          </Routes>
      </AuthProvider>
   
  </BrowserRouter>
  )
}

export default App;
