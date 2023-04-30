import {Card, CardContent, IconButton} from "@mui/material";
import {Container} from "@mui/system";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {BACKEND_API_URL} from "../../constants";
import {Cars} from "../../models/Cars";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const CarDetails = () => {
    const [loading, setLoading] = useState(false);
    const {carID} = useParams();
    const [car, setCar] = useState<Cars>();

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}cars/?id=${carID}`)
            .then(async (response) => (await response.json()).cars)
            .then((data) => {
                setCar(data);
                setLoading(false);
            })
    }, [carID]);

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <h1>Car details</h1>
                    {!loading && car != null && (
                        <>
                            <table>
                                <tbody style={{textAlign: 'left'}}>
                                <tr>
                                    <td>Model:</td>
                                    <td style={{paddingLeft: 20}}>{car?.model}</td>
                                </tr>
                                <tr>
                                    <td>Year:</td>
                                    <td style={{paddingLeft: 20}}>{car?.year}</td>
                                </tr>
                                <tr>
                                    <td>Fuel Type:</td>
                                    <td style={{paddingLeft: 20}}>{car?.fuel_type}</td>
                                </tr>
                                <tr>
                                    <td>CC:</td>
                                    <td style={{paddingLeft: 20}}>{car?.cc}</td>
                                </tr>
                                <tr>
                                    <td>HP:</td>
                                    <td style={{paddingLeft: 20}}>{car?.hp}</td>
                                </tr>
                                <tr>
                                    <td>Transmission Type:</td>
                                    <td style={{paddingLeft: 20}}>{car?.transmission_type}</td>
                                </tr>
                                </tbody>
                            </table>
                        </>
                    )
                    }
                </CardContent>
            </Card>
        </Container>
    );
};