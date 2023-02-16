import { Card, CardContent, Typography } from "@mui/material";

const ArticleCard = () => {
    return (
        <Card sx={{ width: 400, backgroundColor: "lightgreen" }}>
            <CardContent>
                <Typography variant="h5" component="p">
                    Article
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ mb: 1.5 }}
                    color="text.secondary"
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Necessitatibus reprehenderit delectus maiores autem aut
                    nostrum optio, aliquid possimus rem vitae fugit iusto,
                    eveniet magni alias nemo eos magnam, iste doloremque culpa
                    quasi. Quidem accusantium minus facere iusto maiores nobis
                    perspiciatis excepturi sapiente accusamus ad voluptatibus
                    fugit inventore debitis, ducimus placeat.
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ArticleCard;
