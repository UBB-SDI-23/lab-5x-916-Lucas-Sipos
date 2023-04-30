import {Card, CardContent, IconButton} from "@mui/material";
import {Container} from "@mui/system";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {BACKEND_API_URL} from "../../constants";
import {Buyers} from "../../models/Buyers";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const BuyerDetails = () => {
    const [loading, setLoading] = useState(false);
    const {buyerID} = useParams();
    const [buyer, setBuyer] = useState<Buyers>();

    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}buyers/?id=${buyerID}`)
            .then(async (response) => (await response.json()).buyers)
            .then((data) => {
                console.log(data);
                setBuyer(data);
                setLoading(false);
            })
    }, [buyerID]);

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <h1>Buyer details</h1>
                    {!loading && buyer != null && (
                        <>
                            <table>
                                <tbody style={{textAlign: 'left'}}>
                                <tr>
                                    <td>First name:</td>
                                    <td style={{paddingLeft: 20}}>{buyer?.first_name}</td>
                                </tr>
                                <tr>
                                    <td>Last name:</td>
                                    <td style={{paddingLeft: 20}}>{buyer?.last_name}</td>
                                </tr>
                                <tr>
                                    <td>Age:</td>
                                    <td style={{paddingLeft: 20}}>{buyer?.age}</td>
                                </tr>
                                <tr>
                                    <td>Sex:</td>
                                    <td style={{paddingLeft: 20}}>{buyer?.sex}</td>
                                </tr>
                                <tr>
                                    <td>Car:</td>
                                    <td style={{paddingLeft: 20}}>
                                        <Link to={`/cars/${buyer.car}/details`} title="View car details">
                                            {buyer.car}
                                        </Link>
                                    </td>
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