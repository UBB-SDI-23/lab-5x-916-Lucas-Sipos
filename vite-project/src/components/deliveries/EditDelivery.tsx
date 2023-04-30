import {
    Autocomplete,
    Button,
    Card,
    CardActions,
    CardContent, Checkbox,
    FormControlLabel,
    IconButton,
    TextField
} from "@mui/material";
import {Container} from "@mui/system";
import {useCallback, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {BACKEND_API_URL} from "../../constants";
import {DeliveryService} from "../../models/DeliveryService";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import {Cars} from "../../models/Cars";
import {debounce, max} from "lodash";
import {Buyers} from "../../models/Buyers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {CheckBox} from "@mui/icons-material";

export const EditDelivery = () => {
    const {delivID} = useParams();
    const navigate = useNavigate();

    const [delivery, setDelivery] = useState<DeliveryService>({
        id: (typeof delivID === "string" ? parseInt(delivID) : -1),
        delivery_person: "",
        fee: 0,
        date: "",
        pickup: false,
        details: "",
        car: -1,
        buyer: -1,

    });

    const [cars, setCars] = useState<Cars[]>([]);
    const [buyers, setBuyers] = useState<Buyers[]>([]);

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
    const fetchSuggestions2 = async (query: string) => {
        try {
            let url = `${BACKEND_API_URL}/buyers/${query}`;
            await fetch(url).then(async (response) => {
                const jsn = await response.json();
                setBuyers(jsn);
            });
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };
    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);
    const debouncedFetchSuggestions2 = useCallback(debounce(fetchSuggestions2, 500), []);

    useEffect(() => {
        return () => {
            debouncedFetchSuggestions.cancel();
            debouncedFetchSuggestions2.cancel();
        };
    }, [debouncedFetchSuggestions, debouncedFetchSuggestions2]);

    const handleInputChange = (event: any, value: any, reason: any) => {
        if (reason === "input" && value !== "") {
            debouncedFetchSuggestions(value);
        } else
            debouncedFetchSuggestions("*");
    };
    const handleInputChange2 = (event: any, value: any, reason: any) => {
        if (reason === "input" && value !== "") {
            debouncedFetchSuggestions2(value);
        } else
            debouncedFetchSuggestions2("*");
    };

    const editDelivery = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.patch(`${BACKEND_API_URL}delivs/?id=${delivID}`, delivery, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate("/delivs");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/delivs`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={editDelivery}>

                        <TextField
                            id="delivery_person"
                            label="Delivery Person"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setDelivery({...delivery, delivery_person: event.target.value})}
                        />

                        <TextField
                            id="fee"
                            label="Fee"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setDelivery({...delivery, fee: +event.target.value})}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Date"
                                sx={{mb: 2, width: '100%'}}
                                format="YYYY-MM-DD"
                                views={['year', 'month', 'day']}
                                onChange={(event) => setDelivery({
                                    ...delivery,
                                    date: String(JSON.stringify(event).slice(1, 11))
                                })}
                            />
                        </LocalizationProvider>

                        <FormControlLabel
                            control={<Checkbox
                                onChange={(event) => setDelivery({...delivery, pickup: event.target.checked})}
                            />}
                            label="Pickup"
                            sx={{mb: 2, width: '100%'}}
                        />

                        <TextField
                            id="details"
                            label="Details"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setDelivery({...delivery, details: event.target.value})}
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
                                        setDelivery({...delivery, car: value.id});
                                    }
                                }
                            }}
                        />

                        <Autocomplete
                            id="buyer"
                            options={buyers}
                            sx={{mb: 2}}
                            renderInput={(params) => <TextField {...params} label="Buyer" variant="outlined"/>}
                            getOptionLabel={(option) => `${option.first_name}, ${option.last_name}, ${option.age}`}
                            isOptionEqualToValue={(option, value) => option.first_name === value.first_name}
                            onInputChange={handleInputChange2}
                            onChange={(event, value) => {
                                if (value) {
                                    if (value.id !== undefined) {
                                        setDelivery({...delivery, buyer: value.id});
                                    }
                                }
                            }}
                        />

                        <Button type="submit">Update Delivery</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};