import { Route, Routes } from "react-router-dom";

import Layout from "../components/layout/layout";
import ArticlesOrAnimationsPage from "../components/pages/articlesOrAnimationsPage";
import CharactersPage from "../components/pages/charactersPage";
import SingleCharcterPage from "../components/pages/singleCharacterPage";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route
                    path="/"
                    element={<ArticlesOrAnimationsPage page="articles" />}
                />
                <Route
                    path="/animations"
                    element={<ArticlesOrAnimationsPage page="animations" />}
                />
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
