import { Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Companies } from "../../models/Companies";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const EditCompany = () => {
    const {companyID} = useParams();
    const navigate = useNavigate();

    const [company, setCompany] = useState<Companies>({
        id: (typeof companyID === "string" ? parseInt(companyID) : -1),
        name: "",
        owner: "",
        number_of_employees: 1,
    });

    const editCompany = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.patch(`${BACKEND_API_URL}company/?id=${companyID}`, company, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate("/company");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/company`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={editCompany}>

                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setCompany({...company, name: event.target.value})}
                        />

                        <TextField
                            id="owner"
                            label="Owner"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setCompany({...company, owner: event.target.value})}
                        />

                        <TextField
                            id="number_of_employees"
                            label="Number of employees"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setCompany({...company, number_of_employees: +event.target.value})}
                        />

                        <Button type="submit">Update Company</Button>
                    </form>
                </CardContent>
                <CardActions></CardActions>
            </Card>
        </Container>
    );
};