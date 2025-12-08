// src/app/page.tsx
import { redirect } from "next/navigation"

const HomePage = () => {
  redirect("/dashboard")
}

export default HomePage