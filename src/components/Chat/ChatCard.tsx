import { Link } from 'react-router-dom';
import { Chat } from '../../types/chat';
import { useAppSelector } from '../../store/hooks';
import { User } from '../../types/data';
import { getGravatarUrl } from './GravatarURLGenerator';

const ChatCard = () => {
  const { users } = useAppSelector((state) => state.datas);

  // Convert users to chat list
  const chatData: Chat[] = users.map((user: User) => ({
    avatar: getGravatarUrl(user.email),
    name: user.username,
    text: "Start chatting...",
    time: 0,
    textCount: 0,
    color: "#10B981", // online green OR customize later
  }));

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Chats
      </h4>

      <div>
        {chatData.map((chat, key) => (
          <Link
            to={`/chat/${chat.name}`}  // ← go to individual chat page later
            className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >
            <div className="relative h-14 w-14 rounded-full">
              <img src={chat.avatar} alt={chat.name} className="rounded-full object-cover" />
              <span
                className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white"
                style={{ backgroundColor: chat.color }}
              ></span>
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-black dark:text-white">{chat.name}</h5>
                <p>
                  <span className="text-sm text-black dark:text-white">{chat.text}</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatCard;
