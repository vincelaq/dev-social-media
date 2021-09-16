import React, { useState, useContext, useEffect, Fragment } from "react";
import { Route, NavLink, Switch, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import HomePage from "../../pages/HomePage";
import FollowingPage from "../../pages/FollowingPage";
import ProfilePage from "../../pages/ProfilePage";
import PostPage from "../../pages/PostPage";
import CreatePost from "../CreatePost";
import server from "../../api";
import "./styles.css";

const Nav = () => {
    const auth = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const user = auth.user;

    const handleErrors = (err) => {
        if (err.response) {
            console.log("Problem with response")
            console.log(err.response)
            alert(err.response.data.message)
        } else if (err.request) {
            console.log("Problem with request")
            console.log(err.request)
            alert(err.request.data)
        } else {
            console.log("Error during homepage render")
            console.log(err.message)
        }
    }


    const fetchPosts = async () => {
        try {
            const options = {
                headers: {
                    'Authorization': 'Bearer '+auth.token,
                    'Content-Type': 'application/json'
                }
            }
            let res = await server.get('posts', options);
            setPosts(res.data.data);
            console.log("POST SERVICE RESPONSE: ", res);
        } catch (err) {
            handleErrors(err);
        }
    };



    useEffect(() => {
        fetchPosts();
    }, []);
    
    
    let url;
    let avatar;
    if (process.env.NODE_ENV === "development") {
        url = "http://localhost:5000/api/";
    } else {
        url = "https://limitless-lowlands-64983.herokuapp.com/"
    };
    if (auth.user.image && auth.user.image.includes('gravatar')) {
        avatar = auth.user.image;
    } else {
        avatar = `${url}${auth.user.image}`;
    };

    
    return (
        <Fragment>

            <nav className="verti-nav">
                <div>
                    <NavLink to="/" className="nav__logo"><span className="--text-green">dev</span>Book</NavLink>
                    <div className="nav__link-wrap">
                        <NavLink exact to="/" className="nav__link">

                            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.4911 16.3086H11.9883C11.5898 16.3086 11.2076 16.1503 10.9258 15.8685C10.6439 15.5867 10.4856 15.2045 10.4856 14.8059V9.5464H7.48017V14.8059C7.48017 15.2045 7.32185 15.5867 7.04003 15.8685C6.75822 16.1503 6.376 16.3086 5.97745 16.3086H4.47473C3.87691 16.3086 3.30357 16.0712 2.88085 15.6484C2.45813 15.2257 2.22064 14.6524 2.22064 14.0546V8.79504C2.22064 8.59576 2.2998 8.40465 2.44071 8.26374C2.58162 8.12284 2.77273 8.04367 2.972 8.04367C3.17128 8.04367 3.36239 8.12284 3.5033 8.26374C3.6442 8.40465 3.72337 8.59576 3.72337 8.79504V14.0546C3.72337 14.2538 3.80253 14.445 3.94343 14.5859C4.08434 14.7268 4.27545 14.8059 4.47473 14.8059H5.97745V9.5464C5.97745 9.14785 6.13577 8.76563 6.41759 8.48381C6.6994 8.202 7.08162 8.04367 7.48017 8.04367H10.4856C10.8842 8.04367 11.2664 8.202 11.5482 8.48381C11.83 8.76563 11.9883 9.14785 11.9883 9.5464V14.8059H13.4911C13.6903 14.8059 13.8814 14.7268 14.0224 14.5859C14.1633 14.445 14.2424 14.2538 14.2424 14.0546V8.79504C14.2424 8.59576 14.3216 8.40465 14.4625 8.26374C14.6034 8.12284 14.7945 8.04367 14.9938 8.04367C15.1931 8.04367 15.3842 8.12284 15.5251 8.26374C15.666 8.40465 15.7451 8.59576 15.7451 8.79504V14.0546C15.7451 14.6524 15.5077 15.2257 15.0849 15.6484C14.6622 16.0712 14.0889 16.3086 13.4911 16.3086ZM17.879 6.94669C17.987 6.78013 18.0248 6.57759 17.9839 6.3833C17.9431 6.18902 17.827 6.01879 17.6611 5.90981L10.6209 1.34153C10.1341 1.02619 9.56659 0.858398 8.98665 0.858398C8.40671 0.858398 7.83915 1.02619 7.35244 1.34153L0.312185 5.90981C0.156082 6.02226 0.0490635 6.19031 0.0131841 6.37933C-0.0226953 6.56834 0.0152982 6.76392 0.119335 6.92576C0.223371 7.08759 0.385524 7.20335 0.572376 7.24918C0.759228 7.29501 0.956542 7.26742 1.12365 7.17209L8.16391 2.60382C8.40767 2.44537 8.69216 2.36103 8.98289 2.36103C9.27363 2.36103 9.55812 2.44537 9.80188 2.60382L16.8421 7.17209C17.0087 7.28013 17.2112 7.31785 17.4055 7.27702C17.5998 7.23619 17.77 7.12013 17.879 6.9542V6.94669Z" fill="white" />
                            </svg>
                            <span>Home</span>

                        </NavLink>
                        <NavLink exact to="/profile" className="nav__link">

                            <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 16H3.33333C3.15652 16 2.98695 15.9298 2.86193 15.8047C2.7369 15.6797 2.66667 15.5101 2.66667 15.3333C2.66667 15.1565 2.7369 14.987 2.86193 14.8619C2.98695 14.7369 3.15652 14.6667 3.33333 14.6667H10C10.1768 14.6667 10.3464 14.5964 10.4714 14.4714C10.5964 14.3464 10.6667 14.1768 10.6667 14V11.2333C10.6502 11.0493 10.587 10.8726 10.4832 10.7198C10.3794 10.567 10.2383 10.4431 10.0733 10.36C7.46025 9.30497 4.53975 9.30497 1.92667 10.36C1.76169 10.4431 1.62062 10.567 1.5168 10.7198C1.41299 10.8726 1.34984 11.0493 1.33333 11.2333V15.3333C1.33333 15.5101 1.2631 15.6797 1.13807 15.8047C1.01305 15.9298 0.843478 16 0.666667 16C0.489856 16 0.320286 15.9298 0.195262 15.8047C0.0702379 15.6797 0 15.5101 0 15.3333V11.2333C0.0144461 10.7824 0.156045 10.3448 0.408467 9.97086C0.66089 9.59694 1.01386 9.30199 1.42667 9.12C4.36032 7.93454 7.63968 7.93454 10.5733 9.12C10.9861 9.30199 11.3391 9.59694 11.5915 9.97086C11.844 10.3448 11.9856 10.7824 12 11.2333V14C12 14.5304 11.7893 15.0391 11.4142 15.4142C11.0391 15.7893 10.5304 16 10 16ZM9.33333 3.33333C9.33333 2.67406 9.13784 2.0296 8.77157 1.48143C8.40529 0.93327 7.8847 0.506029 7.27561 0.253736C6.66652 0.00144428 5.9963 -0.0645668 5.3497 0.0640506C4.7031 0.192668 4.10915 0.510137 3.64298 0.976312C3.1768 1.44249 2.85933 2.03643 2.73072 2.68303C2.6021 3.32964 2.66811 3.99986 2.9204 4.60895C3.17269 5.21803 3.59994 5.73863 4.1481 6.1049C4.69626 6.47117 5.34073 6.66667 6 6.66667C6.43774 6.66667 6.87119 6.58045 7.27561 6.41293C7.68003 6.24542 8.04749 5.99989 8.35702 5.69036C8.66655 5.38083 8.91208 5.01337 9.0796 4.60895C9.24712 4.20453 9.33333 3.77107 9.33333 3.33333ZM8 3.33333C8 3.7289 7.8827 4.11558 7.66294 4.44448C7.44318 4.77337 7.13082 5.02972 6.76537 5.18109C6.39991 5.33247 5.99778 5.37208 5.60982 5.29491C5.22186 5.21774 4.86549 5.02725 4.58579 4.74755C4.30608 4.46784 4.1156 4.11148 4.03843 3.72352C3.96126 3.33555 4.00087 2.93342 4.15224 2.56797C4.30362 2.20252 4.55996 1.89016 4.88886 1.6704C5.21776 1.45063 5.60444 1.33333 6 1.33333C6.53043 1.33333 7.03914 1.54405 7.41421 1.91912C7.78929 2.29419 8 2.8029 8 3.33333Z" fill="white" />
                            </svg>
                            <span>Profile</span>

                        </NavLink>
                        <NavLink exact to="/following" className="nav__link">

                            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 16.5708H2.25C1.65326 16.5708 1.08097 16.3337 0.65901 15.9118C0.237053 15.4898 0 14.9175 0 14.3208L0 11.9208C0.0161192 11.4827 0.156554 11.0583 0.404901 10.6971C0.653248 10.3358 0.999253 10.0527 1.4025 9.88079C3.33847 9.11568 5.44515 8.88765 7.5 9.22079C7.59849 9.23655 7.69291 9.27155 7.77788 9.3238C7.86284 9.37605 7.93668 9.44453 7.99518 9.52531C8.05368 9.6061 8.0957 9.69762 8.11883 9.79464C8.14196 9.89167 8.14576 9.9923 8.13 10.0908C8.11424 10.1893 8.07924 10.2837 8.02699 10.3687C7.97474 10.4536 7.90626 10.5275 7.82548 10.586C7.74469 10.6445 7.65317 10.6865 7.55615 10.7096C7.45912 10.7328 7.35849 10.7365 7.26 10.7208C5.48979 10.4429 3.67748 10.6422 2.01 11.2983C1.88765 11.3604 1.78254 11.4518 1.70403 11.5643C1.62552 11.6768 1.57605 11.807 1.56 11.9433V14.3433C1.56 14.5422 1.63902 14.733 1.77967 14.8736C1.92032 15.0143 2.11109 15.0933 2.31 15.0933H6C6.19891 15.0933 6.38968 15.1723 6.53033 15.313C6.67098 15.4536 6.75 15.6444 6.75 15.8433C6.75 16.0422 6.67098 16.233 6.53033 16.3736C6.38968 16.5143 6.19891 16.5933 6 16.5933V16.5708ZM9 4.24829C9 3.35319 8.64442 2.49474 8.01149 1.86181C7.37855 1.22887 6.52011 0.873291 5.625 0.873291C4.72989 0.873291 3.87145 1.22887 3.23851 1.86181C2.60558 2.49474 2.25 3.35319 2.25 4.24829C2.25 5.1434 2.60558 6.00184 3.23851 6.63478C3.87145 7.26771 4.72989 7.62329 5.625 7.62329C6.52011 7.62329 7.37855 7.26771 8.01149 6.63478C8.64442 6.00184 9 5.1434 9 4.24829ZM7.5 4.24829C7.5 4.74557 7.30246 5.22249 6.95083 5.57412C6.59919 5.92575 6.12228 6.12329 5.625 6.12329C5.12772 6.12329 4.65081 5.92575 4.29917 5.57412C3.94754 5.22249 3.75 4.74557 3.75 4.24829C3.75 3.75101 3.94754 3.2741 4.29917 2.92247C4.65081 2.57083 5.12772 2.37329 5.625 2.37329C6.12228 2.37329 6.59919 2.57083 6.95083 2.92247C7.30246 3.2741 7.5 3.75101 7.5 4.24829ZM18 14.8308V12.3108C17.9868 11.9211 17.8627 11.5433 17.6421 11.2218C17.4216 10.9003 17.1138 10.6484 16.755 10.4958C14.4691 9.58915 11.9234 9.58915 9.6375 10.4958C9.2787 10.6484 8.97093 10.9003 8.75039 11.2218C8.52983 11.5433 8.40567 11.9211 8.3925 12.3108V15.8208C8.3925 16.0197 8.47152 16.2105 8.61217 16.3511C8.75282 16.4918 8.94359 16.5708 9.1425 16.5708C9.34141 16.5708 9.53218 16.4918 9.67283 16.3511C9.81348 16.2105 9.8925 16.0197 9.8925 15.8208V12.3108C9.90623 12.2242 9.93977 12.1419 9.9905 12.0703C10.0412 11.9988 10.1078 11.9399 10.185 11.8983C12.1126 11.1371 14.2574 11.1371 16.185 11.8983C16.2622 11.9399 16.3288 11.9988 16.3795 12.0703C16.4302 12.1419 16.4638 12.2242 16.4775 12.3108V14.8308C16.4765 14.8643 16.469 14.8973 16.4552 14.9278C16.4415 14.9584 16.4219 14.986 16.3975 15.0089C16.3732 15.0319 16.3445 15.0499 16.3132 15.0618C16.2818 15.0737 16.2485 15.0793 16.215 15.0783H12C11.8011 15.0783 11.6103 15.1573 11.4697 15.298C11.329 15.4386 11.25 15.6294 11.25 15.8283C11.25 16.0272 11.329 16.218 11.4697 16.3586C11.6103 16.4993 11.8011 16.5783 12 16.5783H16.2375C16.468 16.5793 16.6964 16.5349 16.9097 16.4476C17.123 16.3603 17.317 16.2318 17.4807 16.0696C17.6443 15.9073 17.7744 15.7144 17.8635 15.5018C17.9526 15.2893 17.999 15.0613 18 14.8308ZM15.75 5.73329C15.7574 5.21258 15.6098 4.70143 15.326 4.26484C15.0421 3.82826 14.6348 3.48598 14.1558 3.28154C13.6768 3.07709 13.1479 3.01973 12.6363 3.11674C12.1246 3.21375 11.6534 3.46075 11.2825 3.82633C10.9116 4.19191 10.6579 4.65953 10.5535 5.16973C10.4492 5.67993 10.4989 6.20964 10.6964 6.69148C10.894 7.17333 11.2304 7.58553 11.6628 7.87566C12.0953 8.16579 12.6042 8.32074 13.125 8.32079C13.8159 8.32479 14.4803 8.05465 14.9723 7.56961C15.4644 7.08457 15.7441 6.4242 15.75 5.73329ZM14.25 5.73329C14.262 5.95796 14.2064 6.18107 14.0903 6.3738C13.9742 6.56652 13.8029 6.72001 13.5987 6.81443C13.3945 6.90885 13.1667 6.93987 12.9446 6.90347C12.7226 6.86708 12.5166 6.76495 12.3532 6.61027C12.1898 6.4556 12.0765 6.25548 12.028 6.03578C11.9795 5.81607 11.998 5.58687 12.0811 5.37779C12.1642 5.1687 12.3081 4.98934 12.4942 4.86286C12.6803 4.73639 12.9 4.66861 13.125 4.66829C13.4143 4.66414 13.6939 4.77315 13.904 4.97209C14.1141 5.17102 14.2383 5.44416 14.25 5.73329Z" fill="white" />
                            </svg>
                            <span>Following</span>

                        </NavLink>
                    </div>
                </div>
                <div>
                    <Link to="/" onClick={auth.logout} className="nav__link">

                        <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.4375 18.3H2.2875C1.68082 18.3 1.09898 18.059 0.669993 17.63C0.241004 17.201 0 16.6192 0 16.0125L0 2.2875C0 1.68082 0.241004 1.09898 0.669993 0.669993C1.09898 0.241004 1.68082 0 2.2875 0L11.4375 0C12.0442 0 12.626 0.241004 13.055 0.669993C13.484 1.09898 13.725 1.68082 13.725 2.2875V3.05C13.725 3.25222 13.6447 3.44617 13.5017 3.58917C13.3587 3.73216 13.1647 3.8125 12.9625 3.8125C12.7603 3.8125 12.5663 3.73216 12.4233 3.58917C12.2803 3.44617 12.2 3.25222 12.2 3.05V2.2875C12.2 2.08527 12.1197 1.89133 11.9767 1.74833C11.8337 1.60533 11.6397 1.525 11.4375 1.525H2.2875C2.08527 1.525 1.89133 1.60533 1.74833 1.74833C1.60533 1.89133 1.525 2.08527 1.525 2.2875V16.0125C1.525 16.2147 1.60533 16.4087 1.74833 16.5517C1.89133 16.6947 2.08527 16.775 2.2875 16.775H11.4375C11.6397 16.775 11.8337 16.6947 11.9767 16.5517C12.1197 16.4087 12.2 16.2147 12.2 16.0125V15.25C12.2 15.0478 12.2803 14.8538 12.4233 14.7108C12.5663 14.5678 12.7603 14.4875 12.9625 14.4875C13.1647 14.4875 13.3587 14.5678 13.5017 14.7108C13.6447 14.8538 13.725 15.0478 13.725 15.25V16.0125C13.725 16.6192 13.484 17.201 13.055 17.63C12.626 18.059 12.0442 18.3 11.4375 18.3ZM15.9286 9.49312C15.9854 9.37125 16.009 9.23654 15.9969 9.10263C15.9849 8.96872 15.9376 8.84038 15.86 8.73062L13.5725 5.68062C13.4511 5.51884 13.2705 5.41188 13.0703 5.38328C12.8701 5.35468 12.6668 5.40678 12.505 5.52812C12.3432 5.64946 12.2363 5.83009 12.2077 6.03029C12.1791 6.23048 12.2312 6.43384 12.3525 6.59562L13.725 8.38749H6.86249C6.66027 8.38749 6.46632 8.46783 6.32333 8.61082C6.18033 8.75382 6.09999 8.94776 6.09999 9.14999C6.09999 9.35222 6.18033 9.54616 6.32333 9.68916C6.46632 9.83216 6.66027 9.91249 6.86249 9.91249H15.25C15.3908 9.91206 15.5287 9.87265 15.6485 9.79863C15.7683 9.72461 15.8652 9.61886 15.9286 9.49312ZM13.5725 12.6575L14.1444 11.895C14.2299 11.8212 14.2979 11.7293 14.3435 11.6259C14.3892 11.5226 14.4113 11.4104 14.4083 11.2975C14.4053 11.1846 14.3772 11.0737 14.3261 10.973C14.275 10.8722 14.2022 10.7841 14.1128 10.7149C14.0235 10.6458 13.9199 10.5973 13.8096 10.5731C13.6993 10.5489 13.5849 10.5495 13.4748 10.5748C13.3648 10.6002 13.2617 10.6497 13.1731 10.7198C13.0845 10.7898 13.0125 10.8787 12.9625 10.98L12.3906 11.7425C12.2693 11.9043 12.2172 12.1076 12.2458 12.3078C12.2744 12.508 12.3813 12.6887 12.5431 12.81C12.7049 12.9313 12.9083 12.9834 13.1084 12.9548C13.3086 12.9262 13.4893 12.8193 13.6106 12.6575H13.5725ZM13.2522 12.9015C13.3446 12.8627 13.4297 12.8086 13.5039 12.7414C13.5366 12.7051 13.5672 12.6669 13.5954 12.627C13.6242 12.5845 13.6473 12.5383 13.664 12.4897C13.6912 12.4474 13.7117 12.4011 13.725 12.3525C13.7287 12.3017 13.7287 12.2508 13.725 12.2C13.7222 11.9981 13.6432 11.8047 13.5039 11.6586C13.4297 11.5914 13.3446 11.5372 13.2522 11.4985C13.1142 11.4345 12.9602 11.4132 12.81 11.4375C12.7622 11.4457 12.7159 11.4611 12.6727 11.4832C12.6259 11.4985 12.582 11.5217 12.5431 11.5519L12.4211 11.6434C12.2782 11.7933 12.1989 11.9928 12.2 12.2C12.1994 12.3003 12.2186 12.3998 12.2566 12.4927C12.2945 12.5856 12.3504 12.6701 12.4211 12.7414L12.5431 12.8329C12.582 12.863 12.6259 12.8863 12.6727 12.9015L12.81 12.9472H12.9625C13.0611 12.9509 13.1595 12.9353 13.2522 12.9015Z" fill="white" />
                        </svg>
                        <span>Log out</span>

                    </Link>
                </div>
            </nav>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={(props) => <HomePage {...props} posts={posts} fetchPosts={() => fetchPosts()} />}
                />
                <Route
                    exact
                    path="/profile"
                    render={(props) => <ProfilePage {...props} />}
                />
                <Route
                    exact
                    path="/following"
                    render={(props) => <FollowingPage {...props} />}
                />
                <Route
                    exact
                    path="/post"
                    render={(props) => <PostPage {...props} />}
                />
            </Switch>
            <nav className="hori-nav">
                <div className="nav__search-bar">
                <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.198 17.0005C14.0841 17.0004 13.9714 16.9752 13.8677 16.9266C13.7639 16.8781 13.6713 16.8073 13.5961 16.719L10.4982 13.1004C9.55662 13.7123 8.48468 14.0783 7.37517 14.1665C6.26566 14.2547 5.15204 14.0626 4.13073 13.6066C3.10943 13.1507 2.21124 12.4448 1.51394 11.55C0.816647 10.6553 0.341272 9.59859 0.128984 8.47153C-0.0705058 7.43032 -0.0410912 6.3562 0.215062 5.32827C0.471216 4.30034 0.947584 3.34478 1.60909 2.53197C2.27059 1.71915 3.10038 1.06978 4.03734 0.631675C4.97431 0.19357 5.99459 -0.0221115 7.02305 0.00051419C8.7251 0.0514517 10.3493 0.747503 11.5855 1.95572C12.8217 3.16394 13.5831 4.79966 13.7245 6.55044C13.8027 7.58274 13.6602 8.62016 13.3072 9.58941C13.2316 9.79475 13.0801 9.96071 12.8859 10.0508C12.6917 10.1408 12.4709 10.1476 12.2718 10.0697C12.0728 9.99172 11.912 9.83538 11.8247 9.63505C11.7374 9.43473 11.7308 9.20683 11.8064 9.00149C12.1011 8.18857 12.203 7.31471 12.1036 6.45286C12.0043 5.59101 11.7065 4.7662 11.2352 4.04731C10.7639 3.32841 10.1327 2.73629 9.39433 2.3204C8.65599 1.90451 7.83192 1.67692 6.99094 1.65663C6.20399 1.6327 5.42208 1.794 4.70455 2.12829C3.98701 2.46259 3.35268 2.96109 2.84969 3.586C2.04576 4.57769 1.61039 5.83236 1.62162 7.12516C1.63285 8.41795 2.08994 9.66437 2.91097 10.641C3.73201 11.6177 4.86331 12.2608 6.10214 12.455C7.34098 12.6492 8.60636 12.3819 9.67152 11.701C9.99062 11.5016 10.3671 11.4231 10.7361 11.479C11.1052 11.5349 11.4439 11.7217 11.694 12.0073L14.7919 15.6259C14.8937 15.7455 14.96 15.8928 14.9827 16.0502C15.0055 16.2076 14.9839 16.3684 14.9203 16.5134C14.8568 16.6584 14.7542 16.7815 14.6247 16.8679C14.4951 16.9543 14.3442 17.0003 14.19 17.0005H14.198Z" fill="white"/>
</svg>
                    <input type="search" placeholder="Search Profiles" />
                </div>
                <div className="--flex-row">
                        <CreatePost fetchPosts={() => fetchPosts()} />
                        <img className="nav__avatar" src={`${auth.user.image}`} />
                </div>
            </nav>
        </Fragment>
    )
}

export default Nav;