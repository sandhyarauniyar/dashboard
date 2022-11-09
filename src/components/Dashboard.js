import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Header from './Header';
import './Dashboard.css';

function Dashboard() {

    const title = 'User Details';
    const [data, setData] = useState();

    const getData = async () => {
        const url = `http://localhost:8080/users`;
        const response = await fetch(url);
        const allData = await response.json();
        console.log(allData);
        setData([...allData]);
    }

    useEffect(() => {
        getData();
    }, []);

    const headers = ["username", "phoneNumber", "email", "date"]
    return (
        <div>
            <Header />
            <Typography variant="h4" color="inherit" className="dashboard-title">
                {title}
            </Typography>

            <hr />

            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header) => (
                            <TableCell align="right">{header.toUpperCase()}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data != undefined && data.map((emp, index) => (
                        <TableRow key={index}>
                            {headers.map((header) => (
                                <TableCell align="right">{emp[header]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

Dashboard.defaultProps = {
    title: "No Title"
};

export default Dashboard;
