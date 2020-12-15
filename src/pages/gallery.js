import React , {useState , useRef , useCallback , useEffect} from 'react'
import Axios from 'axios'
import {Card} from 'react-bootstrap'
import SearchInput from '../components/searchImage.js'

const Gallery = () =>{

  const [info , setInfo] = useState([])
  const [query , setQuery] = useState("")
  const [pageNumber , setPageNumber] = useState(1)
  const cardsAccess = useRef()

/*Infinite scrolling*/
  const infiniteScrolling = useCallback(node=>{
    if(cardsAccess.current){
      cardsAccess.current.disconnect()
    }
    cardsAccess.current = new IntersectionObserver( entry =>{
      if(entry[0].isIntersecting){

        setPageNumber(prevPage =>{
          return prevPage+1
        })

      }
    })
    if (node) {
      cardsAccess.current.observe(node)
    }
  },[])

/*API call whenever the user queries the page*/
  const axiosCall = (query , pageNumber) =>{

    const abc = Axios.get(" https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=4c2a150dc5785ce875106ab979a77b7e&tags="+query+"&format=json&nojsoncallback=1&page="+pageNumber+"&per_page="+20+"")
    .then(
      response =>{
        const images =
        response.data.photos.photo.map( item =>{
          let src = "https://farm"+item.farm+".staticflickr.com/"+item.server+"/"+item.id+"_"+item.secret+".jpg"
          return src
        })



        return [response.data.photos.photo.map( item =>{
          return [item.id , item.secret]
        }) , images]
      }
    )
    .catch(()=>console.log("query not given"))
    .then((response)=>{

      const images = response.pop()

      response[0].map((item , index )=>{
        Axios.get("https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=4c2a150dc5785ce875106ab979a77b7e&photo_id="+item[0]+"&secret="+item[1]+"&format=json&nojsoncallback=1")
        .then(response =>{

         setInfo(prev => [...prev, [images[index] , response.data.photo.title._content , response.data.photo.owner.realname , response.data.photo.description._content]]);
        })
      })

    })
    .catch(()=>console.log("query not given"))

       console.log(info)
  }

  useEffect(() => {
    axiosCall(query , pageNumber)
  }, [query,pageNumber])



/*This function gets called whenever the user queries the page*/
  const handleRequest = (e) =>{
    setQuery(e.target.value)
    setPageNumber(1)
  }



  return(
    <>
    <div className="gallery">
    <section className="group-header">
    <h1><u>GALLERY</u></h1>
    <SearchInput reqHandle = {handleRequest} />
    </section>
    <div className="grid">
    {
      info.map( (item,index)=>{
      if(info.length == index+1){

          return <div ref={infiniteScrolling} className="items"><img alt="error" className = "grid-item" src={item[0]} /><br /><div><b>{item[1]}</b>
          <br /><b>AUTHOR: </b>{item[2]}<br />{item[3]}</div></div>
      }
      else{
          return <div className="items"><img alt="error" className = "grid-item" src={item[0]} /><br /><div><b>{item[1]}</b>
          <br /><b>AUTHOR: </b>{item[2]}<br />{item[3]}</div></div>
      }

    })}
    </div>
    </div>

    </>
  )
}

export default Gallery
