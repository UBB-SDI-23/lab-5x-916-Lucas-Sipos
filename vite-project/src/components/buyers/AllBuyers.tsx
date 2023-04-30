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
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Buyers} from "../../models/Buyers";
import {BACKEND_API_URL} from "../../constants";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios"
import Car from "@mui/icons-material/CarRentalRounded";


export const AllBuyers = () => {
    const [loading, setLoading] = useState(false);
    const [buyers, setBuyers] = useState<Buyers[]>([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/buyers/${page - 1}`)
            .then(async (response) => (await response.json()).data)
            .then((data) => {
                setBuyers(data);
                setLoading(false);
            })
    }, [page]);
    const handlePageChange = (event: any, value: any) => {
        setPage(value);
    };

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
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
            <h1>All Buyers</h1>
            {loading && <CircularProgress/>}
            {!loading && buyers.length === 0 && <p>No buyers found</p>}
            {!loading && (
                <IconButton component={Link} sx={{mr: 3}} to={`/buyers/add/`}>
                    <Tooltip title="Add new buyer" arrow>
                        <AddIcon color="primary"/>
                    </Tooltip>
                </IconButton>
            )}
            {!loading && buyers.length > 0 && (
                <><TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">First Name</TableCell>
                                <TableCell align="center">Last Name</TableCell>
                                <TableCell align="center">Age</TableCell>
                                <TableCell align="center">Sex</TableCell>
                                <TableCell align="center">Car</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {buyers.map((buyer, index) => (
                                <TableRow key={buyer.id}>
                                    <TableCell component="th" scope="row">
                                        {(page - 1) * 1000 + index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {buyer.first_name}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {buyer.last_name}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {buyer.age}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {buyer.sex}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/cars/${buyer.car}/details`} title="View car details">
                                            {buyer.car}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">
                                        {/*<IconButton*/}
                                        {/*    component={Link}*/}
                                        {/*    sx={{mr: 3}}*/}
                                        {/*    to={`/buyers/${buyer.id}/details`}>*/}
                                        {/*    <Tooltip title="View buyer details" arrow>*/}
                                        {/*        <ReadMoreIcon color="primary"/>*/}
                                        {/*    </Tooltip>*/}
                                        {/*</IconButton>*/}

                                        <IconButton component={Link} sx={{mr: 3}} to={`/buyers/${buyer.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/buyers/${buyer.id}/delete`}>
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