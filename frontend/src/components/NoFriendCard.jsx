import React from "react";
import { UserX } from "lucide-react";

function NoFriendCard() {
  return (
    <div className="card shadow-lg  hover:shadow-xl transition-all duration-300 w-[90%]">
      <div className="card-body items-center text-center p-6">
        

        {/* Title */}
        <h2 className="text-lg font-semibold">No Friends Yet</h2>
        <p className="text-sm opacity-70">
          You haven’t added any friends. Start connecting with people now!
        </p>

    
      </div>
    </div>
  );
}

export default NoFriendCard;