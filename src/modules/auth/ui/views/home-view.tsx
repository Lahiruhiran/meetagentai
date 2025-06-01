"use client"
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


const Page = () => {

    const { data: session } = authClient.useSession();
    const router = useRouter();
  
  if (!session) {
    return (
      <p> Looding ....</p>
    )
  }
  if (session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl">You are already logged in as {session.user.name}</p>
            <Button onClick={() => authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/sign-in");
                    }   
                }
            })
            
            }>
                Sign Out
            </Button>
      </div>
    );
  }

}
export default Page;
   
  