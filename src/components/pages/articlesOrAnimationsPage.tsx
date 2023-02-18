import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

import ArticleCard, { IArticleData } from "../articleCard/articleCard";
import AnimationCard, {
    AnimationCardProps,
} from "../animationCard/animationCard";

interface IArticlesOrAnimationsPageProps {
    page: "articles" | "animations";
}

const ArticlesOrAnimationsPage = ({ page }: IArticlesOrAnimationsPageProps) => {
    const { t } = useTranslation();

    const renderAnimations = () => {
        const animations: AnimationCardProps[] = ["css", "interval", "raf"];
        return animations.map((animationType) => (
            <Grid item key={animationType}>
                <AnimationCard id={animationType} />
            </Grid>
        ));
    };

    const renderArticles = () => {
        const articlesArray: IArticleData[] = t("articles", {
            returnObjects: true,
        });
        return articlesArray.map(({ id, title, text }: IArticleData) => (
            <Grid item key={id}>
                <ArticleCard title={title} text={text} />
            </Grid>
        ));
    };

    return (
        <Grid
            container
            spacing={2}
            p={1}
            sx={{ justifyContent: "space-evenly" }}
        >
            {page === "animations" ? renderAnimations() : renderArticles()}
        </Grid>
    );
};

export default ArticlesOrAnimationsPage;
