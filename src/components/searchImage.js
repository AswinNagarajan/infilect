import React , {useState} from 'react'


const SearchImage = (props) =>{
/*Bootstrap is used for the text fields . When user types render props functionality gets run*/
  return(
    <>

    <div className="header">
    <div className="searchImage">
    <div class="input-group flex-nowrap">
  <input type="text" class="form-control" placeholder="Search Image" aria-label="Username" aria-describedby="addon-wrapping" onChange={props.reqHandle} />
</div>
    <button type="button" className="btn btn-primary" onClick={props.reqHandle}>SEARCH</button>
    </div>
    </div>

    </>
  )
}

export default SearchImage
