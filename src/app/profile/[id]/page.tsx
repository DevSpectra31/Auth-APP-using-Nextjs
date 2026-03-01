interface UserProfileProps {
  params: {
    id: string;
  };
}

export default function UserProfile({ params }: UserProfileProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-xl font-semibold">Profile</h1>
      <hr className="w-40 my-4 border-gray-700" />

      <div className="flex items-center gap-3 text-4xl font-bold">
        <span>Profile Page</span>
        <span className="px-4 py-2 rounded-lg bg-orange-500 text-white text-2xl">
          {params.id}
        </span>
      </div>
    </div>
  );
}