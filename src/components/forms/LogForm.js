'use client';

/* eslint-disable */

import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useAuth } from '@/utils/context/authContext';
import { createLog, updateLog } from '@/api/logData';
import { getAllHairtypes } from '../../api/hairtypeData';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { getAllConditions } from '../../api/conditionsData';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const initialState = {
  name: '',
  // user_id: '',
  hairtype_id: '',
  condition_id: '',
  image: '',
  notes: '',
  favorite: false,
  product_recs: false,
  public: false,
  created_at: '',
};

function LogForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(initialState);
  const [hairtypes, setHairtype] = useState([]);
  const [conditions, setConditions] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getAllHairtypes().then(setHairtype);

    getAllConditions().then(setConditions);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateLog(formInput).then(() => router.push(`/profile/${user.uid}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createLog(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateLog(patchPayload).then(() => {
          router.push(`/profile/${user.uid}`);
        });
      });
    }
  };

  const handleToggleChange = () => {
    setFormInput((prevState) => ({
      ...prevState,
      public: !prevState.public,
    }));
  };

  const handleFavToggleChange = () => {
    setFormInput((prevState) => ({
      ...prevState,
      favorite: !prevState.favorite,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3 className="new-form">{obj.firebaseKey ? 'Update' : 'Create'} Log</h3>

      {/* LOG NAME  */}
      <Form.Group controlId="floatingInput1" label="Log Name" className="mb-3">
        <Form.Control type="text" placeholder="log entry name" name="name" value={formInput.name} onChange={handleChange} required />
      </Form.Group>

      {/* HAIRTYPE INPUT  */}
      <FloatingLabel controlId="floatingSelect" label="Hairtype">
        <Form.Select aria-label="Hairtype" name="hairtype_id" onChange={handleChange} className="mb-3" value={formInput.hairtype_id || ''} required>
          <option value="">What's your hairtype?</option>
          {hairtypes.map((hairtype) => (
            <option key={hairtype.firebaseKey} value={hairtype.firebaseKey}>
              {hairtype.hairtype}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* CONDITIONS FEATURE */}
      <FloatingLabel controlId="floatingSelect2" label="Condition">
        <Form.Select aria-label="Condition" name="condition_id" onChange={handleChange} className="mb-3" value={formInput.condition_id || ''} required>
          <option value="">Hair Condition</option>
          {conditions.map((condition) => (
            <option key={condition.firebaseKey} value={condition.firebaseKey}>
              {condition.name}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <Form.Group controlId="floatingInput7" label="Log Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image" name="image" value={formInput.image} onChange={handleChange} />
      </Form.Group>

      {/* NOTES INPUT */}
      <FloatingLabel controlId="floatingTextarea" label="Notes" className="mb-3">
        <Form.Control as="textarea" placeholder="notes?" name="notes" value={formInput.notes} style={{ height: '100px' }} onChange={handleChange} required />
      </FloatingLabel>

      {/* DATE */}
      <Form.Group className="mb-3 align">
        <Form.Label>Date of Log</Form.Label>
        <Form.Control type="date" id="created_at" name="created_at" value={formInput.created_at} min="1920-1-01" max="2080-1-01" onChange={handleChange} />
      </Form.Group>

      {/* PRODUCT REC SWITCH
      <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label="Recommend products?"
      /> */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* PUBLIC SWITCH */}
        <ToggleButtonGroup
          type="checkbox"
          style={{
            marginBottom: '15px',
            display: 'block',
            width: 'fit-content',
            borderRadius: '30px',
            padding: '5px',
          }}
        >
          <ToggleButton
            checked={formInput.public}
            value={formInput.public}
            onClick={handleToggleChange}
            style={{
              backgroundColor: formInput.public ? '#4b9cd3' : '#d3d3d3',
              border: 'none',
              borderRadius: '30px',
              color: 'white',
              fontWeight: 'bold',
              padding: '8px 20px',
              fontSize: '14px',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
            }}
          >
            {formInput.public ? 'Public' : 'Private'}
          </ToggleButton>
        </ToggleButtonGroup>

        {/* FAVORITE SWITCH */}
        <ToggleButtonGroup
          type="checkbox"
          style={{
            marginBottom: '15px',
            display: 'block',
            width: 'fit-content',
            borderRadius: '30px',
            padding: '5px',
          }}
        >
          <ToggleButton
            checked={formInput.favorite}
            value={formInput.favorite}
            onClick={handleFavToggleChange}
            style={{
              backgroundColor: formInput.favorite ? '#f5a623' : '#d3d3d3',
              border: 'none',
              borderRadius: '30px',
              color: 'white',
              fontWeight: 'bold',
              padding: '8px 20px',
              fontSize: '14px',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
            }}
          >
            {formInput.favorite ? <FaHeart style={{ color: 'white', fontSize: '18px' }} /> : <FaRegHeart style={{ color: 'white', fontSize: '18px' }} />}
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      {/* SUBMIT BUTTON */}
      <div className="formButton-container">
        <Button type="submit" className="form-button">
          {obj.firebaseKey ? 'Update' : 'Create'} Log
        </Button>
      </div>
    </Form>
  );
}

LogForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    name: PropTypes.string,
    user_id: PropTypes.string,
    conditions: PropTypes.string,
    image: PropTypes.string,
    hairtype_id: PropTypes.string,
    notes: PropTypes.string,
    product_recs: PropTypes.bool,
    favorite: PropTypes.bool,
    public: PropTypes.bool,
    created_at: PropTypes.string,
  }),
};

LogForm.defaultProps = {
  obj: initialState,
};

export default LogForm;
