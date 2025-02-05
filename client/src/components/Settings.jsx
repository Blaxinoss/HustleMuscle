import { t } from 'i18next';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../slices/userSlice'; // Adjust the path as needed

function Settings() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    // Dispatch fetchUsers when component mounts
    dispatch(fetchUsers());
  }, [dispatch]);




  return (
    <div className="p-8 bg-black h-full">
      <h1 className='text-white text-3xl'>{t('settings.header')}</h1>
      <h3>User List</h3>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </div>
  )
}

export default Settings