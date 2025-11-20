import { useState } from "react";
import { Link } from "react-router-dom";
import { Chat } from "../../types/chat";
import { useAppSelector } from "../../store/hooks";
import { User } from "../../types/data";
import { getGravatarUrl } from "./GravatarURLGenerator";
import CoverOne from '../../../src/images/user/user-01.png';

const ChatCard = () => {
  const { users } = useAppSelector((state) => state.datas);
  const [open, setOpen] = useState(false);

  const chatData: Chat[] = users.map((user: User) => ({
    avatar: getGravatarUrl(user.email),
    name: user.username,
    text: "Start chatting...",
    time: 0,
    textCount: 0,
    color: "#10B981",
  }));

  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <div
      className={`rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark
        transition-all duration-300 overflow-hidden 
        ${open ? "bg-white py-6 relative" : "bg-white py-0 absolute top-0 right-0 left-0 z-10"}
      `}
    >
      {/* Header */}
     {/* Header */}
<div
  className="flex items-center justify-between px-4 cursor-pointer select-none mb-4"
  onClick={toggleOpen}
>
  {/* Avatar */}
  <div className="relative h-13 w-12">
    <img
      src={CoverOne}
      alt="profile cover"
      className="h-12 w-12 rounded-full object-cover mt-2"
    />
    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500"></span>
  </div>

  {/* Title */}
  <h4 className="text-xl font-semibold text-black dark:text-white mr-48 mt-2">
    Chats
  </h4>

  {/* Arrow */}
  <span
    className={`
      text-black dark:text-white text-lg
      transition-transform duration-300
      ${open ? "rotate-180" : ""}
    `}
  >
    ▼
  </span>
</div>


       
    

      {/* Chat list */}
      {open && (
        <div className="px-0">
          {chatData.map((chat, key) => (
            <Link
              to={`/chat/${chat.name}`}
              className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
              key={key}
            >
              <div className="relative h-14 w-14 rounded-full">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="rounded-full object-cover"
                />
                <span
                  className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white"
                  style={{ backgroundColor: chat.color }}
                ></span>
              </div>

              <div className="flex flex-1 items-center justify-between">
                <div>
                  <h5 className="font-medium text-black dark:text-white">
                    {chat.name}
                  </h5>
                  <p>
                    <span className="text-sm text-black dark:text-white">
                      {chat.text}
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatCard;
