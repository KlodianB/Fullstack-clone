import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchResults, fetchSearchResults } from "../../store/search";
import { useHistory } from "react-router-dom";

const NavSearch = () => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const searchResults = useSelector(state => Object.values(state.search))
    const history = useHistory();

    const handleChange = (e) => {
        const q = e.target.value;
        setQuery(q);
        if (q.trim() !== "") {
            dispatch(fetchSearchResults(q))
        } else {
            dispatch(clearSearchResults())
        }
    }

    const handleClickLink = (id) => {
        return(e) => {
            e.preventDefault();
            history.push(`/users/${id}`)
            dispatch(clearSearchResults);
            setQuery("");
        }
    }


    return  (
        <div className="searchbar-container">
            <div className="relative-container"> 
                <input type="text" id="search-input" placeholder="Search Facebook" value={query} onChange={handleChange} />
                {query && 
                    <ul id="search-dropdown">
                        {searchResults.map(result => (
                            <li key={result.id} onClick={handleClickLink(result.id)} className="search-dropdown-item">
                                {result.firstName} {result.lastName}
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </div>
    )
    
}

export default NavSearch;