import React, {useState,useEffect,  useContext} from "react";
import { AuthContext } from "../../context/auth-context";
import server from "../../api"
import FollowingItem from "./FollowingItem"
import './style.css';

const FollowingPage = () => {
    const auth = useContext(AuthContext);

    const [following, setFollowing] = useState([]);


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
            const options = {
                headers: {
                    'Authorization': 'Bearer ' + auth.token,
                    'Content-Type': 'application/json'
                }
            }
            let res = await server.get('users/following', options)
            setFollowing(res.data.data.following)
            console.log("GET SERVICE RESPONSE: ", res)
        } catch (err) {
            handleErrors(err);    
        }
    }
    useEffect(() => {
        fetchFollowing()
    }, [])


    return (
      <div>
        <section>
          <div className="container">
            <h1>Following</h1>
            {following.length < 1 && <h3>You are not following anyone yet</h3>}
              {following.map((user) => {
                  return (
                      <FollowingItem user={user} auth={auth}
                    fetchFollowing={() => fetchFollowing()}  />
                );
              })}
          </div>
        </section>
      </div>
    );
}

export default FollowingPage;