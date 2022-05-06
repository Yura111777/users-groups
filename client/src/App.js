import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Users from "./components/Users";
import Groups from "./components/Groups";
import Navs from "./components/Nav";
import './scss/style.scss'

function App() {
    return (
        <Router>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Navs/>
                        <Routes>

                            <Route exact path='/' element={<Users/>}/>
                            <Route path='/groups' element={<Groups/>}/>
                        </Routes>
                    </div>
                </div>
            </div>

        </Router>
    );
}

export default App;
