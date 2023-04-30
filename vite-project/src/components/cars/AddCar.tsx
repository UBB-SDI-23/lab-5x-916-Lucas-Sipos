import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Cars } from "../../models/Cars";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const AddCar = () => {
    const navigate = useNavigate();

    const [car, setCar] = useState<Cars>({
        model: "",
        year: 2000,
        fuel_type: "",
        cc: "",
        hp: 0,
        transmission_type: "",
    });

    const addCar = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.post(`${BACKEND_API_URL}cars/`, car, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate("/cars");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/cars`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={addCar}>

                        <TextField
                            id="model"
                            label="Model"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setCar({...car, model: event.target.value})}
                        />

                        <TextField
                            id="year"
                            label="Year"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setCar({...car, year: +event.target.value})}
                        />

                        <TextField
                            id="fuel_type"
                            label="Fuel Type (G, D, BD, E)"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setCar({...car, fuel_type: event.target.value})}
                        />

                        <TextField
                            id="cc"
                            label="CC"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setCar({...car, cc: event.target.value})}
                        />

                        <TextField
                            id="hp"
                            label="HP"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setCar({...car, hp: +event.target.value})}
                        />

                        <TextField
                            id="transmission_type"
                            label="Transmission Type (M, A, C)"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setCar({...car, transmission_type: event.target.value})}
                        />

                        <Button type="submit">Add Cars</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};