import React, {useState, useEffect} from 'react';
import '../Styles/styles.css';
import axios from 'axios';

const Services = () => {
   const [services, setServices] = useState([]);
   
   useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/services/')
    .then(res => {
        setServices(res.data)
    })
    .catch(err => {
        console.error("Error fetching services:", err);
    });
   }, []);


     return (
        <section className='services'>
        <div className="Service-header">
            <h1>Services</h1>
             <p>Explore our curated travel experiences</p>
        </div>
        <div className="service-grid">
            {services.map(service=> (
               <div key={service.id} className="service-item">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <img src={`http://127.0.0.1:8000${service.image}`} alt={service.title} />
                </div>
            ))}
        </div>
        </section>
     )

}

export default Services;