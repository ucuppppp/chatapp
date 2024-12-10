"use client";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginUser} from "@/lib/firebase/auth";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import Link from "next/link";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Minimal 8 karakter"),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

type FieldName = keyof LoginFormSchema;

export default function LoginPage() {
  const {toast} = useToast();
  const router = useRouter();

  const form = useForm<LoginFormSchema>({
    defaultValues: {email: "", password: ""},
    resolver: zodResolver(loginFormSchema),
  });

  const {handleSubmit, control} = form;

  const onSubmit = handleSubmit(async (values) => {
    const loginResponse = await loginUser(values.email, values.password);
    if (loginResponse.error) {
      toast({
        description: loginResponse.error,
        title: "Login Failed",
        variant: "destructive",
      });
    }
    if (loginResponse.message) {
      // Show success toast
      form.reset();

      toast({
        description: loginResponse.message,
        title: "Login Success",
        variant: "default",
      });
      // Redirect to home
      router.push("/");
    }
  });

  const RenderField = (
    name: FieldName,
    label: string,
    placeholder?: string,
    type: string = "text"
  ) => (
    <FormField
      control={control}
      name={name}
      render={({field}) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                {...field}
                type={type}
                placeholder={placeholder ? placeholder : ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );

  return (
    <main className="px-4 container py-8 flex flex-col justify-center items-center max-w-screen min-h-screen mx-auto">
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="w-full max-w-md flex flex-col justify-center"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-3xl">Login</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {RenderField("email", "Email", "user@example.com")}
                {RenderField("password", "Password", "*********", "password")}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="flex flex-col space-y-4 w-full">
                <Button type="submit">Login</Button>
              </div>
              <p className="flex items-center justify-center mt-4 gap-2">
                Don't have an account?
                <Link
                  href="/register"
                  className="text-center block hover:underline"
                >
                  Register
                </Link>
              </p>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
}
