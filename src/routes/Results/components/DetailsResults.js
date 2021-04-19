import React from 'react';
import './_DetailsResults.scss';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FlightInfo from './FlightInfo.js';

export default function DetailsResults(props) {
  return (
    <div>
      <div className="details-results-travel">
        <div className="details-results-travel-way">
          <div className="details-results-travel-way-city">
            <h4>To {props.destination}</h4>
          </div>
          {props.trip.departureRoutes.map((route) => {
            return (
              <FlightInfo
                route={route}
                duration={props.trip.duration}
                travelers={props.trip.travelers}
              />
            );
          })}
        </div>

        <div className="details-results-travel-return">
          <div className="details-results-travel-return-city">
            <h4>To {props.cityFrom}</h4>
          </div>
          {props.trip.arrivalsRoutes.map((route) => {
            return (
              <FlightInfo
                route={route}
                duration={props.trip.duration}
                travelers={props.trip.travelers}
              />
            );
          })}
        </div>
      </div>

      <div className="details-results-share-book">
        <div className="details-results-share">
          <a href="whatsapp://send?text=https://kiwi.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-whatsapp fa-2x"></i>
          </a>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https://kiwi.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-messenger fa-2x"></i>
          </a>
          <CopyToClipboard text={'https://kiwi.com'} className="clipboard-btn">
            <button>
              <i className="fas fa-link fa-2x"></i>
            </button>
          </CopyToClipboard>
        </div>
        <div className="details-results-price-book">
          <h4 className="ticket-price">{props.trip.price}€</h4>
          <button className="details-results-book">
            <h4>Book ticket</h4>
          </button>
        </div>
      </div>
    </div>
  );
}
