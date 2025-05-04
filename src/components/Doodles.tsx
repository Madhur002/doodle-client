import React from "react";
import { formatDistanceToNow } from "date-fns";
import Card from "./Card";

interface Post {
  id: number;
  content: string;
  createdAt: string; // Assuming `createdAt` is a string representation of a date
  user: {
    id: number; // Adding userId to align with `Card` props
    name: string;
    title?: string;
    imageUrl?: string;
  };
}

interface DoodlesProps {
  posts: Post[];
}

const Doodles: React.FC<DoodlesProps> = ({ posts }) => {
  return (
    <div className="h-auto md:px-5 px-5">
      {posts.map((post) => (
        <Card
          key={post.id}
          postId={post.id}
          userId={post.user.id} // Pass userId to Card
          quote={post.content}
          name={post.user.name}
          title={post.user.title || "Doodler"}
          imageUrl={
            post.user.imageUrl ||
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbiUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
          }
          timeStamp={formatDistanceToNow(new Date(post.createdAt), {
            addSuffix: true,
          })}
        />
      ))}
    </div>
  );
};

export default Doodles;
