import React, {useState,useEffect, useContext} from "react";
import { AuthContext } from "../../context/auth-context";
import { useLocation } from "react-router";
import * as UserService from "../../api/UserService";
import SearchItem from "./SearchItem"
import './style.css';

const SearchPage = () => {
    const auth = useContext(AuthContext);
    const location = useLocation();
    const [following, setFollowing] = useState([]);
    const result = location.state;

    const handleErrors = (err) => {
      if (err.response) {
        console.log("Problem with response");
        console.log(err.response);
        alert(err.response.data.message);
      } else if (err.request) {
        console.log("Problem with request");
        console.log(err.request);
        alert(err.request.data);
      } else {
        console.log("Error during login");
        console.log(err.message);
      }
    }; 


    const fetchFollowing = async () => {
        try {
            let res = await UserService.getMyFollowing(auth.token)
            setFollowing(res.data.data.following)
            console.log("GET SERVICE RESPONSE: ", res)
        } catch (err) {
            handleErrors(err);    
        }
    }

    useEffect(() => {
      console.log(location.pathname)
      console.log(location.search)
      console.log(result)
    }, [location])

    useEffect(() => {
        fetchFollowing()
    }, [])


    return (
      <div>
        <section>
          <div className="container">
            <h1>Search Results</h1>
            {result.length < 1 && <h3>No users matching search</h3>}
              {result.map((user) => {
                  return (
                      <SearchItem user={user} auth={auth} fetchFollowing={() => fetchFollowing()}
                      />
                );
              })}
          </div>
        </section>
      </div>
    );
}

export default SearchPage;