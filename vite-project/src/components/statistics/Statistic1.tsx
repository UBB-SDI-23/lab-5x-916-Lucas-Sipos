import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableBody,
    Container,
    TableCell,
    CircularProgress, Button, Pagination,
} from "@mui/material"
import {useEffect, useState} from "react";
import {BACKEND_API_URL} from "../../constants";
import {Link} from "react-router-dom";
import Car from "@mui/icons-material/CarRentalRounded";
import {forEach} from "lodash";

export const Statistic1 = () => {
    interface Stat1Type {
        age: number,
        first_name: string,
        last_name: string,
        model: string,
        year: number,
    }

    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState<Stat1Type[]>([]);
    const [page, setPage] = useState(1);


    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/statistics/1/${page - 1}`)
            .then(async (response) => (await response.json()).young_drivers)
            .then((data) => {
                setStats(data);
                setLoading(false);
            })
    }, [page]);

    const handlePageChange = (event: any, value: any) => {
        setPage(value);
    };

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
            <h1>Young Drivers</h1>

            {loading && <CircularProgress/>}
            {!loading && stats !== null && <><TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="left">Age</TableCell>
                                <TableCell align="left">First Name</TableCell>
                                <TableCell align="left">Last Name</TableCell>
                                <TableCell align="left">Model</TableCell>
                                <TableCell align="left">Year</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stats.map((item, index) => (
                                <TableRow key={index + 1}>
                                    <TableCell component="th" scope="row">{(page - 1) * 1000 + index + 1}</TableCell>
                                    <TableCell component="th" scope="row">{item.age}</TableCell>
                                    <TableCell component="th" scope="row">{item.first_name}</TableCell>
                                    <TableCell component="th" scope="row">{item.last_name}</TableCell>
                                    <TableCell component="th" scope="row">{item.model}</TableCell>
                                    <TableCell component="th" scope="row">{item.year}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                    <Pagination
                        count={385}
                        page={page}
                        onChange={handlePageChange}
                        sx={{display: 'flex', justifyContent: 'center', mt: 2}}
                    />
                </>}
        </Container>
    )
        ;
}