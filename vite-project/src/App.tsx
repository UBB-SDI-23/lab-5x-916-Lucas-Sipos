import {useState} from 'react'
import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {AllCars} from "./components/cars/AllCars";
import {AppMenu} from "./components/AppMenu";
import {AddCar} from "./components/cars/AddCar";
import {DeleteCar} from "./components/cars/DeleteCar";
import {EditCar} from "./components/cars/EditCar";
import {Statistic1} from "./components/statistics/Statistic1";
function App() {
    return (
        <React.Fragment>
			{/*<Router>*/}
			{/*	<Routes>*/}
			{/*		<Route path="/" element={<AppMenu />} />*/}
			{/*		<Route path="/cars" element={<AllCars />} />*/}
			{/*		<Route path="/cars/:carID/details" element={<AllCars />} />*/}
			{/*		<Route path="/cars/add" element={<AllCars />} />*/}
			{/*		<Route path="/cars/:carID/edit" element={<AllCars />} />*/}
			{/*		<Route path="/cars/:carID/delete" element={<AllCars />} />*/}
			{/*	</Routes>*/}
			{/*</Router>*/}
			<Router>
				<Routes>
					<Route path="/" element={<AppMenu />} />
					<Route path="/cars" element={<AppMenu />} />
					<Route path="/cars/add" element={<AddCar />} />
					<Route path="/cars/:carID/edit" element={<EditCar />} />
					<Route path="/cars/:carID/delete" element={<DeleteCar />} />
					<Route path="/statistics/1" element={<Statistic1 />} />
				</Routes>
			</Router>
		</React.Fragment>
    )
}

export default App
