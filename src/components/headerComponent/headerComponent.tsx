import { useState } from "react";

import {
    Typography,
    Toolbar,
    ToggleButtonGroup,
    ToggleButton,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";

import { useTranslation } from "react-i18next";

const HeaderComponent = () => {
    const [language, setLanguage] = useState<"en" | "de">("en");
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (
        event: React.MouseEvent<HTMLElement>,
        newLanguage: "en" | "de"
    ) => {
        if (!newLanguage) return;
        setLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
    };

    return (
        <AppBar color="primary" position="sticky">
            <Toolbar>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    {t("header.label")}
                </Typography>
                <ToggleButtonGroup
                    color="error"
                    value={language}
                    exclusive
                    onChange={handleLanguageChange}
                    aria-label="Platform"
                    sx={{ backgroundColor: "white" }}
                >
                    <ToggleButton value="en">En</ToggleButton>
                    <ToggleButton value="de">De</ToggleButton>
                </ToggleButtonGroup>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderComponent;
