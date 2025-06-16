"use client";

import React, { useEffect, useState } from "react";
import { fetchAllForms, fetchFormStats } from "@/actions/form.action";
import StatsCards from "./_components/StatsCards";
import { Separator } from "@/components/ui/separator";
import CreateForm from "./_components/CreateForm";
import { Loader } from "lucide-react";
import FormItem from "./_components/_common/FormItem";

type FormType = {
  id: number | string;
  formId: string;
  name: string;
  published: boolean;
  createdAt: string;
  responses: number;
  views: number;
  settings?: {
    backgroundColor?: string;
  };
};

type StatsType =
  | {
      success: boolean;
      views: number;
      totalForms: number;
      totalResponses: number;
      conversionRate: number;
      engagementRate: number;
      message?: undefined;
    }
  | {
      success: boolean;
      message: string;
      views?: undefined;
      totalForms?: undefined;
      totalResponses?: undefined;
      conversionRate?: undefined;
      engagementRate?: undefined;
    };

const Dashboard = () => {
  const [stats, setStats] = useState<StatsType>({
    success: false,
    views: 0,
    totalForms: 0,
    totalResponses: 0,
    conversionRate: 0,
    engagementRate: 0,
  });
  const [forms, setForms] = useState<FormType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const statsData = await fetchFormStats();
        const formData = await fetchAllForms();
        setStats(statsData);
        setForms(
          (formData?.form || []).map((form: any) => ({
            ...form,
            createdAt: typeof form.createdAt === "string" ? form.createdAt : form.createdAt.toISOString(),
            settings: form.settings
              ? {
                  ...form.settings,
                  backgroundColor: form.settings.backgroundColor,
                }
              : undefined,
          }))
        );
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="w-full pt-8">
      <div className="w-full max-w-6xl mx-auto px-2 md:px-0 pt-1">
        {/* Section Statistiques */}
        <section className="stats-section w-full">
          <div className="w-full flex items-center justify-between py-5">
            <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
            <CreateForm />
          </div>
          <StatsCards loading={false} data={stats} />
        </section>

        <div className="mt-10">
          <Separator className="!border-[#eee] !bg-[#eee]" />
        </div>

        {/* Section Formulaires */}
        <section className="w-full pt-7 pb-10">
          <div className="w-full flex items-center mb-4">
            <h5 className="text-xl font-semibold tracking-tight">All Forms</h5>
          </div>

          {loading ? (
            <div className="grid gap-4 grid-cols-2 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-5">
              {[1, 2, 3, 4].map((item) => (
                <Loader key={item} size="3rem" className="animate-spin" />
              ))}
            </div>
          ) : forms.length > 0 ? (
            <div className="grid gap-4 grid-cols-2 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-5">
              {forms.map((form) => (
                <FormItem
                  key={form.id}
                  id={Number(form.id)}
                  formId={form.formId}
                  name={form.name}
                  published={form.published}
                  createdAt={new Date(form.createdAt)}
                  responses={form.responses}
                  views={form.views}
                  backgroundColor={form.settings?.backgroundColor ?? ""}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center text-muted-foreground mt-6">
              No forms created yet.
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
