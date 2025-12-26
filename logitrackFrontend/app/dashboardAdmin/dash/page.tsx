import ProtectedRoute from "@/src/components/auth/ProtectedRoute";

export default function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <h1>Bem-vindo, Super Administrador</h1>
      {/* Conteúdo exclusivo */}
    </ProtectedRoute>
  );
}