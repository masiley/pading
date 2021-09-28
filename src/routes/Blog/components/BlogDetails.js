import React from 'react';
import { Link } from 'react-router-dom';
import dataBlog from './dataBlog';
import './_BlogDetails.scss';

export default class BlogDetails extends React.Component {
    render() {

        let getId = this.props.match.params.id
        const getData = dataBlog.cardData[getId - 1];
        return (
            <div className="blog-article">
                <div className="blog-article-content">
                    <Link to='/blog'><i className="fas fa-arrow-circle-left fa-2x"></i></Link>
                    <h1>{getData.title}</h1>
                    {console.log(getData)}
                    <span className="blog-article-date">{getData.date}</span>
                    <div className="blog-article-tags">
                        {getData.tags && getData.tags.map((tag, index) => {
                            return <span index className={tag}>#{tag}</span>
                        })}
                    </div>  
                    <img src={getData.img} alt={getData.img2Alt}/>
                    <p>{getData.description}</p>
                    {getData.img2 && <img src={getData.img2} alt={getData.img2Alt}/>}
                    {getData.description2 && <p>{getData.description2}</p>}
                </div>
            </div>
        )
    }
}