import { Card, CardContent, Typography } from "@mui/material";

export interface IArticleData {
    id: string;
    title: string;
    text: string;
}

const ArticleCard = ({ title, text }: Omit<IArticleData, "id">) => {
    return (
        <Card sx={{ width: 400, backgroundColor: "lightgreen" }}>
            <CardContent>
                <Typography variant="h5" component="p">
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ mb: 1.5 }}
                    color="text.secondary"
                >
                    {text}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ArticleCard;
