import {useLocation} from "react-router-dom"
import React, { useEffect } from 'react'

const ScrolToTop = () => {
  const location = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "auto"
        })
    }, [location.pathname]);
}

export default ScrolToTop