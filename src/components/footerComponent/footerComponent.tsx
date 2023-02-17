import { AppBar, Typography, Toolbar } from "@mui/material";
import { useTranslation } from "react-i18next";

const FooterComponent = () => {
    const { t } = useTranslation();

    return (
        <AppBar component={"footer"} sx={{ bottom: 0, position: "relative" }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {t("footer.label")}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default FooterComponent;
