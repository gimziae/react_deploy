import axios from 'axios';
import { useEffect, useRef, useState } from "react";

export default function Gallery(){ 
  let main = useRef(null);
  const [items, setItems] = useState([]);
  const [isPop, setIsPop] = useState(false);
  const [index, setIndex] = useState(0);
  const api_key = '89aae050d1d8c006bdb5bf866029199d';
  const method1 = 'flickr.interestingness.getList';
  const num = 20;
  const url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1`;

  useEffect(()=>{
    main.current.classList.add('on');

    axios.get(url).then(json=>{   
      setItems(json.data.photos.photo);
    })
  },[]);

  return (
    <>
    <main className="content gallery" ref={main}>
      <figure></figure>
      
      <div className="inner">
        <h1>Gallery</h1>
        <section>
          {items.map((item,idx)=>{
            return (
              <article key={idx}>
                <div className="inner">
                  <div className="pic" data={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} onClick={()=>{
                    setIsPop(true);
                    setIndex(idx);
                  }}>
                    <img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} />
                  </div>

                  <h2>{item.title}</h2>
                </div>
              </article>
            )            
          })}
        </section>
      </div>
    </main>

    { isPop ? <Popup /> : null }
    </>
  )

  function Popup(){
    useEffect(()=>{
      document.body.style.overflow = 'hidden';
      return ()=> document.body.style.overflow = 'auto';     
    },[])

    return (
      <aside className="popup">
        <h1>{items[index].title}</h1>
        <img src={`https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`} />        
        <span onClick={()=>{
          setIsPop(false);
        }}>close</span>
      </aside>
    )
  }
}

