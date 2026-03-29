
export function canAccessAdminDashboard(email: string | null | undefined): boolean {
  if (!email?.trim()) return false;
  const raw = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.trim();
  if (!raw) return false;
  const allowed = raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.trim().toLowerCase());
}
