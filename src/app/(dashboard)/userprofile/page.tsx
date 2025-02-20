import { MySession } from '@/lib/getsession';

const UserProfilePage = async () => {
  const session = await MySession();
  console.log('debug session', session?.user.username);
  return <div>welcome {session?.user?.username}</div>;
};

export default UserProfilePage;
