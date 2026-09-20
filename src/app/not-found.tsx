import { Container } from "@/components/ui";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm text-accent">404</p>
      <h1 className="mt-3 text-3xl font-semibold">Page not found</h1>
      <p className="mt-2 text-foreground-secondary">The page you requested does not exist.</p>
      <Link href="/" className="mt-6 text-accent hover:underline">
        Back home
      </Link>
    </Container>
  );
}
