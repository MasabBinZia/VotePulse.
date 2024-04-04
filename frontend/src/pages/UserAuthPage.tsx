import AuthForm from "@/components/auth-form";

export default function UserAuthPage() {
  return (
    <main className="flex justify-center items-center py-20">
      <AuthForm formType={"Voter"} />
    </main>
  );
}