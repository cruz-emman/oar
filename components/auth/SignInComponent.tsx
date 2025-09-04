"use client"

import React from 'react'
import CardWrapper from './CardWrapper'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { SignInSchema, SignInSchemaType } from '@/utils/zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'


const SignInComponent = () => {

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (values: SignInSchemaType) => {
    const {email, password} = values;
    const {data, error} = await authClient.signIn.email({
      email, 
      password,
      callbackURL: "/dashboard"
    },
    {
      onRequest: (ctx) => {
        console.log(ctx)
      },
      onSuccess: () => {
        toast.success("Logged in successfully!")
      },
      onError: (err) => {
        toast.error(err.error.message)
      }
    })
  }

  return (
    <CardWrapper
      title="Sign In"
      description="Enter your user credentials to login."
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

export default SignInComponent