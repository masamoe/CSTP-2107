import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './components/Quiz';

const MyRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Quiz />} />
            </Routes>
        </Router>
    );
}

export default MyRouter;