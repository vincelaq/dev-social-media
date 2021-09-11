import React from "react";

const Filters = () => {
    return (
        <div className="filter-wrap">

            {/* View all posts or just your followers posts */}
            <div>
                <p>Dashboard</p>
                <p className="filter__btn">All Posts</p>
                <p className="filter__btn">Following</p>
            </div>
            
            {/* Filter by code language */}
            <div>
                <img className="language-icon"/>
                <button>Languages<img className="btn__icon"/></button>
                <div className="language__drop-down">
                    {/* display 50 of the top languages */}
                    <div>
                        <img className="language-icon"/>
                        <p>Language</p>
                    </div>
                    <p>Other</p>
                </div>
            </div>
        </div>
    )
}

export default Filters