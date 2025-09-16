// Dashboard page - commented out to remove authentication features

// 'use client'

// import { useEffect, useState } from 'react'
// import { Button } from '@/components/ui/button'

// interface User {
//   id: string
//   email: string
//   user_metadata: {
//     full_name?: string
//     avatar_url?: string
//   }
// }

export default function DashboardPage() {
  // const [user, setUser] = useState<User | null>(null)
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   // In a real app, you'd get the user from the session
  //   // For now, we'll just show a success message
  //   setLoading(false)
  // }, [])

  // const handleLogout = async () => {
  //   try {
  //     // Clear session and redirect to login
  //     window.location.href = '/login'
  //   } catch (error) {
  //     console.error('Logout failed:', error)
  //   }
  // }

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-medium mb-4">Dashboard Disabled</h1>
        <p className="text-muted-foreground">Authentication features have been disabled.</p>
      </div>
    </div>
  )

  // return (
  //   <div className="min-h-screen bg-gray-50">
  //     <div className="bg-white shadow">
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //         <div className="flex justify-between items-center py-6">
  //           <div className="flex items-center">
  //             <h1 className="text-2xl font-bold text-gray-900">Berri Dashboard</h1>
  //           </div>
  //           <div className="flex items-center space-x-4">
  //             <Button
  //               onClick={handleLogout}
  //               variant="outline"
  //             >
  //               Logout
  //             </Button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
  //       <div className="px-4 py-6 sm:px-0">
  //         <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
  //           <div className="text-center">
  //             <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
  //               <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  //               </svg>
  //             </div>

  //             <h2 className="mt-4 text-lg font-medium text-gray-900">
  //               Authentication Successful!
  //             </h2>

  //             <p className="mt-2 text-sm text-gray-500">
  //               Your Google account has been successfully connected. The Electron app can now access Gmail and Calendar data securely through our proxy.
  //             </p>

  //             <div className="mt-8 space-y-4">
  //               <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
  //                 <div className="flex">
  //                   <div className="flex-shrink-0">
  //                     <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
  //                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  //                     </svg>
  //                   </div>
  //                   <div className="ml-3">
  //                     <h3 className="text-sm font-medium text-blue-800">
  //                       Next Steps
  //                     </h3>
  //                     <div className="mt-2 text-sm text-blue-700">
  //                       <ul className="list-disc list-inside space-y-1">
  //                         <li>You can now close this browser window</li>
  //                         <li>Return to the Electron app to use Gmail and Calendar features</li>
  //                         <li>Your authentication will persist until you log out</li>
  //                       </ul>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>

  //               <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
  //                 <div className="flex">
  //                   <div className="flex-shrink-0">
  //                     <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
  //                       <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  //                     </svg>
  //                   </div>
  //                   <div className="ml-3">
  //                     <h3 className="text-sm font-medium text-yellow-800">
  //                       Security Information
  //                     </h3>
  //                     <div className="mt-2 text-sm text-yellow-700">
  //                       Your Google tokens are stored securely and encrypted. The Electron app never has direct access to them - all API calls go through our secure proxy.
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
}