import { useState } from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";

import FooterComponent from "../footerComponent/footerComponent";
import HeaderComponent from "../headerComponent/headerComponent";
import SideBar from "../sideBar/sideBar";
import AsideComponent from "../asideComponent/asideComponent";
import GridContentContainer from "../gridContentContainer/gridContentContainer";

const Layout = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
    const openedSideBarWidth = 240;
    const closedSideBarWidth = 50;

    return (
        <Grid container sx={{ flexGrow: 1 }}>
            <SideBar
                isSideBarOpen={isSideBarOpen}
                openedSideBarWidth={openedSideBarWidth}
                closedSideBarWidth={closedSideBarWidth}
                setIsSideBarOpen={setIsSideBarOpen}
            />
            <GridContentContainer
                item
                isSideBarOpen={isSideBarOpen}
                openedSideBarWidth={openedSideBarWidth}
                closedSideBarWidth={closedSideBarWidth}
            >
                <HeaderComponent />
                <Grid container spacing={1}>
                    <Grid item xs={10} className="outlet_container">
                        <Outlet />
                    </Grid>
                    <Grid item xs={2} className="aside_container">
                        <AsideComponent />
                    </Grid>
                </Grid>
                <FooterComponent />
            </GridContentContainer>
        </Grid>
    );
};

export default Layout;
