import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export const metadata: Metadata = {
  title: "Dashboard - Sitovia",
  description: "Content management dashboard for Sitovia website",
};

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <div className="min-h-screen bg-background">
        <div className="flex">
          {/* Sidebar */}
          <DashboardSidebar />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-screen">
            {/* Header */}
            <DashboardHeader />
            
            {/* Page Content */}
            <main className="flex-1 p-6 lg:p-8 bg-muted/30">
              {children}
            </main>
          </div>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
