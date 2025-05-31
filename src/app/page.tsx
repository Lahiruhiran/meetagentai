"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";


export default function Home() {
   
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: session} = authClient.useSession() 

  const onSubmit = () => {
    authClient.signUp.email({
      email,
      password,
      name,
    },
    {
  
      onSuccess: () => {
        window.alert("Successfully created user!");
      },
      onError: () => {
       window.alert("Error creating user");
      },
    });
  };

  const onLogin = () => {
    authClient.signIn.email({
      email,
      password,
    },
    {
  
      onSuccess: () => {
        window.alert("Successfully created user!");
      },
      onError: () => {
       window.alert("Error creating user");
      },
    });
  };
  if (session) {
    return <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-2xl">You are already logged in as {session.user.name}</p>
      <Button onClick={() => authClient.signOut()}>Sign Out</Button>
    </div>;

  }

  return (
    <>
      <div className="p-4 flex flex-col gap-2">
        <Input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={onSubmit}>
          Create User
        </Button>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={onLogin}>
          Login
        </Button>
      </div>
    </>
  );
}