import Link from 'next/link';
import Image from 'next/image';
import { MySession } from '@/lib/getsession';
import { signIn, signOut } from '@/app/api/auth/[...nextauth]/route';
import { Button } from './ui/button';

const navbar = async () => {
  const session = await MySession();
  const currentUser = session?.user;

  console.log(currentUser);

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={140} height={30} />
        </Link>
        {!currentUser ? (
          <>
            <div className="flex items-center gap-1 text-black">
              <form
                action={async () => {
                  'use server';
                  await signIn();
                }}
              >
                <Button variant="secondary" type="submit">
                  Log In
                </Button>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1 text-black">
              <Button variant="ghost" asChild>
                <Link href="/builder">Build</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/userprofile">Profile</Link>
              </Button>

              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}
              >
                <Button variant="secondary" type="submit">
                  Log Out
                </Button>
              </form>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default navbar;
