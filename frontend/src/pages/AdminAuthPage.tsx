import AuthForm from "@/components/auth-form";

export default function AdminAuthPage() {
  return (
    <main className="flex justify-center items-center py-20">
      <AuthForm formType={"Admin"} />
    </main>
  );
}
