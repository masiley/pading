import React from 'react';
import {Route, Link} from 'react-router-dom';
import './_BlogArticle.scss';


export default class BlogArticle extends React.Component {
    render() {
        return (
            <Route>
                <Link to={this.props.link} className="article-card">
                    <img src={this.props.img} alt={this.props.imgAlt}/>
                    <div className="article-card-body">
                        <h5>{this.props.title}</h5>
                        <div className="article-tags">
                            {this.props.tags && this.props.tags.map((tag, index) => {
                                return <span index className={tag}>#{tag}</span>
                            })}
                        </div>
                        <span className="article-date">{this.props.date}</span>       
                    </div>
                </Link>
            </Route>
        )
    }
}