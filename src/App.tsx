import './App.scss';
import { routes } from './routes';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route, index) => {
                    const Page = route.component;
                    return <Route key={index} path={route.path} element={<Page />} />;
                })}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
