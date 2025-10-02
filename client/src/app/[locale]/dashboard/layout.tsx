import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { cookies } from "next/headers";
import api from "@/lib/axios";
import { redirect } from "next/navigation";
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
  const token = (await cookies()).get("access_token")?.value;

  if (!token) {
    redirect(`/${params.locale}/auth/login`);
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (res.status === 401) {
      redirect(`/${params.locale}/auth/login`);
    }
  } catch (e) {
    redirect(`/${params.locale}/auth/login`);
  }
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
