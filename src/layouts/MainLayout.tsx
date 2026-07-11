import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BackToTop } from '@/components/common/BackToTop'
import { ScrollProgressBar } from '@/components/common/ScrollProgressBar'

export function MainLayout() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      <ScrollProgressBar />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
