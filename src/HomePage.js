import React from "react";
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Start from './components/start/Start'
import Planning from './components/planning/planning'
import Work from './components/work/work'


export default function HomePage(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Start/>}  />
                    <Route path="/plan" element={<Planning/>}  />
                    <Route path="/work" element={<Work/>}  />
                </Routes>
            </BrowserRouter>
        </>
    )
}