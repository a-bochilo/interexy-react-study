import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

import ArticleCard, { IArticleData } from "../articleCard/articleCard";

const ArticlesPage = () => {
    const { t } = useTranslation();
    const articlesArray: IArticleData[] = t("articles", {
        returnObjects: true,
    });

    return (
        <Grid
            container
            spacing={2}
            p={1}
            sx={{ justifyContent: "space-evenly" }}
        >
            {articlesArray.map(
                ({
                    id,
                    title,
                    text,
                }: {
                    id: string;
                    title: string;
                    text: string;
                }) => (
                    <Grid item key={id}>
                        <ArticleCard title={title} text={text} />
                    </Grid>
                )
            )}
        </Grid>
    );
};

export default ArticlesPage;
