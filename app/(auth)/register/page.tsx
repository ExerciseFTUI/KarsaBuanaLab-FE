import RegisterForm from "@/components/forms/RegisterForm";

export const metadata = {
  title: "Register", 
  message: "To register account"
}

export default function Page() {
  return (
    <>
      <RegisterForm />
    </>
  );
}
