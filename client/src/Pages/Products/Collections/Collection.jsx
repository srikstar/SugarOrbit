import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Collection.css';

function Collection() {
  const navigate = useNavigate();

  const items = [
    {
      image: 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg',
      name: "Agra Petha",
      price: "68.57",
      options: ["150 gms", "250 gms", "500 gms", "1 kg"],
      description : "Our best sellers are customer favorites, loved for their irresistible flavors and perfect balance."
    },
    {
      image: 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg',
      name: "Anjeer Burfi",
      price: "211.43",
      options: ["150 gms", "250 gms", "500 gms", "1 kg"],
      description : "Our best sellers are customer favorites, loved for their irresistible flavors and perfect balance."
    },
    {
      image: 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg',
      name: "Mysore Pak",
      price: "120",
      options: ["250 gms", "500 gms", "1 kg"],
      description : "Our best sellers are customer favorites, loved for their irresistible flavors and perfect balance."
    },
    {
      image: 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg',
      name: "Mysore Pak",
      price: "120",
      options: ["250 gms", "500 gms", "1 kg"],
      description : "Our best sellers are customer favorites, loved for their irresistible flavors and perfect balance."
    },
    {
      image: 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg',
      name: "Mysore Pak",
      price: "120",
      options: ["250 gms", "500 gms", "1 kg"],
      description : "Our best sellers are customer favorites, loved for their irresistible flavors and perfect balance."
    },
    {
      image: 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg',
      name: "Mysore Pak",
      price: "120",
      options: ["250 gms", "500 gms", "1 kg"],
      description : "Our best sellers are customer favorites, loved for their irresistible flavors and perfect balance."
    },
    {
      image: 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg',
      name: "Mysore Pak",
      price: "120",
      options: ["250 gms", "500 gms", "1 kg"],
      description : "Our best sellers are customer favorites, loved for their irresistible flavors and perfect balance."
    },
    {
      image: 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg',
      name: "Mysore Pak",
      price: "120",
      options: ["250 gms", "500 gms", "1 kg"],
      description : "Our best sellers are customer favorites, loved for their irresistible flavors and perfect balance."
    },
    {
      image: 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg',
      name: "Mysore Pak",
      price: "120",
      options: ["250 gms", "500 gms", "1 kg"],
      description : "Our best sellers are customer favorites, loved for their irresistible flavors and perfect balance."
    },
    {
      image: 'https://www.shutterstock.com/image-photo/mysore-pak-traditional-popular-delicious-260nw-2572703781.jpg',
      name: "Mysore Pak",
      price: "120",
      options: ["250 gms", "500 gms", "1 kg"],
      description : "Our best sellers are customer favorites, loved for their irresistible flavors and perfect balance."
    }
  ];

  const handleProduct = () => {
    navigate('/product');
  }

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
          <p className='product-desc'>{item.description}</p>
          
          <div className="item-collection-container row-sb">
            <p className="product-price">Net Weight : 250g</p>
            <p className="product-price">Rs. {item.price}</p>
          </div>

          <button onClick={handleProduct} className="add-to-cart">
            View Options
          </button>

        </div>
      ))}
    </section>
  );
}

export default Collection;