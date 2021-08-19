import React, {useState, useEffect} from "react";

export default function App() {

  const randomColor = ['green', 'blue', 'red', 'orange', 'pink']
  const [list, setList] = useState([])
  const [after, setAfter] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const URL = 'https://www.reddit.com/r/eyebleach/.json?limit=15&after='

  useEffect(()=>{
    fetch(URL + after)
    .then(res => res.json())
    .then(data => {
      setList([...list, ...data.data.children.filter((item) => item.data.post_hint === 'image')])
      setAfter(data.data.after)
      setIsLoading(false)
    })
  },[isLoading])

  
  const template = list.map((value, index) => {
    return (
      <div className="imgWrap">
        <img src={value.data.url}></img>
      </div>
    );
  });
  
  const handleScroll = (e) => {
    const scrollElem = document.querySelector('.scrollContainer')
    const trigger = scrollElem.scrollTop + scrollElem.offsetHeight

    if(trigger + 10 > scrollElem.scrollHeight){
      setIsLoading(true)

    }
    return
  }

  return (
    <div className="App" >
      <h1 className="display-1 fst-italic fw-bolder">Infinite Scroll</h1>
      <h2 className="fw-bolder">Start Scrolling with mouse to see the magic!</h2>

      <div
        className="scrollContainer myGrid"
        onScroll={handleScroll}
      >
        {template}
      </div>
    </div>
  );
}
