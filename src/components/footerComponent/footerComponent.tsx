import { AppBar, Typography, Toolbar } from "@mui/material";

const FooterComponent = () => {
    return (
        <AppBar component={"footer"} sx={{ bottom: 0, position: "relative" }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Footer
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default FooterComponent;
