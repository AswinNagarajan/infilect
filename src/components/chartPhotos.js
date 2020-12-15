import React , {useState,useEffect} from 'react'
import Axios from 'axios'
import {Chart} from 'chart.js'

const ChartPhotos = (props) =>{


useEffect(()=>{
  var ctx = document.getElementById('myChart').getContext('2d');
  var myBarChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: props.info.map(item=>item[0]),
        datasets: [{
            data: props.info.map(item=>item[1]),
            backgroundColor: "#A8B7FF"
        }]},
        options: {
  legend: { display: false },
  title: {
    display: true,
    text: 'Photos uploaded in groups'
  }
}})
},[props.info])



  return(
    <>
      <canvas id="myChart">
      </canvas>
    </>
  )
}

export default ChartPhotos
