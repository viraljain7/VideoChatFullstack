import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import Loader from "../components/Loader";
import { GetLanguageFlag } from "../components/FriendCard";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router";

function NotificationPage() {

  const navigate=useNavigate();
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequest"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequest"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptRequests = friendRequests?.acceptedReqs || [];

  console.log(incomingRequests, acceptRequests);

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 space-y-6">
      {/* Incoming Friend Requests */}
      <div>
        <h2 className="text-xl font-bold mb-3">Friend Requests</h2>
        {incomingRequests.length === 0 ? (
          <p className="text-sm opacity-70">No new friend requests</p>
        ) : (
          <ul className="space-y-3">
            {incomingRequests.map((req) => (
              <li
                key={req._id}
                className="flex items-center justify-between p-3 border border-base-300 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={req?.sender?.profilePic}
                    alt={req?.sender?.fullName}
                    className="w-10 h-10 rounded-full border border-base-300"
                  />
                  <div>
                    <p className="font-semibold">{req?.sender?.fullName}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="badge badge-secondary text-xs p-3">
                        {GetLanguageFlag(req?.sender?.nativeLanguage)}
                        Native: {req?.sender?.nativeLanguage}
                      </span>
                      <span className="badge badge-outline text-xs p-3">
                        {GetLanguageFlag(req?.sender?.learningLanguage)}
                        Learning: {req?.sender?.learningLanguage}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => acceptRequestMutation(req._id)}
                  disabled={isPending}
                  className="btn btn-sm btn-primary"
                >
                  {isPending ? "Accepting..." : "Accept"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div> 
        <h2 className="text-xl font-bold mb-3">New Connections</h2>
        {acceptRequests.length === 0 ? (
          <p className="text-sm opacity-70">No new connections</p>
        ) : (
          <ul className="space-y-3">
            {acceptRequests.map((conn) => (
              <li
                key={conn._id}
                className="flex items-center justify-between p-3 border border-base-300 rounded-lg"
              >
                {/* Left: Profile + Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={conn?.recipient?.profilePic}
                    alt={conn?.recipient?.fullName}
                    className="w-10 h-10 rounded-full border border-base-300"
                  />
                  <div>
                    <p className="font-semibold">{conn?.recipient?.fullName}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="badge badge-secondary text-xs p-3">
                        {GetLanguageFlag(conn?.recipient?.nativeLanguage)}
                        Native: {conn?.recipient?.nativeLanguage}
                      </span>
                      <span className="badge badge-outline text-xs p-3">
                        {GetLanguageFlag(conn?.recipient?.learningLanguage)}
                        Learning: {conn?.recipient?.learningLanguage}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: New Message Button */}
                <button
                  onClick={()=>navigate(`/chat/${conn?.recipient?._id}`)
                  }
                  className="btn btn-sm btn-primary flex items-center gap-2"
                >
                  <MessageCircle size={18} />
                  Message
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default NotificationPage;
