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
import {Cars} from "../../models/Cars";
import {BACKEND_API_URL} from "../../constants";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios"
import Car from "@mui/icons-material/CarRentalRounded";


export const AllCars = () => {
    const [loading, setLoading] = useState(false);
    const [cars, setCars] = useState<Cars[]>([]);
    const [order, setOrder] = useState("asc");
    const [page, setPage] = useState(1);
    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/cars/${page-1}`)
            .then(async (response) => (await response.json()).data)
            .then((data) => {
                setCars(data);
                setLoading(false);
            })
    }, [page]);
    const sorting = () => {
        if (order === "asc") {
            const sorted = [...cars].sort((car1, car2) =>
                car1.model.toLowerCase() > car2.model.toLowerCase() ? 1 : -1
            );
            setCars(sorted);
            setOrder("des");
        }
        if (order === "des") {
            const sorted = [...cars].sort((car1, car2) =>
                car1.model.toLowerCase() < car2.model.toLowerCase() ? 1 : -1
            );
            setCars(sorted);
            setOrder("asc");
        }
    }
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
            <h1>All Cars</h1>
            {loading && <CircularProgress/>}
            {!loading && cars.length === 0 && <p>No Cars found</p>}
            {!loading && (
                <IconButton component={Link} sx={{mr: 3}} to={`/cars/add/`}>
                    <Tooltip title="Add new car" arrow>
                        <AddIcon color="primary"/>
                    </Tooltip>
                </IconButton>
            )}
            {!loading && cars.length > 0 && (
                <><TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell onClick={() => sorting()} align="center">Model</TableCell>
                                <TableCell align="center">Year</TableCell>
                                <TableCell align="center">Fuel Type</TableCell>
                                <TableCell align="center">CC</TableCell>
                                <TableCell align="center">HP</TableCell>
                                <TableCell align="center">Transmission Type</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cars.map((car, index) => (
                                <TableRow key={car.id}>
                                    <TableCell component="th" scope="row">
                                        {(page - 1) * 1000 + index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {/*<Link to={`/cars/${car.id}/details`} title="View car details">*/}
                                        {/*    {car.model}*/}
                                        {/*</Link>*/}
                                        {car.model}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {car.year}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {car.fuel_type}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {car.cc}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {car.hp}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {car.transmission_type}
                                    </TableCell>
                                    <TableCell align="right">
                                        {/*<IconButton*/}
                                        {/*    component={Link}*/}
                                        {/*    sx={{mr: 3}}*/}
                                        {/*    to={`/cars/${car.id}/details`}>*/}
                                        {/*    <Tooltip title="View car details" arrow>*/}
                                        {/*        <ReadMoreIcon color="primary"/>*/}
                                        {/*    </Tooltip>*/}
                                        {/*</IconButton>*/}

                                        <IconButton component={Link} sx={{mr: 3}} to={`/cars/${car.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/cars/${car.id}/delete`}>
                                            <DeleteForeverIcon sx={{color: "red"}}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                    <Pagination
                        count={1001}
                        page={page}
                        onChange={handlePageChange}
                        sx={{display: 'flex', justifyContent: 'center', mt: 2}}
                    />
                </>
            )}
        </Container>
    )
}