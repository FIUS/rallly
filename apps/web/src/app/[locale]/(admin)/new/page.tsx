"use client";
import Head from "next/head";
import { useTranslation } from "next-i18next";

import { CreatePoll } from "@/components/create-poll";

const Page = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("newPoll")}</title>
      </Head>
      <CreatePoll />
    </>
  );
};

export default Page;
