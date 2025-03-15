'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSingleLog } from '../../../api/logData';
import { getAllRoutines } from '../../../api/routineData';
import { getAllProducts } from '../../../api/productData';
import { getAllHairtypes } from '../../../api/hairtypeData'; // Import the function to get all hairtypes

const initialState = {
  name: '',
  hairtype_id: '',
  condition_id: '',
  product_recs: '',
  conditions: '',
  notes: '',
};

export default function ViewLog({ params }) {
  const { firebaseKey } = params;
  const [logDetails, setLogDetails] = useState(initialState);
  const [routines, setRoutines] = useState([]);
  const [products, setProducts] = useState([]);
  const [hairtypes, setHairtypes] = useState([]);
  const [hairtypeName, setHairtypeName] = useState('');

  useEffect(() => {
    getSingleLog(firebaseKey).then(setLogDetails);

    getAllHairtypes().then(setHairtypes);
  }, [firebaseKey]);

  useEffect(() => {
    getAllRoutines().then((getTheRoutines) => {
      setRoutines(getTheRoutines.filter((routine) => routine.condition_id === logDetails.condition_id));
    });

    getAllProducts().then((getTheProducts) => {
      setProducts(getTheProducts.filter((product) => product.condition_id === logDetails.condition_id));
    });
  }, [logDetails.condition_id]);

  useEffect(() => {
    if (logDetails.hairtype_id && hairtypes.length) {
      const hairtype = hairtypes.find((ht) => ht.firebaseKey === logDetails.hairtype_id);
      setHairtypeName(hairtype ? hairtype.hairtype : '');
    }
  }, [logDetails.hairtype_id, hairtypes]);

  return (
    <div className="view-log-container">
      <div className="view-log-card">
        <h2 className="log-title">{logDetails.name}</h2>
        <p className="log-notes">Notes: {logDetails.notes}</p>
        <p className="log-hairtype">Hairtype: {hairtypeName}</p>
        <h3 className="routine-recs">Recommended Routines</h3>
        <ul className="routine-list">
          {routines.length ? (
            routines.map((routine) => (
              <li key={routine.firebaseKey} className="routine-item">
                <div className="routine-info">
                  <strong className="routine-name">{routine.steps}</strong>
                </div>
              </li>
            ))
          ) : (
            <li className="no-data">No routines available for this condition</li>
          )}
        </ul>
        <h3 className="product-recs">Recommended Products</h3>
        <ul className="product-list">
          {products.length ? (
            products.map((product) => (
              <li key={product.firebaseKey} className="product-item">
                <div className="product-info">
                  <strong className="product-name">
                    {product.name} ({product.brand})
                  </strong>
                  {product.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={product.image} alt={product.name} className="product-image" />
                  )}
                  <p className="product-description">{product.description}</p>
                  <a href={product.purchase_link} target="_blank" rel="noreferrer" className="purchase-link">
                    Buy Here
                  </a>
                </div>
              </li>
            ))
          ) : (
            <li className="no-data">No products available for this condition</li>
          )}
        </ul>
      </div>
    </div>
  );
}

ViewLog.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
  }).isRequired,
};
