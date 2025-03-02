import Dropzone from "@/components/Dropzone"
import { auth } from "@clerk/nextjs/server" 

const DashboardPage = async () => {
  const { userId } = await auth()
  return (
    <div>
      <Dropzone />
    </div>
  )
}

export default DashboardPage
