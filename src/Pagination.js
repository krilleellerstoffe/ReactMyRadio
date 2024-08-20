import React from 'react';
import  "./App.css"

export default function Pagination({currentPage, totalResults, updatePage, getPage}) {

    const backButtonDisabled = currentPage <= 1
    const nextButtonDisabled = totalResults <= (currentPage * 10)

    function handleBackClick(event) {
        updatePage(currentPage - 1)
        
        getPage(currentPage)
    }
    function handleNextClick(event) {
        updatePage(currentPage + 1)
        
        getPage(currentPage)
    }

    return (
        
        <div className="pagination">
            <button disabled={backButtonDisabled} onClick={handleBackClick}>Previous page</button>
            <p className="sub-text">{currentPage}</p>
            <button disabled={nextButtonDisabled} onClick={handleNextClick}>Next Page</button>
        </div>
            
      );
};