'use client';

import { useAuth } from '@/utils/context/authContext';
import React, { useState, useEffect, useCallback } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
// import Link from 'next/link';
import LogCard from '../../../components/LogCard';

import { getLogsByUid } from '../../../api/logData';

function Profile() {
  const { user } = useAuth();

  const [currentLogs, setCurrentLogs] = useState([]);

  const getCurrentLogs = useCallback(() => {
    getLogsByUid(user.uid).then(setCurrentLogs);
  }, [user.uid]);
  useEffect(() => {
    getCurrentLogs();
  }, [getCurrentLogs]);

  return (
    <div style={{ border: '3px black', padding: '45px 0px 45px 0px' }}>
      <div className="d-flex flex-wrap justify-content-evenly">
        {currentLogs.map((log) => (
          <div key={log.firebaseKey}>
            <LogCard logObj={log} onUpdate={getCurrentLogs} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
