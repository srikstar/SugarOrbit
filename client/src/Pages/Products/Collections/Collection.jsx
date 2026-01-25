import React from 'react';
import './Collection.css';

function Collection() {

  const items = [
    {
      image: 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg',
      name: "Agra Petha",
      price: "68.57",
      options: ["150 gms", "250 gms", "500 gms", "1 kg"]
    },
    {
      image: 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg',
      name: "Anjeer Burfi",
      price: "211.43",
      options: ["150 gms", "250 gms", "500 gms", "1 kg"]
    },
    {
      image: 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg',
      name: "Mysore Pak",
      price: "120",
      options: ["250 gms", "500 gms", "1 kg"]
    },
    {
      image: 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg',
      name: "Mysore Pak",
      price: "120",
      options: ["250 gms", "500 gms", "1 kg"]
    }
    ,
    {
      image: 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg',
      name: "Mysore Pak",
      price: "120",
      options: ["250 gms", "500 gms", "1 kg"]
    }
    ,
    {
      image: 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg',
      name: "Mysore Pak",
      price: "120",
      options: ["250 gms", "500 gms", "1 kg"]
    }
    ,
    {
      image: 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg',
      name: "Mysore Pak",
      price: "120",
      options: ["250 gms", "500 gms", "1 kg"]
    }
    ,
    {
      image: 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg',
      name: "Mysore Pak",
      price: "120",
      options: ["250 gms", "500 gms", "1 kg"]
    }
    ,
    {
      image: 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg',
      name: "Mysore Pak",
      price: "120",
      options: ["250 gms", "500 gms", "1 kg"]
    }
    ,
    {
      image: 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg',
      name: "Mysore Pak",
      price: "120",
      options: ["250 gms", "500 gms", "1 kg"]
    }
  ];

  return (
    <section className="collection-main-container row-sa">
      {items.map((item, index) => (
        <div className="product-card" key={index}>

          <img
            src={item.image}
            alt={item.name}
            className="product-image"
            draggable="false"
          />

          <h3 className="product-name">{item.name}</h3>
          <p className="product-price">₹{item.price}</p>


          <button className="add-to-cart">
            🛒 Add to Cart
          </button>

        </div>
      ))}
    </section>
  );
}

export default Collection;
