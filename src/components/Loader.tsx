import React, { Component } from "react";
import loaderImg from "../assets/internas/loading.gif";
import '../styles/components/loader.scss';

export default function Loader() {

    return (
        <div className="loading-container">
            <div className="loading" >
                <img src={loaderImg}></img>
                <div className="mx-5"><h1>Carregando...</h1></div>

            </div>
        </div>
    );
}
