import React from 'react'
import { GetLanguageFlag } from './FriendCard'
import { capitialize } from '../lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendFriendRequest } from '../lib/api';
import { CheckCircleIcon, MapPinIcon, UserPlusIcon,  } from "lucide-react";


function RecommendedUserCard({user,    hasRequestBeenSent}) {

  const queryClient = useQueryClient();
  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });


  return (
    <div className="card-body p-5 space-y-4 shadow-md">
    <div className="flex items-center gap-3">
      <div className="avatar size-16 rounded-full">
        <img src={user.profilePic} alt={user.fullName} />
      </div>

      <div>
        <h3 className="font-semibold text-lg">{user.fullName}</h3>
        {user.location && (
          <div className="flex items-center text-xs opacity-70 mt-1">
            <MapPinIcon className="size-3 mr-1" />
            {user.location}
          </div>
        )}
      </div>
    </div>

    {/* Languages with flags */}
    <div className="flex flex-wrap gap-1">
      <span className="badge badge-accent p-3 text-xs">
        {GetLanguageFlag(user.nativeLanguage)}
        Native: {capitialize(user.nativeLanguage)}
      </span>
      <span className="badge badge-warning p-3 text-xs">
        {GetLanguageFlag(user.learningLanguage)}
        Learning: {capitialize(user.learningLanguage)}
      </span>
    </div>

    {user.bio && <p className="text-sm opacity-70">{user.bio}</p>}

    {/* Action button */}
    <button
      className={`btn w-full mt-2 ${
        hasRequestBeenSent ? "btn-disabled" : "btn-primary"
      } `}
      onClick={() => sendRequestMutation(user._id)}
      disabled={hasRequestBeenSent || isPending}
    >
      {hasRequestBeenSent ? (
        <>
          <CheckCircleIcon className="size-4 mr-2" />
          Request Sent
        </>
      ) : (
        <>
          <UserPlusIcon className="size-4 mr-2" />
          Send Friend Request
        </>
      )}
    </button>
  </div>
  )
}

export default RecommendedUserCard
