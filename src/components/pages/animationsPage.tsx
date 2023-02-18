import { Grid } from "@mui/material";

import AnimationCard, {
    AnimationCardProps,
} from "../animationCard/animationCard";

const AnimationsPage = () => {
    const animations: AnimationCardProps[] = ["css", "interval", "raf"];

    return (
        <Grid
            container
            spacing={2}
            p={1}
            sx={{ justifyContent: "space-evenly" }}
        >
            {animations.map((animationType) => (
                <Grid item key={animationType}>
                    <AnimationCard id={animationType} />
                </Grid>
            ))}
        </Grid>
    );
};

export default AnimationsPage;
