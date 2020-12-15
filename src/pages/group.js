import React , {useState , useRef , useCallback , useEffect} from 'react'
import Axios from 'axios'
import {Chart} from 'chart.js'
import SearchInput from '../components/searchImage.js'
import ChartPhotos from '../components/chartPhotos.js'
import {Link} from 'react-router-dom'
import GroupIcon from '../groups.jpg'

const Group = () =>{

  const [info , setInfo] = useState([])
  const [chartInfo , setChartInfo] = useState(false)
  const [query , setQuery] = useState("")
  const [pageNumber , setPageNumber] = useState(1)
  const cardsAccess = useRef()

  // useEffect(()=>{
  //   setRes([])
  // },[query])

  const infiniteScrolling = useCallback(node=>{
    if(cardsAccess.current){
      cardsAccess.current.disconnect()
    }
    cardsAccess.current = new IntersectionObserver( entry =>{
      if(entry[0].isIntersecting){
  //      console.log(entry)
        setPageNumber(prevPage =>{
          return prevPage+1
        })
      }
    })
    if (node) {
      cardsAccess.current.observe(node)
    }
  },[])


  const axiosCall = (query , pageNumber) =>{
    debugger;
    const abc = Axios.get(" https://www.flickr.com/services/rest/?method=flickr.groups.search&api_key=4c2a150dc5785ce875106ab979a77b7e&text="+query+"&page="+pageNumber+"&per_page=20&format=json&nojsoncallback=1")
    .then(
      response =>{
  //       console.log(response)
        return response
      }
    )
    .then(
      response =>{

       console.log(response)
       const groupInfo = response.data.groups.group.map(item =>{

        return [item.name , item.members]
       })


       setInfo(groupInfo)

       const chartData = response.data.groups.group.map(item=>{
         return [item.name , item.pool_count ]

    })
      setChartInfo(chartData)
    }
    )
    .catch(()=>console.log("query not given"))
  }


useEffect(() => {
  axiosCall(query , pageNumber)
}, [query,pageNumber])


  const handleRequest = (e) =>{
    setQuery(e.target.value)
    setPageNumber(1)
  }



  return(
    <>
    <div className="group">
    <div className="group-header">
    <h1><u>GROUP</u></h1>
    <SearchInput reqHandle = {handleRequest} />
    <div className="chart">
      {chartInfo&&<ChartPhotos info={chartInfo} />}
    </div>
    </div>
    <div className="grid">
    {
      info.map( (item,index)=>{
      if(info.length == index+1){

          return <div ref={infiniteScrolling} className="group-items"><Link to="/gallery"><img src={GroupIcon}></img><br /><h2>{item[0]}</h2><br />Members: {item[1]}</Link></div>
      }
      else{
          return <div className="group-items"><Link to="/gallery"><img src={GroupIcon}></img><br /><h2>{item[0]}</h2><br />Members: {item[1]}</Link></div>
      }

    })}
    </div>
    </div>
    </>
  )
}

export default Group
