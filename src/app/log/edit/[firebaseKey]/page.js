'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getSingleLog } from '../../../../api/logData';
import LogForm from '../../../../components/forms/LogForm';

export default function EditLog({ params }) {
  const [editItem, setEditItem] = useState({});
  const { firebaseKey } = params;

  useEffect(() => {
    getSingleLog(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return <LogForm obj={editItem} />;
}

EditLog.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
