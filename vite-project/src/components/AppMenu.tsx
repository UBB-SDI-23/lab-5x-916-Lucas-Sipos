import {Box, AppBar, Toolbar, IconButton, Typography, Button, Container} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import CarIcon from "@mui/icons-material/CarRental";
import Car from "@mui/icons-material/CarRentalRounded";
import {AllCars} from "./cars/AllCars";
import {useState} from "react";
import {Star} from "@mui/icons-material";
import {Statistic1} from "./statistics/Statistic1";

export const AppMenu = () => {
    const location = useLocation();
    const path = location.pathname;

    return (
        <Container>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static" sx={{marginBottom: "20px"}}>
                    <Toolbar sx={{display: 'flex'}}>
                        <IconButton
                            component={Link}
                            to="/"
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="school"
                            sx={{mr: 2}}>
                            <CarIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{mr: 5}}>
                            Car management
                        </Typography>
                        <Button
                            variant={path.startsWith("/cars") ? "outlined" : "text"}
                            to="/cars"
                            component={Link}
                            color="inherit"
                            sx={{mr: 5, justifyContent: 'right'}}
                            startIcon={<Car/>}
                            style={{ marginLeft: 'auto' }}
                        >
                            Cars
                        </Button>
                    </Toolbar>
                </AppBar>
                <AppBar position="static" sx={{marginBottom: "20px"}}>
                    <Toolbar sx={{display: 'flex'}}>
                        <IconButton
                            component={Link}
                            to="/"
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="school"
                            sx={{mr: 2}}>
                            <CarIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{mr: 5}}>
                            Buyer management
                        </Typography>
                        <Button
                            variant={path.startsWith("/buyers") ? "outlined" : "text"}
                            to="/buyers"
                            component={Link}
                            color="inherit"
                            sx={{mr: 5}}
                            startIcon={<Car/>}
                            style={{ marginLeft: 'auto' }}
                        >
                            Buyers
                        </Button>
                    </Toolbar>
                </AppBar>
                <AppBar position="static" sx={{marginBottom: "20px"}}>
                    <Toolbar sx={{display: 'flex'}}>
                        <IconButton
                            component={Link}
                            to="/"
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="school"
                            sx={{mr: 2}}>
                            <CarIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{mr: 5}}>
                            Delivery management
                        </Typography>
                        <Button
                            variant={path.startsWith("/delivs") ? "outlined" : "text"}
                            to="/delivs"
                            component={Link}
                            color="inherit"
                            sx={{mr: 5}}
                            startIcon={<Car/>}
                             style={{ marginLeft: 'auto' }}
                       >
                            Deliveries
                        </Button>
                    </Toolbar>
                </AppBar>
                <AppBar position="static" sx={{marginBottom: "20px"}}>
                    <Toolbar sx={{display: 'flex'}}>
                        <IconButton
                            component={Link}
                            to="/"
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="school"
                            sx={{mr: 2}}>
                            <CarIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{mr: 5}}>
                            Company management
                        </Typography>
                        <Button
                            variant={path.startsWith("/company") ? "outlined" : "text"}
                            to="/company"
                            component={Link}
                            color="inherit"
                            sx={{mr: 5}}
                            startIcon={<Car/>}
                            style={{ marginLeft: 'auto' }}
                        >
                            Companies
                        </Button>
                    </Toolbar>
                </AppBar>
                <AppBar position="static" sx={{marginBottom: "20px"}}>
                    <Toolbar sx={{display: 'flex'}}>
                        <IconButton
                            component={Link}
                            to="/"
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="school"
                            sx={{mr: 2}}>
                            <Star/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{mr: 5}}>
                            Statistics
                        </Typography>
                        <Button
                            variant={path.startsWith("/statistics/1") ? "outlined" : "text"}
                            to="/statistics/1"
                            component={Link}
                            color="inherit"
                            sx={{mr: 5}}
                            startIcon={<Star/>}
                            style={{ marginLeft: 'auto' }}
                        >
                            Statistics
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </Container>
    );
};