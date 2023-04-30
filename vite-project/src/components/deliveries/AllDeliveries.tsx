import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Container,
    IconButton,
    Tooltip,
    Button,
    Pagination
} from "@mui/material";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {DeliveryService} from "../../models/DeliveryService";
import {BACKEND_API_URL} from "../../constants";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios"
import Car from "@mui/icons-material/CarRentalRounded";


export const AllDeliveries = () => {
    const [loading, setLoading] = useState(false);
    const [deliveries, setDeliveries] = useState<DeliveryService[]>([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/delivs/${page - 1}`)
            .then(async (response) => (await response.json()).data)
            .then((data) => {
                setDeliveries(data);
                setLoading(false);
            })
    }, [page]);
    const handlePageChange = (event: any, value: any) => {
        setPage(value);
    };

    return (
        <Container>
            <Button
                to="/"
                component={Link}
                color="inherit"
                sx={{mr: 5}}
                startIcon={<Car/>}
            >
                Back
            </Button>
            <h1>All Deliveries</h1>
            {loading && <CircularProgress/>}
            {!loading && deliveries.length === 0 && <p>No deliveries found</p>}
            {!loading && (
                <IconButton component={Link} sx={{mr: 3}} to={`/delivs/add/`}>
                    <Tooltip title="Add new delivery" arrow>
                        <AddIcon color="primary"/>
                    </Tooltip>
                </IconButton>
            )}
            {!loading && deliveries.length > 0 && (
                <><TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Delivery Person</TableCell>
                                <TableCell align="center">Fee</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Pickup</TableCell>
                                <TableCell align="center">Details</TableCell>
                                <TableCell align="center">Car</TableCell>
                                <TableCell align="center">Buyer</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {deliveries.map((delivery, index) => (
                                <TableRow key={delivery.id}>
                                    <TableCell component="th" scope="row">
                                        {(page - 1) * 1000 + index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {delivery.delivery_person}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {delivery.fee}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {delivery.date}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {(delivery.pickup) ? "No" : "Yes"}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {delivery.details}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/cars/${delivery.car}/details`} title="View car details">
                                            {delivery.car}
                                        </Link>
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/buyers/${delivery.buyer}/details`} title="View buyer details">
                                            {delivery.buyer}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">
                                        {/*<IconButton*/}
                                        {/*    component={Link}*/}
                                        {/*    sx={{mr: 3}}*/}
                                        {/*    to={`/deliveries/${delivery.id}/details`}>*/}
                                        {/*    <Tooltip title="View delivery details" arrow>*/}
                                        {/*        <ReadMoreIcon color="primary"/>*/}
                                        {/*    </Tooltip>*/}
                                        {/*</IconButton>*/}

                                        <IconButton component={Link} sx={{mr: 3}} to={`/delivs/${delivery.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/delivs/${delivery.id}/delete`}>
                                            <DeleteForeverIcon sx={{color: "red"}}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                    <Pagination
                        count={10001}
                        page={page}
                        onChange={handlePageChange}
                        sx={{display: 'flex', justifyContent: 'center', mt: 2}}
                    />
                </>
            )}
        </Container>
    )
}