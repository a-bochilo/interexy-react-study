import { Grid } from "@mui/material";
import ArticleCard from "../articleCard/articleCard";

const ArticlesLayout = () => {
    return (
        <Grid
            container
            spacing={2}
            p={1}
            sx={{ justifyContent: "space-evenly" }}
        >
            <Grid item>
                <ArticleCard />
            </Grid>
            <Grid item>
                <ArticleCard />
            </Grid>
            <Grid item>
                <ArticleCard />
            </Grid>
            <Grid item>
                <ArticleCard />
            </Grid>
            <Grid item>
                <ArticleCard />
            </Grid>
        </Grid>
    );
};

export default ArticlesLayout;
