import * as React from "react";
import { NavLink } from "react-router-dom";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer, { DrawerProps } from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
    List,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";

interface IDrawerProps extends DrawerProps {
    openedSideBarWidth: number;
    closedSideBarWidth: number;
}

const openedMixin = (theme: Theme, sideBarWidth: number): CSSObject => ({
    width: sideBarWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme, sideBarWidth: number): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: sideBarWidth,
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "red",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => {
        switch (prop) {
            case "isSideBarOpen":
            case "openedSideBarWidth":
            case "closedSideBarWidth":
                return false;
            default:
                return true;
        }
    },
})<IDrawerProps>(({ theme, open, openedSideBarWidth, closedSideBarWidth }) => ({
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme, openedSideBarWidth),
        "& .MuiDrawer-paper": openedMixin(theme, openedSideBarWidth),
    }),
    ...(!open && {
        ...closedMixin(theme, closedSideBarWidth),
        "& .MuiDrawer-paper": closedMixin(theme, closedSideBarWidth),
    }),
}));

interface ISideBarProps {
    isSideBarOpen: boolean;
    openedSideBarWidth: number;
    closedSideBarWidth: number;
    setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar = ({
    isSideBarOpen,
    openedSideBarWidth,
    closedSideBarWidth,
    setIsSideBarOpen,
}: ISideBarProps) => {
    const handleSideBarOpen = () => {
        setIsSideBarOpen(true);
    };

    const handleSideBarClose = () => {
        setIsSideBarOpen(false);
    };

    return (
        <Drawer
            variant="permanent"
            open={isSideBarOpen}
            openedSideBarWidth={openedSideBarWidth}
            closedSideBarWidth={closedSideBarWidth}
        >
            <DrawerHeader>
                {isSideBarOpen ? (
                    <IconButton onClick={handleSideBarClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                ) : (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleSideBarOpen}
                        edge="start"
                    >
                        <MenuIcon />
                    </IconButton>
                )}
            </DrawerHeader>
            <List sx={{ backgroundColor: "red", height: "100%" }}>
                {[
                    { label: "Home", url: "/" },
                    { label: "Characters", url: "/characters" },
                ].map(({ label, url }) => (
                    <ListItem
                        key={label}
                        disablePadding
                        sx={{ display: isSideBarOpen ? "block" : "none" }}
                    >
                        <NavLink to={url}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                }}
                            >
                                <ListItemText primary={label} />
                            </ListItemButton>
                        </NavLink>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default SideBar;
