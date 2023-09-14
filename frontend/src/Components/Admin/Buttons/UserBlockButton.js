import React, { useState } from 'react';
import axios from 'axios';
import Switch from '@mui/material/Switch';

const UserBlockButton = ({ userId, isBlocked, onUpdate }) => {
  const [blocked, setBlocked] = useState(isBlocked);

  const toggleBlock = async () => {
    const adminToken = localStorage.getItem('admin_token');
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/admin/block_unblock_user/${userId}`, {
        is_banned: !blocked, 
      },
      {
        headers: {
          Authorization: `Bearer ${adminToken}`, 
        },
      }
      );
      if (response.status === 200) {
        onUpdate(userId, !blocked); 
        setBlocked(!blocked);
      }
    } catch (error) {
      console.error('Error toggling user block:', error);
    }
  };

  return (
    <Switch
      checked={blocked}
      onChange={toggleBlock}
      color="warning"
    />
  );
};

export default UserBlockButton;