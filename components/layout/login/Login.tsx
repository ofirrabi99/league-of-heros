import Link from "next/link";
import Button from "../../shared/button/Button";

export default function Login() {
  return (
    <Link href="/api/auth/login">
      <Button>click here to start your journey</Button>
    </Link>
  );
}
