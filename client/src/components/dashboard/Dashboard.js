import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Card from "../card/Card";
import "./Dashboard.css";

const Dashboard = (props) => {
    const [search, setSearch] = useState("Minions");
    const [data, setData] = useState([]);
    const [jsondata, setJsonData] = useState({});

    const onLogoutClick = (e) => {
        e.preventDefault();
        props.logoutUser();
    };

    useEffect(
        () => {
            if (!search) {
            } else {
                fetchAPI();
            }

            // eslint-disable-next-line
        },
        [search]
    );

    const fetchAPI = async () => {
        const res = await fetch(
            `https://www.omdbapi.com/?s=${search}&apikey=db5167ff`,
            {
                method: "GET",
            }
        ).catch((err) => {
            throw new Error(err);
        });
        const movies = await res.json();

        if (movies.Response === "False") {
            setData([]);
        } else if (movies.Response === "True") {
            setData(movies.Search);
            setJsonData(movies);
        }
    };

    const { user } = props.auth;

    return (
        <div className='row'>
         <h1 style={{textAlign: "center"}}>Movie Library</h1>
            <input
                style={{ margin: "5rem 25vw 5rem 25vw", width: "50vw"}}
                placeholder='Search'
                type='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className='landing-copy col s12 center-align'>
                <div className='app'>
                    <div className='header'>
                        <b>Hey there,</b> {user.name.split(" ")[0]}
                    </div>

                    <div className='card-container'>
                        {jsondata.Response === "True" ? (
                            data
                                .map((curr) => (
                                    <Card
                                        key={curr.imdbID}
                                        picurl={curr.Poster}
                                        title={curr.Title}
                                    />
                                ))
                                .slice(0, 5)
                        ) : (
                            <h1>`${jsondata.Response}`</h1>
                        )}
                    </div>
                </div>
                <button
                    style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem",
                    }}
                    onClick={onLogoutClick}
                    className='btn btn-large waves-effect waves-light hoverable blue accent-3'
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);
