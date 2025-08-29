import React from "react";

function NoFriendCard() {
  return (<div className="card shadow-md hover:shadow-xl transition-all duration-300 w-full">
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