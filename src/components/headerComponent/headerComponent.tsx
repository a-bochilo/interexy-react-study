import { Typography, Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";

const HeaderComponent = () => {
    return (
        <AppBar color="primary" position="sticky">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Interexy react study project
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderComponent;
