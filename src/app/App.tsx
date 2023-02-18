import { Route, Routes } from "react-router-dom";

import Layout from "../components/layout/layout";
import AnimationsPage from "../components/pages/animationsPage";
import ArticlesPage from "../components/pages/articlesPage";
import CharactersPage from "../components/pages/charactersPage";
import ChartsPage from "../components/pages/chartsPage";
import SingleCharcterPage from "../components/pages/singleCharacterPage";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<ArticlesPage />} />
                <Route path="/animations" element={<AnimationsPage />} />
                <Route path="/charts" element={<ChartsPage />} />
                <Route path="/characters" element={<CharactersPage />} />
                <Route
                    path="/characters/:id"
                    element={<SingleCharcterPage />}
                />
            </Route>
        </Routes>
    );
}

export default App;
