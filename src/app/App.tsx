import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { CircularProgress } from "@mui/material";
import Layout from "../components/layout/layout";
const AnimationsPage = lazy(() => import("../components/pages/animationsPage"));
const ArticlesPage = lazy(() => import("../components/pages/articlesPage"));
const CharactersPage = lazy(() => import("../components/pages/charactersPage"));
const ChartsPage = lazy(() => import("../components/pages/chartsPage"));
const SingleCharcterPage = lazy(
    () => import("../components/pages/singleCharacterPage")
);

function App() {
    return (
        <Suspense fallback={<CircularProgress />}>
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
        </Suspense>
    );
}

export default App;
