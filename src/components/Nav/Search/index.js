import React, { useState, useContext, useEffect } from 'react';
import * as UserService from '../../../api/UserService';
import { useHistory } from 'react-router'; 

const Search = () => {
    //const [state] = useContext(UserContext);
    const history = useHistory();
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([])

    const searchUser = async (e) => {
        e.preventDefault();
        // console.log(`Find "${query}" from database`);
        try {
            const res = await UserService.searchUser(query);
            console.log('Search user response =>', res.data);
            if (res.data.length < 1) alert("No user matches found")
            setResult(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const onKeyPress = async (e) => {
        if(e.which === 13) {
            await searchUser(e);
        }
    }

    useEffect(() => {
        if (result.length < 1) {
            return
        } else {
            history.push({
                pathname: '/search',
                search: `?query=${query}`,
                state: result
            })
        }
    }, [result])

    return (
        <div>
            <input 
                type="search" 
                placeholder="Search Profiles" 
                onKeyPress={onKeyPress}
                value={query}
                onChange={(e) => setQuery(e.target.value)} 
            />
        </div>
    )
}

export default Search
