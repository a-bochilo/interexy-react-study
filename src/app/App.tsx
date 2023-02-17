import { Route, Routes } from "react-router-dom";

import Layout from "../components/layout/layout";
import ArticlesPage from "../components/pages/articlesPage";
import CharactersPage from "../components/pages/charactersPage";
import SingleCharcterPage from "../components/pages/singleCharacterPage";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<ArticlesPage />} />
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
