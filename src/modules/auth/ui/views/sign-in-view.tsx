"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { OctagonAlertIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";

import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {authClient } from "@/lib/auth-client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


const formShema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is required" }),
}); 

export const SignInView = () => {

    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    const form = useForm<z.infer<typeof formShema>>({
        resolver: zodResolver(formShema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formShema>) => {
        try {
            setError(null);
            setPending(true);
            authClient.signIn.email({
                email: data.email,
                password: data.password,
                callbackURL:"/"
            }, {
                onSuccess: () => {
                    setPending(false);
                    router.push("/");
                },
                onError: ({error}) => {
                    setError(error.message);
                },
            });
        } catch (error) {
            console.error("Sign in error:", error);
        }
    }
    const onSocial = async (provider : "google" | "github") => {
            try {
                setError(null);
                setPending(true);
              authClient.signIn.social({
                  provider: provider,
                  callbackURL:"/"
                
                }, {    
                    onSuccess: () => {
                        setPending(false);
                    },
                    onError: ({error}) => {
                        setError(error.message);
                    },
                });
            } catch (error) {
                console.error("Sign in error:", error);
            }
        }
    return (
        <div className="flex flex-col gap-6 overflow-x-hidden overflow-y-hidden">
            <Card className="overflow-hidden p-0 overflow-x-hidden overflow-y-hidden ">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <div className="flrx flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">
                                        Welcome back to TalkBridge
                                    </h1>
                                    <p className="text-muted-foreground text-balance">
                                        Log into your Account
                                    </p>
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="tb@example.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="password"
                                                        placeholder="********"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {!!error && (
                                    <Alert className="bg-destructive/10 border-none">
                                        <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                                        <AlertTitle>    
                                            {error}
                                        </AlertTitle>
                                    </Alert>
                                )}
                                <Button
                                    disabled={pending}
                                    type="submit" className="w-full">
                                    Sign In
                                </Button>
                                <div className ="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:item-center after:border-t">
                                    <span className="bg-card text-muted-foreground relative z-10 p-2">
                                        or Continue with
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Button disabled={pending} variant="outline" type="button" className="w-full"
                                        onClick={() => {
                                        onSocial("google");
                                     }}>
                                        {/* <img src="/google.svg" alt="Google" className="h-4 w-4 mr-2" /> */}
                                        <FaGoogle/>
                                    </Button>
                                    <Button disabled={pending} variant="outline" type="button" className="w-full"
                                        onClick={() => {
                                            onSocial("github");
                                         }}
                                    >
                                        {/* <img src="/gitHub.svg" alt="Google" className="h-4 w-4 mr-2" /> */}
                                        <FaGithub/>
                                    </Button>
                                </div>
                                <div className="text-sm text-muted-foreground text-center">
                                    <p className="text-sm text-muted-foreground">
                                        Don&#39;t have an account?{" "}
                                        <Link href="/sign-up" className="underline underline-offset-4 hover:text-primary">
                                        Sign Up
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </Form>
                   
                    <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex 
                    flex-col gap-y-4 items-center justify-center">
                        <img src="/logo.svg" alt="Image" className="h-[92px] w-[92px]" />
                        <p className="text-2xl text-white font-semibold">
                        TalkBridge
                        </p>
                    </div>
                </CardContent>
            </Card>
            <div className="mt-5 text-center text-sm text-muted-foreground">
                <p className="text-sm text-muted-foreground text-center">
                    By signing in, you agree to our{" "}
                    <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                        Privacy Policy
                    </Link>
                </p>
            </div>
      </div>


  );
}