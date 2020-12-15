import React from 'react'
import {BrowserRouter , Switch , Route} from 'react-router-dom'
import Group from './group.js'
import Gallery from './gallery.js'


const ImageSearch = () =>{
  return(
    <>
    <BrowserRouter>
    <Switch>
    <Route path="/group/" exact component={Group} />
    <Route path="/gallery" exact component={Gallery} />
    </Switch>
    </BrowserRouter>
    </>
  )
}

export default ImageSearch
