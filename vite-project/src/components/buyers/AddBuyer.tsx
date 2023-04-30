import {Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField} from "@mui/material";
import {Container} from "@mui/system";
import {useCallback, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {BACKEND_API_URL} from "../../constants";
import {Buyers} from "../../models/Buyers";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import {Cars} from "../../models/Cars";
import {debounce} from "lodash";

export const AddBuyer = () => {
    const navigate = useNavigate();

    const [buyer, setBuyer] = useState<Buyers>({
        first_name: "",
        last_name: "",
        age: 0,
        sex: "M",
        car: -1,
    });
    const [cars, setCars] = useState<Cars[]>([]);
    const fetchSuggestions = async (query: string) => {
        try {
            let url = `${BACKEND_API_URL}/cars/${query}`;
            await fetch(url).then(async (response) => {
                const jsn = await response.json();
                setCars(jsn);
            });
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };
    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

    useEffect(() => {
        return () => {
            debouncedFetchSuggestions.cancel();
        };
    }, [debouncedFetchSuggestions]);

    const handleInputChange = (event: any, value: any, reason: any) => {
        if (reason === "input" && value !== "") {
            debouncedFetchSuggestions(value);
        } else
            debouncedFetchSuggestions("*");
    };

    const addBuyer = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.post(`${BACKEND_API_URL}buyers/`, buyer, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate("/buyers");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/buyers`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={addBuyer}>

                        <TextField
                            id="first_name"
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setBuyer({...buyer, first_name: event.target.value})}
                        />

                        <TextField
                            id="last_name"
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setBuyer({...buyer, last_name: event.target.value})}
                        />

                        <TextField
                            id="age"
                            label="Age"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setBuyer({...buyer, age: +event.target.value})}
                        />

                        <TextField
                            id="sex"
                            label="Sex (M/F/N)"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setBuyer({...buyer, sex: event.target.value})}
                        />

                        <Autocomplete
                            id="car"
                            options={cars}
                            sx={{mb: 2}}
                            renderInput={(params) => <TextField {...params} label="Car" variant="outlined"/>}
                            getOptionLabel={(option) => `${option.model}, ${option.year}, ${option.fuel_type}, ${option.cc}, ${option.hp}, ${option.transmission_type}`}
                            isOptionEqualToValue={(option, value) => option.model === value.model}
                            onInputChange={handleInputChange}
                            onChange={(event, value) => {
                                if (value) {
                                    if (value.id !== undefined) {
                                        setBuyer({...buyer, car: value.id});
                                    }
                                }
                            }}
                        />

                        <Button type="submit">Add Buyers</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};