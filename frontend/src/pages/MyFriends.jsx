import React from 'react'
import { getUserFriends } from '../lib/api';
import { useQuery } from '@tanstack/react-query';
import FriendCard from '../components/FriendCard';
import NoFriendCard from '../components/NoFriendCard';

function MyFriends() {

      const { data: friends = [], isLoading: loadingFriends } = useQuery({
        queryKey: ["friends"],
        queryFn: getUserFriends,
      });
    
  return (
    <div className='mt-4 mx-3'>
        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendCard />
        ) : (
          <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
    </div>
  )
}

export default MyFriends
