import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableBody,
    Container,
    TableCell,
    CircularProgress,
} from "@mui/material"
import {useEffect, useState} from "react";
import {BACKEND_API_URL} from "../../constants";
import {Cars} from "../../models/Cars";

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



    useEffect(() => {
        setLoading(true);
        fetch(`${BACKEND_API_URL}/statistics/1/`)
            .then(async (response) => {
                const jsn = await response.text();
                const arr: Stat1Type[] = (JSON.parse(jsn))["young_drivers"];
                setStats(Object.values(arr));
            })
            .catch((error) => {
                alert(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <Container>
            <h1>Young Drivers</h1>

            {loading && <CircularProgress/>}
            {!loading && stats.length > 0 && (
                <TableContainer component={Paper}>
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
                                    <TableCell component="th" scope="row">{index + 1}</TableCell>
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
            )}
        </Container>
    );
}