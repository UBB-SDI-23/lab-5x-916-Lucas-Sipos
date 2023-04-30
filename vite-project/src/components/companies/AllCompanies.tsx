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
import {Companies} from "../../models/Companies";
import {BACKEND_API_URL} from "../../constants";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios"
import Car from "@mui/icons-material/CarRentalRounded";


export const AllCompanies = () => {
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState<Companies[]>([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/company/${page - 1}`)
            .then(async (response) => (await response.json()).data)
            .then((data) => {
                console.log(data)
                setCompanies(data);
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
            <h1>All Companies</h1>
            {loading && <CircularProgress/>}
            {!loading && companies.length === 0 && <p>No companies found</p>}
            {!loading && (
                <IconButton component={Link} sx={{mr: 3}} to={`/company/add/`}>
                    <Tooltip title="Add new company" arrow>
                        <AddIcon color="primary"/>
                    </Tooltip>
                </IconButton>
            )}
            {!loading && companies.length > 0 && (
                <><TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Owner</TableCell>
                                <TableCell align="center">Number of employees</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {companies.map((company, index) => (
                                <TableRow key={company.id}>
                                    <TableCell component="th" scope="row">
                                        {(page - 1) * 1000 + index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {/*<Link to={`/companies/${company.id}/details`} title="View company details">*/}
                                        {/*    {company.model}*/}
                                        {/*</Link>*/}
                                        {company.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {company.owner}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        {company.number_of_employees}
                                    </TableCell>
                                    <TableCell align="right">
                                        {/*<IconButton*/}
                                        {/*    component={Link}*/}
                                        {/*    sx={{mr: 3}}*/}
                                        {/*    to={`/companies/${company.id}/details`}>*/}
                                        {/*    <Tooltip title="View company details" arrow>*/}
                                        {/*        <ReadMoreIcon color="primary"/>*/}
                                        {/*    </Tooltip>*/}
                                        {/*</IconButton>*/}

                                        <IconButton component={Link} sx={{mr: 3}} to={`/company/${company.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{mr: 3}} to={`/company/${company.id}/delete`}>
                                            <DeleteForeverIcon sx={{color: "red"}}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                    <Pagination
                        count={1000}
                        page={page}
                        onChange={handlePageChange}
                        sx={{display: 'flex', justifyContent: 'center', mt: 2}}
                    />
                </>
            )}
        </Container>
    )
}