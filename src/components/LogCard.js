'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleLog } from '../api/logData';
import { useAuth } from '../utils/context/authContext';

export default function LogCard({ logObj, onUpdate }) {
  const deleteLog = () => {
    if (window.confirm(`Delete ${logObj.name}?`)) {
      deleteSingleLog(logObj.firebaseKey).then(() => onUpdate());
    }
  };

  const { user } = useAuth();

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      {logObj.image && <Card.Img variant="top" src={logObj.image} alt={logObj.name} style={{ height: '300px' }} />}
      <Card.Body className="card-content">
        <Card.Title className="card-title">{logObj.name}</Card.Title>
        <Card.Subtitle className="card-subtitle">{logObj.notes}</Card.Subtitle>
        <div className="icon-buttons">
          <Link href={`/log/${logObj.firebaseKey}`} passHref>
            <Button variant="link" className="icon-btn">
              <FaEye size={20} />
            </Button>
          </Link>

          {user.uid === logObj.uid && (
            <>
              <Link href={`/log/edit/${logObj.firebaseKey}`} passHref>
                <Button variant="link" className="icon-btn">
                  <FaEdit size={20} />
                </Button>
              </Link>
              <Button variant="link" className="icon-btn" onClick={deleteLog}>
                <FaTrash size={20} />
              </Button>
            </>
          )}
        </div>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Created on {logObj.created_at}</small>
      </Card.Footer>
    </Card>
  );
}

LogCard.propTypes = {
  logObj: PropTypes.shape({
    name: PropTypes.string,
    conditions: PropTypes.string,
    image: PropTypes.string,
    hairtype_id: PropTypes.string,
    notes: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
    created_at: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
