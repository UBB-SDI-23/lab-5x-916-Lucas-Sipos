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
    const [state, setState] = useState(0);

    return (
        <Container>
            {state === 0 && (
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static" sx={{marginBottom: "20px"}}>
                        <Toolbar>
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
                                // variant={path.startsWith("/cars") ? "outlined" : "text"}
                                to="/"
                                component={Link}
                                color="inherit"
                                sx={{mr: 5}}
                                startIcon={<Car/>}
                                onClick={() => setState(1)}
                            >
                                Cars
                            </Button>
                        </Toolbar>
                        <Toolbar>
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
                                Statistics:
                            </Typography>
                            <Button
                                // variant={path.startsWith("/statistics/1/") ? "outlined" : "text"}
                                to="/"
                                component={Link}
                                color="inherit"
                                sx={{mr: 5}}
                                startIcon={<Star/>}
                                onClick={() => setState(2)}
                            >
                                Statistics
                            </Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            )}
            {state === 1 && (
                <><Button
                    to="/"
                    component={Link}
                    color="inherit"
                    sx={{mr: 5}}
                    startIcon={<Car/>}
                    onClick={() => setState(0)}
                >
                    Back
                </Button><AllCars/></>
            )}
            {state === 2 && (
                <><Button
                    to="/"
                    component={Link}
                    color="inherit"
                    sx={{mr: 5}}
                    startIcon={<Car/>}
                    onClick={() => setState(0)}
                >
                    Back
                </Button><Statistic1/></>
            )}
        </Container>
    );
};