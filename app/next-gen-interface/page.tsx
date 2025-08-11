export const dynamic = "force-dynamic"
export const revalidate = 0

import NextGenInterfaceClient from "./client"

export default function Page() {
  // Server Component wrapper to control rendering strategy.
  return <NextGenInterfaceClient />
}
