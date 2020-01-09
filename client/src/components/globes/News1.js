import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const { useState, useEffect, useMemo } = React;

const News1 = (props) => {
    console.log('dsdsds',props);
    
    const [data, setData] = useState(false);
    
    const info = props.articles.articles;
    console.log('THIS IS INFO', info);
    



    useEffect(() => {
        
        ifdata();

    })


    const ifdata = () => {
        
        if(info) {
            
            if(info.length > 0) {
                setData(true)   
                console.log('byeeeeeeeeeeeeee');           
        }
    }
    }

    const iframeVisibility = (selectedUrl) => {
              props.getUrl(() => {
                  console.log('news 1 selected url', selectedUrl);
                  
                return selectedUrl;
            }
        )
        props.toggleIframe();
        //props.togglePopUp();
    }


    // useEffect(() => {
    //   // load data
    //   fetch('https://newsapi.org/v2/top-headlines?country=ph&apiKey=6c94c3ee727d4018aaa464174e7163d3')
    //     .then(res => res.json())
    //     .then(data => {
    //         setNews(data)
    //         console.log('fetch news',data)
    //     } )
    //     .catch((error) => console.log('The error is ', error))
    // }, []);

    const handleButtonClick = () => {
        props.toggleIframe();
    }
    let title;
    let description;
    
    return (
        <div>
            {
              data ? info.map((e, index) => (
        <Card key={index} className="cardsss" style={{ width: '28rem' }}>
            <CardImg variant="top" src={e.image} style={{ width: '100%' }}/>
            <CardBody style={{ width: '100%' }}>
             <CardTitle>{e.title}</CardTitle>
            <CardText> {e.description}
            </CardText>
            <Button key={index} target="iframea" onClick={handleButtonClick} href={e.url}> {e.source.name} </Button>
            </CardBody>
        </Card>)) : <p>No data</p>
            }

        </div>
    );
}
export default News1;