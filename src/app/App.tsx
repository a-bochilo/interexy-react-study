import { Route, Routes } from "react-router-dom";

import Layout from "../components/layout/layout";
import ArticlesLayout from "../components/pages/articlesLayout";
import CharactersLayout from "../components/pages/charactersLayout";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<ArticlesLayout />} />
                <Route path="/characters" element={<CharactersLayout />} />
            </Route>
        </Routes>
    );
}

export default App;
