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
import {registerUser} from "@/lib/firebase/auth";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/router";
import Link from "next/link";

const registerFormSchema = z.object({
  username: z.string().min(3, "Minimal 3 karakter"),
  email: z.string().email(),
  password: z.string().min(8, "Minimal 8 karakter"),
});

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

type FieldName = keyof RegisterFormSchema;

export default function RegisterPage() {
  const {toast} = useToast();
  const router = useRouter();

  const form = useForm<RegisterFormSchema>({
    defaultValues: {username: "", email: "", password: ""},
    resolver: zodResolver(registerFormSchema),
  });

  const {handleSubmit, control} = form;

  const onSubmit = handleSubmit(async (values) => {
    const registerResponse = await registerUser(
      values.username,
      values.email,
      values.password
    );
    if (registerResponse.error) {
      toast({
        description: registerResponse.error,
        title: "Register Failed",
        variant: "destructive",
      });
    }
    if (registerResponse.message) {
      // Show success toast
      form.reset();

      toast({
        description: registerResponse.message,
        title: "Register Success",
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
      render={({field}) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} type={type} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
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
              <CardTitle className="text-center text-3xl">Register</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {RenderField("username", "Username", "username")}
                {RenderField("email", "Email", "user@example.com")}
                {RenderField("password", "Password", "*********", "password")}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="flex flex-col space-y-4 w-full">
                <Button type="submit">Login</Button>
              </div>
              <p className="flex items-center justify-center mt-4 gap-2">
                Already have an account?
                <Link
                  href="/login"
                  className="text-center block hover:underline"
                >
                  Login
                </Link>
              </p>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
}
