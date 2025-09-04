"use client"

import React, { useState } from 'react'
import CardWrapper from './CardWrapper'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { SignInSchema, SignInSchemaType, SignUpSchema, SignUpSchemaType } from '@/utils/zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'


const SignUpComponent = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (values: SignUpSchemaType) => {
    setLoading(true)
    const { email, password } = values
    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        callbackURL: "/sign-in"
      }, {
        onRequest: (ctx) => {
          toast("Loading...")
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          toast("Account Created")
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      });
    } catch (error) {
      toast(error)
    } finally {
      setLoading(false)

    }
  }

  return (
    <CardWrapper
      title="Sign Up"
      description="register your user credentials to login."
    >

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <Button  className="w-full" type="submit">
              {loading ? <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging Account...
              </> : "Login"}
            </Button> */}

          <Button className='w-full' type='submit'>
            Login
          </Button>
        </form>
      </Form>

    </CardWrapper>
  )
}

export default SignUpComponent