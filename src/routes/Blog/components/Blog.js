import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { useState } from 'react';
import './_Blog.scss';
import dataBlog from './dataBlog';
import BlogArticle from './BlogArticle';
import BlogDetails from './BlogDetails';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';

function Blog() {
  const [searchArticle, setSearchArticle] = useState('')
  const [filterTags, setFilterTags] = useState([])

  const scrollUp = () => {
    document.scrollingElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div>
      <NavBar scrollUp={scrollUp} />
          <Router>
              <Route path="/blog">
                  <div className="blog">
                    
                    <div className="container">
                      <div className="search-article">
                        <form classname="search-form-blog">
                          <input className="search-bar-blog" type="text" placeholder="Search for an article" onChange={event => {setSearchArticle(event.target.value)}}/>
                        </form>
                        <i className="fas fa-search fa-2x"></i>
                      </div>
                      <div className="search-tags">
                        <button className="ecology">#Ecology</button>
                        {console.log(filterTags)}
                        <button className="inspiration">#Inspiration</button>
                        <button className="traveltips">#Traveltips</button>
                        <button className="destinations">#Destinations</button>
                        <button className="pading">#Pading</button>
                        <button className="culture">#Culture</button>
                      </div>
                      {dataBlog.cardData.filter((val) => {
                        if (searchArticle === '') {
                          return val
                        } else if (val.title.toLowerCase().includes(searchArticle.toLowerCase())) {
                          return val
                        } else if (val.tags && val.tags.join().toLowerCase().includes(searchArticle.toLowerCase())) {
                          return val
                        }
                      }).map((item, index) => {
                          return (
                              <BlogArticle key={index} title={item.title} img={item.img} description={item.description} tags={item.tags} date={item.date} link={`/blogarticle/${item.id}`} />
                          )
                      })}
                    </div>
                  </div>
              </Route>
              <Route path="/blogarticle/:id" render={props => (
                    <BlogDetails {...props} />
              )}>
              </Route>      
          </Router>
      <Footer scrollUp={scrollUp} />
    </div>
  )
}

export default Blog;
