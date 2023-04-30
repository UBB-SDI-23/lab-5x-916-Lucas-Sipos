import {useState} from 'react'
import './App.css'
import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {AllCars} from "./components/cars/AllCars";
import {AppMenu} from "./components/AppMenu";
import {AddCar} from "./components/cars/AddCar";
import {DeleteCar} from "./components/cars/DeleteCar";
import {EditCar} from "./components/cars/EditCar";
import {Statistic1} from "./components/statistics/Statistic1";
import {AllBuyers} from "./components/buyers/AllBuyers";
import {CarDetails} from "./components/cars/CarDetails";
import {AddBuyer} from "./components/buyers/AddBuyer";
import {DeleteBuyer} from "./components/buyers/DeleteBuyer";
import {EditBuyer} from "./components/buyers/EditBuyer";
import {AllDeliveries} from "./components/deliveries/AllDeliveries";
import {BuyerDetails} from "./components/buyers/BuyerDetails";
import {AddDelivery} from "./components/deliveries/AddDelivery";
import {EditDelivery} from "./components/deliveries/EditDelivery";
import {DeleteDelivery} from "./components/deliveries/Deletedelivery";
import {AllCompanies} from "./components/companies/AllCompanies";
import {AddCompany} from "./components/companies/AddCompany";
import {EditCompany} from "./components/companies/EditCompany";
import {DeleteCompany} from "./components/companies/DeleteCompany";

function App() {
    return (
        <React.Fragment>
            <Router>
                <Routes>
                    <Route path="/" element={<AppMenu/>}/>

                    <Route path="/cars" element={<AllCars/>}/>
                    <Route path="/cars/add" element={<AddCar/>}/>
                    <Route path="/cars/:carID/edit" element={<EditCar/>}/>
                    <Route path="/cars/:carID/delete" element={<DeleteCar/>}/>
                    <Route path="/cars/:carID/details" element={<CarDetails/>}/>

                    <Route path="/buyers" element={<AllBuyers/>}/>
                    <Route path="/buyers/add" element={<AddBuyer/>}/>
                    <Route path="/buyers/:buyerID/edit" element={<EditBuyer/>}/>
                    <Route path="/buyers/:buyerID/delete" element={<DeleteBuyer/>}/>
                    <Route path="/buyers/:buyerID/details" element={<BuyerDetails/>}/>

                    <Route path="/delivs" element={<AllDeliveries/>}/>
                    <Route path="/delivs/add" element={<AddDelivery/>}/>
                    <Route path="/delivs/:delivID/edit" element={<EditDelivery/>}/>
                    <Route path="/delivs/:delivID/delete" element={<DeleteDelivery/>}/>

                    <Route path="/company" element={<AllCompanies/>}/>
                    <Route path="/company/add" element={<AddCompany/>}/>
                    <Route path="/company/:companyID/edit" element={<EditCompany/>}/>
                    <Route path="/company/:companyID/delete" element={<DeleteCompany/>}/>

                    <Route path="/statistics/1" element={<Statistic1/>}/>
                </Routes>
            </Router>
        </React.Fragment>
    )
}

export default App
